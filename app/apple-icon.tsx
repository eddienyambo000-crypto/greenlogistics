import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#0B6E4F,#064E32)",
        }}
      >
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: "0 50% 50% 50%",
            background: "#34D399",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
