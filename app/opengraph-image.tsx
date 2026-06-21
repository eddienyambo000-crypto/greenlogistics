import { ImageResponse } from "next/og";

export const alt = "Green Logistics Rwanda — Rwanda's Goods, Moving Faster";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Og() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(900px 500px at 12% -10%, #16A34A55, transparent), radial-gradient(800px 600px at 110% 120%, #0B6E4F66, transparent), #0A1410",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        {/* top: mark + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg,#0B6E4F,#064E32)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #34D39955",
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "0 50% 50% 50%",
                background: "#34D399",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>
              GREEN LOGISTICS
            </div>
            <div
              style={{ fontSize: 14, letterSpacing: 6, color: "#9fb8ac" }}
            >
              RWANDA
            </div>
          </div>
        </div>

        {/* middle: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -2,
              maxWidth: 940,
            }}
          >
            <span>Rwanda&apos;s Goods, Moving&nbsp;</span>
            <span style={{ color: "#34D399" }}>Faster.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#c7d6ce",
              maxWidth: 820,
            }}
          >
            Customs clearance · Cargo transport · Warehousing · Live tracking
          </div>
        </div>

        {/* bottom: location pill */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#0A1410",
              background: "#34D399",
              padding: "10px 22px",
              borderRadius: 999,
            }}
          >
            Magerwa · Kigali · Rwanda
          </div>
          <div style={{ fontSize: 22, color: "#9fb8ac" }}>
            greenlogisticsrwanda.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
