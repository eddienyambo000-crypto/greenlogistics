import {
  Workflow,
  FileCheck2,
  DoorOpen,
  Warehouse,
  Truck,
  PackageCheck,
  Clock,
  Navigation,
  CheckCircle2,
  TriangleAlert,
  ShieldCheck,
  MapPin,
  Gauge,
  Users,
  Boxes,
  Globe2,
  type LucideProps,
} from "lucide-react";

const MAP = {
  Workflow,
  FileCheck2,
  DoorOpen,
  Warehouse,
  Truck,
  PackageCheck,
  Clock,
  Navigation,
  CheckCircle2,
  TriangleAlert,
  ShieldCheck,
  MapPin,
  Gauge,
  Users,
  Boxes,
  Globe2,
} as const;

export type IconName = keyof typeof MAP;

export default function Icon({
  name,
  ...props
}: { name: string } & LucideProps) {
  const Cmp = MAP[name as IconName] ?? Boxes;
  return <Cmp {...props} />;
}
