# Image & Video Placeholders

Every visual slot uses a branded green placeholder so the site looks finished
today. Replace them with real assets when available. Drop files into
`/public/...` and update the matching component.

## Hero video (highest impact)
- **Slot:** full-screen background on the home hero.
- **File:** `public/video/hero.mp4` (the `<video>` is already wired; until the
  file exists, the animated green background shows through — no broken state).
- **Also add:** `public/placeholders/hero-poster.jpg` (a still frame, shown
  before the video loads / on reduced-motion).
- **Specs:** MP4, H.264, ~1920×1080, 8–15s loop, muted, **under ~6 MB**
  (compress so mobile stays fast).
- **Free, license-clear sources:** [Coverr](https://coverr.co) (search "truck",
  "highway", "delivery") · [Pexels Videos](https://www.pexels.com/videos)
  (search "truck road", "logistics"). Pick a slow, cinematic highway/convoy clip.

## Image slots
| Where | Component | Suggested shot |
|-------|-----------|----------------|
| Home · "Why Magerwa" | `app/(site)/page.tsx` | Facility / fleet / Magerwa hub exterior |
| Services · each of 6 | `app/(site)/services/page.tsx` | One photo per service (customs desk, warehouse, truck, last-mile, etc.) |
| About · story | `app/(site)/about/page.tsx` | Team at work / operations (portrait 4:5) |
| About · team grid | `app/(site)/about/page.tsx` | 4 staff headshots (square) + real names/roles |
| Contact · map | `app/(site)/contact/page.tsx` | Google Maps embed of Magerwa location |

## Content to confirm (not images)
- Home **stats** are placeholders (`500+`, `99%`, `24/7`, `50+`) — replace with
  verified numbers in `app/(site)/page.tsx`.
- Home **testimonial** is a placeholder — swap in a real client quote.

## Brand colors (for matching any new asset)
`#0B6E4F` emerald · `#064E32` forest · `#16A34A` bright · `#34D399` glow ·
`#0A1410` ink-green · `#F5F9F6` paper.
