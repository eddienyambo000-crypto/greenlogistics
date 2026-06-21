import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 14,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "0 50% 50% 50%",
            background: "#34D399",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
