import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Middleware runs BEFORE every matched request.
 * 
 * Flow:
 * 1. User visits /dashboard
 * 2. Middleware intercepts the request
 * 3. Middleware checks if user has valid session (via cookies)
 * 4. If no session → redirect to /login
 * 5. If session exists → allow request to continue
 */
export async function middleware(request: NextRequest) {
  // Create a response object that we can modify
  let response = NextResponse.next({
    request,
  });

  // Create Supabase client with access to request/response cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Read cookies from the incoming request
        getAll() {
          return request.cookies.getAll();
        },
        // Write cookies to the outgoing response
        setAll(cookiesToSet) {
          // First update the request cookies (for downstream code)
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          // Then update the response cookies (for the browser)
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // IMPORTANT: Use getUser() instead of getSession()
  // getUser() validates the session with Supabase servers
  // getSession() only reads from cookies (could be tampered with)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Protected routes: require authentication
  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      // Not logged in → redirect to login
      const loginUrl = new URL("/login", request.url);
      // Save where they were trying to go (so we can redirect back after login)
      loginUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Login page: redirect to dashboard if already logged in
  if (pathname === "/login") {
    if (user) {
      // Already logged in → redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Protected API routes: return 401 instead of redirect
  if (pathname.startsWith("/api/generate-blog") || pathname.startsWith("/api/blogs")) {
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - please log in" },
        { status: 401 }
      );
    }
  }

  return response;
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    // Protected pages
    "/dashboard/:path*",
    "/login",
    // Protected API routes
    "/api/generate-blog/:path*",
    "/api/blogs/:path*",
  ],
};
