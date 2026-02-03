"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a Supabase client for use in Client Components (browser).
 * 
 * This client:
 * - Runs in the browser
 * - Automatically handles cookies for session persistence
 * - Used for login, logout, and auth state changes
 * 
 * Use this in:
 * - Client Components (components with "use client")
 * - Login/logout forms
 * - Auth state listeners
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
