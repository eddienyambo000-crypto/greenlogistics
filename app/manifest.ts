import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Green Logistics",
    description:
      "Premier logistics in Magerwa, Kigali — customs, cargo transport, warehousing, door-to-door & live shipment tracking across Rwanda.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A1410",
    theme_color: "#0B6E4F",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
