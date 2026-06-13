// Screenshot helper that SCROLLS first so motion `whileInView` reveals + counters fire.
// Usage: node shot.mjs <url> <label> [width]
import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  process.env.LOCALAPPDATA
    ? process.env.LOCALAPPDATA + "/Google/Chrome/Application/chrome.exe"
    : "",
].filter(Boolean);
const executablePath = CHROME.find((p) => fs.existsSync(p));

const url = process.argv[2] || "http://localhost:3001/";
const label = process.argv[3] || "shot";
const width = parseInt(process.argv[4]) || 1440;
const outDir = "./shots";
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, `${label}-${width}.png`);

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle2", timeout: 45000 });

  // Scroll through the whole page to trigger IntersectionObservers + counters
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      const step = 350;
      let guard = 0;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        guard++;
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 4;
        if (atBottom || guard > 200) {
          clearInterval(timer);
          resolve();
        }
      }, 90);
    });
  });
  await new Promise((r) => setTimeout(r, 900));
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 900));

  await page.screenshot({ path: outPath, fullPage: true });
  await browser.close();
  console.log("Saved:", outPath);
})();
