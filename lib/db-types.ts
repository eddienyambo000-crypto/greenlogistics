import type { ShipmentStatus } from "./site";

export type Shipment = {
  id: string;
  tracking_number: string;
  status: ShipmentStatus;
  service: string | null;
  origin: string | null;
  destination: string | null;
  cargo_type: string | null;
  weight_kg: number | null;
  sender_name: string | null;
  sender_phone: string | null;
  receiver_name: string | null;
  receiver_phone: string | null;
  current_location: string | null;
  estimated_delivery: string | null; // ISO date
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type ShipmentEvent = {
  id: string;
  shipment_id: string;
  status: ShipmentStatus;
  location: string | null;
  note: string | null;
  created_at: string;
};

export type QuoteStatus = "new" | "contacted" | "quoted" | "won" | "lost";

export type Quote = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  service: string | null;
  cargo_type: string | null;
  origin: string | null;
  destination: string | null;
  weight_kg: number | null;
  message: string | null;
  status: QuoteStatus;
  created_at: string;
};

/** Shape returned by the public get_shipment_by_tracking RPC. */
export type TrackingResult = {
  shipment: Shipment;
  events: ShipmentEvent[];
};
