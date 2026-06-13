// Central site config — single source of truth for NAP, services, nav.
export const SITE = {
  name: "Green Logistics Rwanda",
  shortName: "Green Logistics",
  tagline: "Rwanda's Goods, Moving Faster.",
  domain: "https://greenlogisticsrwanda.com",
  phone: "+250 788 955 714",
  phoneRaw: "250788955714",
  email: "greenlogisticsrwanda@gmail.com",
  address: "Magerwa, Kigali, Rwanda",
  hours: "Mon–Sat: 8:00 AM – 6:00 PM",
  whatsappMsg:
    "Hello Green Logistics Rwanda 👋 I'd like to get a quote for a shipment.",
  formspree: "https://formspree.io/f/xwvjwgrj",
  developer: {
    name: "EDDIE NYAMBO",
    url: "https://eddie-portfolio-gamma.vercel.app/",
  },
} as const;

export const whatsappLink = (msg: string = SITE.whatsappMsg) =>
  `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(msg)}`;

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Track Shipment", href: "/track" },
  { label: "Contact", href: "/contact" },
] as const;

export type ServiceKey =
  | "custom"
  | "customs"
  | "door"
  | "warehousing"
  | "transport"
  | "distribution";

export const SERVICES: {
  key: ServiceKey;
  title: string;
  short: string;
  body: string;
  icon: string; // lucide name
}[] = [
  {
    key: "custom",
    title: "Custom Logistics Solutions",
    short: "Supply chains, engineered around you.",
    body: "Tailored supply chain solutions for businesses with complex logistics needs. We design flexible strategies that cut costs and save time.",
    icon: "Workflow",
  },
  {
    key: "customs",
    title: "Customs Clearance",
    short: "Cross-border, without the friction.",
    body: "We simplify cross-border trade by handling all customs documentation and compliance requirements, ensuring smooth, fast clearance.",
    icon: "FileCheck2",
  },
  {
    key: "door",
    title: "Door-to-Door Services",
    short: "Pickup to delivery, fully managed.",
    body: "Seamless, end-to-end service from pickup to delivery. Sit back while we manage every step of the journey.",
    icon: "DoorOpen",
  },
  {
    key: "warehousing",
    title: "Warehousing & Storage",
    short: "Secure storage, watched 24/7.",
    body: "Secure, climate-controlled storage with 24/7 monitoring. Whether you need short-term or long-term warehousing, we keep your cargo safe and accessible.",
    icon: "Warehouse",
  },
  {
    key: "transport",
    title: "Cargo Transportation",
    short: "Reliable movement, GPS-tracked.",
    body: "Reliable transportation across Rwanda and beyond. Our fleet ensures timely delivery, with GPS tracking and experienced drivers you can trust.",
    icon: "Truck",
  },
  {
    key: "distribution",
    title: "Distribution & Delivery",
    short: "Last mile, done right.",
    body: "From the warehouse to your customer's doorstep, our distribution services are built for speed, accuracy, and customer satisfaction.",
    icon: "PackageCheck",
  },
];

// Shipment status model (mirrors the DB enum)
export const STATUS_FLOW = [
  "pending",
  "picked_up",
  "in_transit",
  "at_warehouse",
  "out_for_delivery",
  "delivered",
] as const;

export type ShipmentStatus =
  | (typeof STATUS_FLOW)[number]
  | "exception";

export const STATUS_META: Record<
  ShipmentStatus,
  { label: string; icon: string }
> = {
  pending: { label: "Pending Pickup", icon: "Clock" },
  picked_up: { label: "Picked Up", icon: "PackageCheck" },
  in_transit: { label: "In Transit", icon: "Truck" },
  at_warehouse: { label: "At Warehouse", icon: "Warehouse" },
  out_for_delivery: { label: "Out for Delivery", icon: "Navigation" },
  delivered: { label: "Delivered", icon: "CheckCircle2" },
  exception: { label: "Exception", icon: "TriangleAlert" },
};
