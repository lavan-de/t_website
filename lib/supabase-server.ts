import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Creates a Supabase client for use in Server Components and Server Actions.
 * 
 * This client can:
 * - Read cookies to get the current user session
 * - Write cookies to update the session (e.g., after token refresh)
 * 
 * Use this in:
 * - Server Components (app/page.tsx, app/dashboard/page.tsx, etc.)
 * - Server Actions
 * - Route Handlers (app/api/...)
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Get all cookies from the request
        getAll() {
          return cookieStore.getAll();
        },
        // Set cookies in the response
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // This can fail if called from a Server Component
            // (as opposed to a Server Action or Route Handler)
            // This is fine - the middleware will refresh the session
          }
        },
      },
    }
  );
}

/**
 * Helper function to get the current authenticated user.
 * Returns null if not authenticated.
 * 
 * Usage:
 *   const user = await getUser();
 *   if (!user) redirect('/login');
 */
export async function getUser() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/**
 * Helper function to get the current session.
 * Returns null if not authenticated.
 */
export async function getSession() {
  const supabase = await createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}
