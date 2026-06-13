-- ============================================================
-- GREEN LOGISTICS RWANDA — Database schema
-- Paste this whole file into Supabase → SQL Editor → Run.
-- Safe to re-run (idempotent where practical).
-- ============================================================

-- ---------- Enums ----------
do $$ begin
  create type shipment_status as enum (
    'pending', 'picked_up', 'in_transit',
    'at_warehouse', 'out_for_delivery', 'delivered', 'exception'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type quote_status as enum ('new','contacted','quoted','won','lost');
exception when duplicate_object then null; end $$;

-- ---------- Sequence for tracking numbers ----------
create sequence if not exists shipment_number_seq start 1;

-- ---------- Tables ----------
create table if not exists shipments (
  id                 uuid primary key default gen_random_uuid(),
  tracking_number    text unique,
  status             shipment_status not null default 'pending',
  service            text,
  origin             text,
  destination        text,
  cargo_type         text,
  weight_kg          numeric,
  sender_name        text,
  sender_phone       text,
  receiver_name      text,
  receiver_phone     text,
  current_location   text,
  estimated_delivery date,
  notes              text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create table if not exists shipment_events (
  id           uuid primary key default gen_random_uuid(),
  shipment_id  uuid not null references shipments(id) on delete cascade,
  status       shipment_status not null,
  location     text,
  note         text,
  created_at   timestamptz not null default now()
);

create table if not exists quotes (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text,
  phone       text,
  service     text,
  cargo_type  text,
  origin      text,
  destination text,
  weight_kg   numeric,
  message     text,
  status      quote_status not null default 'new',
  created_at  timestamptz not null default now()
);

create index if not exists idx_events_shipment on shipment_events(shipment_id, created_at);
create index if not exists idx_shipments_status on shipments(status);
create index if not exists idx_quotes_created on quotes(created_at desc);

-- ---------- Triggers ----------

-- 1) Auto tracking number on insert: GLR-YYYY-NNNN
create or replace function set_tracking_number()
returns trigger language plpgsql as $$
begin
  if new.tracking_number is null or new.tracking_number = '' then
    new.tracking_number := 'GLR-' || to_char(now(), 'YYYY') || '-' ||
      lpad(nextval('shipment_number_seq')::text, 4, '0');
  end if;
  return new;
end $$;

drop trigger if exists trg_set_tracking_number on shipments;
create trigger trg_set_tracking_number
  before insert on shipments
  for each row execute function set_tracking_number();

-- 2) Keep updated_at fresh
create or replace function touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists trg_touch_updated_at on shipments;
create trigger trg_touch_updated_at
  before update on shipments
  for each row execute function touch_updated_at();

-- 3) Append a tracking event on create + whenever status changes
create or replace function log_shipment_event()
returns trigger language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    insert into shipment_events (shipment_id, status, location, note)
    values (new.id, new.status, new.current_location, 'Shipment created');
  elsif tg_op = 'UPDATE' and new.status is distinct from old.status then
    insert into shipment_events (shipment_id, status, location, note)
    values (new.id, new.status, new.current_location, null);
  end if;
  return new;
end $$;

drop trigger if exists trg_log_event_ins on shipments;
create trigger trg_log_event_ins
  after insert on shipments
  for each row execute function log_shipment_event();

drop trigger if exists trg_log_event_upd on shipments;
create trigger trg_log_event_upd
  after update on shipments
  for each row execute function log_shipment_event();

-- ---------- Row Level Security ----------
alter table shipments       enable row level security;
alter table shipment_events enable row level security;
alter table quotes          enable row level security;

-- Shipments: only authenticated staff can read/write directly.
drop policy if exists "staff manage shipments" on shipments;
create policy "staff manage shipments" on shipments
  for all to authenticated using (true) with check (true);

-- Events: only authenticated staff direct access (public uses the RPC).
drop policy if exists "staff manage events" on shipment_events;
create policy "staff manage events" on shipment_events
  for all to authenticated using (true) with check (true);

-- Quotes: anyone may submit (public form); only staff can read/update.
drop policy if exists "anyone can submit a quote" on quotes;
create policy "anyone can submit a quote" on quotes
  for insert to anon, authenticated with check (true);

drop policy if exists "staff read quotes" on quotes;
create policy "staff read quotes" on quotes
  for select to authenticated using (true);

drop policy if exists "staff update quotes" on quotes;
create policy "staff update quotes" on quotes
  for update to authenticated using (true) with check (true);

-- ---------- Public tracking RPC (locked down) ----------
-- SECURITY DEFINER → bypasses RLS, but ONLY returns the single shipment
-- matching the exact tracking number + its event timeline. Anon never gets
-- read access to the tables themselves.
create or replace function get_shipment_by_tracking(p_tracking text)
returns json
language sql
security definer
set search_path = public
as $$
  select case when s.id is null then null else json_build_object(
    'shipment', to_jsonb(s) - 'sender_name' - 'sender_phone'
                            - 'receiver_name' - 'receiver_phone' - 'notes',
    'events', coalesce((
        select json_agg(e order by e.created_at asc)
        from shipment_events e where e.shipment_id = s.id
      ), '[]'::json)
  ) end
  from shipments s
  where upper(trim(s.tracking_number)) = upper(trim(p_tracking))
  limit 1;
$$;

revoke all on function get_shipment_by_tracking(text) from public;
grant execute on function get_shipment_by_tracking(text) to anon, authenticated;

-- ---------- Optional seed (handy for demos; delete anytime) ----------
-- insert into shipments (status, service, origin, destination, cargo_type,
--   weight_kg, receiver_name, current_location, estimated_delivery, notes)
-- values ('in_transit','Cargo Transportation','Mombasa','Kigali','Electronics',
--   1200,'Demo Client','Nairobi hub', current_date + 3, 'Demo shipment');
