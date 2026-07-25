import { ImageResponse } from "next/og";

import { site } from "@/lib/data/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "#FFFFFF",
          color: "#0A0A0A",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 38,
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            color: "#666666",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
          }}
        >
          {site.role}
        </div>
        <div
          style={{
            fontSize: 150,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginTop: 24,
            lineHeight: 1,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            width: 140,
            height: 8,
            background: "#0A0A0A",
            marginTop: 40,
            borderRadius: 4,
          }}
        />
        <div
          style={{
            fontSize: 32,
            marginTop: 40,
            color: "#666666",
            maxWidth: 900,
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          React · REST APIs · MongoDB · Python · ML
        </div>
      </div>
    ),
    size,
  );
}
