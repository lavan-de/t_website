---
name: Website Launch Goals
overview: A step-by-step learning plan to take your Next.js website from local development to a fully configured live site with authentication, analytics, search console, and email.
todos:
  - id: supabase-auth
    content: "Goal 1: Add Supabase Auth to protect the dashboard (login page, middleware, session handling)"
    status: pending
  - id: deploy-vercel
    content: "Goal 2: Deploy website to Vercel and configure environment variables"
    status: pending
  - id: link-domain
    content: "Goal 3: Link custom domain to Vercel and configure DNS"
    status: pending
  - id: google-search-console
    content: "Goal 4: Add Google Search Console and create sitemap"
    status: pending
  - id: google-analytics
    content: "Goal 5: Add Google Analytics 4 tracking to the website"
    status: pending
  - id: email-server
    content: "Goal 6: Set up email server with Resend and configure domain DNS"
    status: pending
---

# Website Launch Learning Plan

## Current Status

- Blog generator: Already complete (Gemini AI + Supabase)
- Website: Running locally, ready for deployment
- Authentication: Not yet implemented (needed before going live)

---

## Goal 1: Add Supabase Authentication

**Why first?** The dashboard must be protected before deploying publicly. You already have Supabase, so this integrates naturally.

**What you'll learn:**

- How authentication flows work (login, logout, sessions)
- How middleware protects routes in Next.js
- How Supabase Auth manages users and sessions
- How to create users for your small team

**Architecture overview:**

```
Public routes (anyone can access):
  / (landing page)
  /login (login page)

Protected routes (requires authentication):
  /dashboard/*
  /api/generate-blog
  /api/blogs
```

**Files to create/modify:**

1. **Install Supabase Auth helpers:**
   ```bash
   npm install @supabase/ssr
   ```

2. **Create auth utility** - `lib/supabase-server.ts`:

   - Server-side Supabase client for auth
   - Cookie-based session management

3. **Create login page** - `app/login/page.tsx`:

   - Email/password form
   - Error handling
   - Redirect to dashboard on success

4. **Create middleware** - `middleware.ts`:

   - Check for valid session on `/dashboard/*` routes
   - Redirect to `/login` if not authenticated

5. **Update dashboard layout** - `app/dashboard/layout.tsx`:

   - Add logout button
   - Show current user info

6. **Enable Auth in Supabase Dashboard:**

   - Go to your Supabase project > Authentication > Providers
   - Enable Email provider
   - Create user accounts for your team members

**Key code snippets:**

Middleware to protect dashboard:

```ts
// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Create response to modify cookies
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect logged-in users away from login page
  if (request.nextUrl.pathname === '/login' && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}
```

**Adding team members:**

1. Go to Supabase Dashboard > Authentication > Users
2. Click "Add user" > "Create new user"
3. Enter email and password for each team member
4. They can log in immediately

**Time investment:** ~45-60 minutes

---

## Goal 2: Deploy Website to Vercel

**Why second?** With authentication in place, your dashboard is protected. Now you can safely deploy publicly.

**What you'll learn:**

- How Vercel connects to your GitHub repository
- How environment variables work in production
- How automatic deployments work (push to main = new deployment)

**Steps:**

1. Commit and push all your changes (including auth) to GitHub
2. Create a Vercel account at [vercel.com](https://vercel.com)
3. Connect your GitHub account
4. Import your `t_website` repository
5. Configure environment variables in Vercel dashboard:

   - `GEMINI_API_KEY` - for blog generation
   - `NEXT_PUBLIC_SUPABASE_URL` - for database
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - for database

6. Deploy and get your `*.vercel.app` URL
7. Update Supabase URL configuration:

   - Go to Supabase > Authentication > URL Configuration
   - Add your Vercel URL to "Site URL" and "Redirect URLs"

**Time investment:** ~15-30 minutes

---

## Goal 3: Link Custom Domain to Vercel

**Why third?** A custom domain is needed for professional branding and is required for proper email setup later.

**What you'll learn:**

- How DNS works (A records, CNAME records)
- How SSL certificates are automatically provisioned
- Domain propagation (can take up to 48 hours)

**Steps:**

1. In Vercel dashboard, go to your project > Settings > Domains
2. Add your custom domain
3. Update DNS records at your domain registrar:

   - Add A record pointing to `76.76.21.21`
   - Or add CNAME pointing to `cname.vercel-dns.com`

4. Wait for SSL certificate to be issued (usually automatic)

**Time investment:** ~15-30 minutes (+ DNS propagation time)

---

## Goal 4: Add Google Search Console

**Why fourth?** Requires a live site with a domain to verify ownership.

**What you'll learn:**

- How search engines discover and index your site
- How to submit a sitemap
- How to monitor search performance and keywords

**Steps:**

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (domain or URL prefix)
3. Verify ownership (DNS record method is recommended)
4. Generate and submit a sitemap (we'll create one)
5. Request indexing for important pages

**Code change needed:** Add sitemap generation to your Next.js app

```tsx
// app/sitemap.ts
export default async function sitemap() {
  return [
    { url: 'https://yourdomain.com', lastModified: new Date() },
    { url: 'https://yourdomain.com/dashboard', lastModified: new Date() },
    // Add more URLs as needed
  ];
}
```

**Time investment:** ~30-45 minutes

---

## Goal 5: Add Google Analytics

**Why fifth?** Best to set up after Search Console so you can link them together.

**What you'll learn:**

- How to track website visitors and behavior
- How to set up conversion goals
- How GA4 event tracking works

**Steps:**

1. Create a Google Analytics 4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (starts with `G-`)
3. Add the GA script to your site

**Code change needed:** Update `app/layout.tsx` to include GA:

```tsx
// Add Google Analytics script to <head>
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

4. Link Google Analytics with Search Console
5. Deploy changes

**Time investment:** ~20-30 minutes

---

## Blog Generator (Already Complete)

Your blog generator is fully functional with:

- Multi-step form wizard ([`app/dashboard/blog-generator/page.tsx`](app/dashboard/blog-generator/page.tsx))
- Google Gemini AI integration ([`app/api/generate-blog/route.ts`](app/api/generate-blog/route.ts))
- Supabase database storage ([`lib/supabase.ts`](lib/supabase.ts))

---

## Goal 6: Set Up Email Server and Link to Domain

**Why sixth?** Requires domain DNS to be properly configured and stable.

**What you'll learn:**

- How email DNS records work (MX, SPF, DKIM, DMARC)
- Email authentication and deliverability
- Transactional vs marketing email

**Recommended approach - Use an email service:**

- **Resend** (developer-friendly, great free tier)
- **Postmark** (excellent deliverability)
- **SendGrid** (widely used)

**Steps with Resend (recommended):**

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain (add DNS records)
3. Get your API key
4. Install the package: `npm install resend`
5. Create an email sending API route

**Example API route:**

```ts
// app/api/send-email/route.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { to, subject, html } = await request.json();
  
  const { data, error } = await resend.emails.send({
    from: 'hello@yourdomain.com',
    to,
    subject,
    html,
  });
  
  return Response.json({ data, error });
}
```

**Time investment:** ~45-60 minutes

---

## Summary Order

- **Goal 1:** Supabase Authentication - Protect dashboard before going live
- **Goal 2:** Deploy to Vercel - Get your site live
- **Goal 3:** Link Domain - Add your custom domain
- **Goal 4:** Google Search Console - Set up search indexing
- **Goal 5:** Google Analytics - Track visitor behavior
- **Goal 6:** Email Server - Enable transactional emails
- **Blog Generator** - Already complete!