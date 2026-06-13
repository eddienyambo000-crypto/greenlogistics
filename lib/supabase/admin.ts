import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client. SERVER ONLY — never import into a client component.
 * Bypasses RLS; used for trusted admin writes inside server actions.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
