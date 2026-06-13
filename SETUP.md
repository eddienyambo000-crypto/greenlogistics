# Green Logistics Rwanda — Setup & Deploy

A premium Next.js 16 site + a real backend (Supabase) powering **live shipment
tracking** and a **staff admin dashboard**.

---

## 1. Connect the backend (Supabase) — ~5 min

1. Go to **https://supabase.com** → create a free project (region: Frankfurt is
   closest to Rwanda). Note the database password.
2. In the dashboard → **SQL Editor** → **New query** → paste the entire contents
   of [`supabase/schema.sql`](supabase/schema.sql) → **Run**. This creates the
   tables, the auto tracking-number generator, the event-timeline triggers, the
   Row-Level-Security policies, and the public tracking function.
3. Create the staff login: **Authentication → Users → Add user** → enter an
   email + password (this is what you'll use at `/admin/login`). Tick
   "Auto-confirm".
4. Get your keys: **Project Settings → API**. Copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key

## 2. Add your keys locally

Copy `.env.local.example` → `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

Restart the dev server. `/admin` now requires login; the tracking portal goes
live.

## 3. Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

## 4. Test the whole flow (E2E)

1. Go to `/admin/login`, sign in with the user you created.
2. **New shipment** → fill the form → Create. It gets a number like
   `GLR-2026-0001`.
3. Open `/track`, enter that number → you should see the status + animated
   timeline.
4. Back in `/admin`, hit **Advance** on the shipment → refresh `/track` → a new
   checkpoint appears in the history.
5. On the public site, submit the **Contact → Request a quote** form → it lands
   in the **Quote requests** panel in `/admin` **and** emails the inbox via
   Formspree (`xwvjwgrj`).

---

## 5. Deploy to Vercel

1. Push to a GitHub repo.
2. Import the repo on **vercel.com**.
3. Add the **same 3 env vars** in Vercel → Project → Settings → Environment
   Variables.
4. Deploy. Add the custom domain when ready.

> The `service_role` key is **server-only** — it's never sent to the browser.
> Keep it secret; only put it in `.env.local` and Vercel env vars.

---

## What runs where

| Area | Tech |
|------|------|
| Pages, design | Next.js 16 (App Router) · Tailwind v4 · Motion · Lenis |
| Database, auth | Supabase (Postgres + Auth + RLS) |
| Lead emails | Formspree → `greenlogisticsrwanda@gmail.com` |
| Public tracking | `get_shipment_by_tracking` RPC (RLS-safe, hides sender/receiver PII) |

## To-do before launch (content)

- Replace the hero video — see [`PLACEHOLDERS.md`](PLACEHOLDERS.md).
- Swap image placeholders for real photos.
- Confirm the real stats (shipments, on-time %, etc.) on the home page.
