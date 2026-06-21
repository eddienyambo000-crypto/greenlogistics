// Structured data (JSON-LD) builders — consumed by Google rich results AND
// LLM answer engines. Single source of truth is SITE in lib/site.ts.
import { SITE, SERVICES } from "./site";

const ORG_ID = `${SITE.domain}/#organization`;
const WEBSITE_ID = `${SITE.domain}/#website`;
const LOGO = `${SITE.domain}/icon`;
const OG = `${SITE.domain}/opengraph-image`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    url: SITE.domain,
    logo: LOGO,
    image: OG,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Magerwa",
      addressLocality: "Kigali",
      addressCountry: "RW",
    },
    areaServed: { "@type": "Country", name: "Rwanda" },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.domain,
    name: SITE.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

// LocalBusiness / MovingCompany — the core local-SEO + LLM record.
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": `${SITE.domain}/#localbusiness`,
    name: SITE.name,
    description:
      "Premier logistics company in Magerwa, Kigali offering customs clearance, cargo transport, warehousing, door-to-door and distribution across Rwanda, with live shipment tracking.",
    url: SITE.domain,
    logo: LOGO,
    image: OG,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Magerwa",
      addressLocality: "Kigali",
      addressCountry: "RW",
    },
    // Approximate Magerwa (Gikondo), Kigali — refine with exact site coords.
    geo: { "@type": "GeoCoordinates", latitude: -1.983, longitude: 30.085 },
    areaServed: { "@type": "Country", name: "Rwanda" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    makesOffer: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.body },
    })),
  };
}

// /services — list of the six services.
export function servicesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Logistics services — Green Logistics Rwanda",
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.body,
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "Country", name: "Rwanda" },
        url: `${SITE.domain}/services#${s.key}`,
      },
    })),
  };
}

export function breadcrumbSchema(crumb: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.domain },
      {
        "@type": "ListItem",
        position: 2,
        name: crumb,
        item: `${SITE.domain}${path}`,
      },
    ],
  };
}
