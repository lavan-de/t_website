# 📋 Project Setup & Best Practices Guide

> Your go-to reference for starting any new web project the right way.
> Keep this file handy and follow it step-by-step for every new project.

---

## Table of Contents

1. [Phase 1: Planning](#phase-1-planning)
2. [Phase 2: Project Creation](#phase-2-project-creation)
3. [Phase 3: Folder Structure](#phase-3-folder-structure)
4. [Phase 4: Foundation Files](#phase-4-foundation-files)
5. [Phase 5: Component Architecture](#phase-5-component-architecture)
6. [Phase 6: Pre-Development Checklist](#phase-6-pre-development-checklist)
7. [Phase 7: Development Workflow](#phase-7-development-workflow)
8. [Phase 8: Pre-Deployment Checklist](#phase-8-pre-deployment-checklist)
9. [Quick Reference](#quick-reference)

---

## Phase 1: Planning

**Before writing any code, answer these questions:**

### 1.1 Project Definition

```markdown
Project Name: _______________
One-line description: _______________
Target audience: _______________
```

### 1.2 Scope Checklist

- [ ] List all pages needed
- [ ] List all features needed
- [ ] Identify what data needs to be stored (if any)
- [ ] Identify third-party services needed (auth, payments, etc.)
- [ ] Define MVP vs nice-to-have features

### 1.3 Tech Stack Decision

| Decision | Options | Your Choice |
|----------|---------|-------------|
| Framework | Next.js, Nuxt, SvelteKit | ___________ |
| Language | TypeScript (recommended), JavaScript | ___________ |
| Styling | Tailwind CSS (recommended), CSS Modules, Styled Components | ___________ |
| Database | Supabase, PlanetScale, Neon, None | ___________ |
| Auth | Clerk, NextAuth, Supabase Auth, None | ___________ |
| Deployment | Vercel (recommended), Netlify, Railway | ___________ |

### 1.4 Page Planning

List every page and its purpose:

```markdown
Page            | Route          | Purpose
----------------|----------------|------------------
Home            | /              | Landing page
About           | /about         | Company info
Pricing         | /pricing       | Pricing plans
Contact         | /contact       | Contact form
Dashboard       | /dashboard     | User dashboard (if auth)
```

---

## Phase 2: Project Creation

### 2.1 Create Next.js Project

```bash
# Navigate to your projects folder
cd ~/your-projects-folder

# Create new Next.js app
npx create-next-app@latest project-name

# Or create in current folder
npx create-next-app@latest .
```

### 2.2 Recommended Prompts

| Question | Recommended |
|----------|-------------|
| TypeScript? | **Yes** |
| ESLint? | **Yes** |
| Tailwind CSS? | **Yes** |
| `src/` directory? | **Yes** (better organization) |
| App Router? | **Yes** |
| Turbopack? | **Yes** |
| Import alias? | **No** (default `@/*` is fine) |

### 2.3 Install Essential Packages

```bash
# Utility for merging Tailwind classes
npm install clsx tailwind-merge

# Form validation
npm install zod

# If you need icons
npm install lucide-react

# If you need animations
npm install framer-motion
```

### 2.4 Initialize Git (if not auto-initialized)

```bash
git init
git add .
git commit -m "Initial commit: project setup"
```

---

## Phase 3: Folder Structure

### 3.1 Standard Structure Template

Create this structure for any scalable project:

```
project-root/
│
├── src/                        # Source code (if using src/)
│   ├── app/                    # Next.js App Router
│   │   ├── (marketing)/        # Public pages group
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── pricing/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (auth)/             # Auth pages group (if needed)
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (dashboard)/        # Protected pages group (if needed)
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── settings/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── api/                # API routes (if needed)
│   │   │   └── example/
│   │   │       └── route.ts
│   │   │
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── loading.tsx         # Global loading state
│   │   ├── error.tsx           # Global error boundary
│   │   └── not-found.tsx       # Custom 404 page
│   │
│   ├── components/             # React components
│   │   ├── ui/                 # Base UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   └── index.ts        # Barrel export
│   │   │
│   │   ├── layout/             # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── sections/           # Page sections
│   │   │   ├── hero.tsx
│   │   │   ├── features.tsx
│   │   │   ├── testimonials.tsx
│   │   │   ├── pricing.tsx
│   │   │   ├── cta.tsx
│   │   │   ├── faq.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── forms/              # Form components
│   │       ├── contact-form.tsx
│   │       ├── newsletter-form.tsx
│   │       └── index.ts
│   │
│   ├── lib/                    # Utilities & helpers
│   │   ├── utils.ts            # General utilities
│   │   └── constants.ts        # App constants
│   │
│   ├── config/                 # Configuration
│   │   ├── site.ts             # Site metadata
│   │   └── navigation.ts       # Nav links config
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-media-query.ts
│   │   ├── use-scroll.ts
│   │   └── index.ts
│   │
│   └── types/                  # TypeScript types
│       └── index.ts
│
├── public/                     # Static assets
│   ├── images/
│   ├── fonts/
│   └── favicon.ico
│
├── .env.example                # Environment variables template
├── .env.local                  # Local env vars (git ignored)
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### 3.2 Folder Creation Commands

```bash
# If using src/ directory
mkdir -p src/components/{ui,layout,sections,forms}
mkdir -p src/lib
mkdir -p src/config
mkdir -p src/hooks
mkdir -p src/types
mkdir -p public/images

# If NOT using src/ directory
mkdir -p components/{ui,layout,sections,forms}
mkdir -p lib
mkdir -p config
mkdir -p hooks
mkdir -p types
mkdir -p public/images
```

### 3.3 Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Button.tsx`, `HeroSection.tsx` |
| Component files | kebab-case | `button.tsx`, `hero-section.tsx` |
| Utilities | kebab-case | `format-date.ts`, `cn.ts` |
| Hooks | use-* prefix | `use-media-query.ts` |
| Types | PascalCase | `User`, `BlogPost` |
| Constants | SCREAMING_SNAKE | `MAX_FILE_SIZE`, `API_URL` |
| Folders | kebab-case | `hero-section/`, `user-profile/` |

---

## Phase 4: Foundation Files

**Create these files before building features.**

### 4.1 Site Configuration

```typescript
// src/config/site.ts (or config/site.ts)

export const siteConfig = {
  name: "Your Project Name",
  description: "Your project description for SEO",
  url: "https://yourdomain.com",
  ogImage: "https://yourdomain.com/og.jpg",
  creator: "Your Name",
  keywords: ["keyword1", "keyword2", "keyword3"],
  links: {
    twitter: "https://twitter.com/yourhandle",
    github: "https://github.com/yourhandle",
  },
};

export type SiteConfig = typeof siteConfig;
```

### 4.2 Navigation Configuration

```typescript
// src/config/navigation.ts (or config/navigation.ts)

export const mainNavItems = [
  { title: "Features", href: "#features" },
  { title: "Pricing", href: "/pricing" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export const footerNavItems = {
  product: [
    { title: "Features", href: "#features" },
    { title: "Pricing", href: "/pricing" },
    { title: "FAQ", href: "#faq" },
  ],
  company: [
    { title: "About", href: "/about" },
    { title: "Blog", href: "/blog" },
    { title: "Careers", href: "/careers" },
  ],
  legal: [
    { title: "Privacy", href: "/privacy" },
    { title: "Terms", href: "/terms" },
  ],
};
```

### 4.3 Utility Functions

```typescript
// src/lib/utils.ts (or lib/utils.ts)

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes safely
 * Handles conflicts like 'px-2 px-4' → 'px-4'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date for display
 */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Delay execution (useful for debugging loading states)
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate a URL-friendly slug from a string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
```

### 4.4 TypeScript Types

```typescript
// src/types/index.ts (or types/index.ts)

// Navigation types
export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
}

// Common component props
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

// API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Add your project-specific types below
// export interface User { ... }
// export interface BlogPost { ... }
```

### 4.5 Environment Variables Template

```bash
# .env.example (commit this file)

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Database (if using)
DATABASE_URL=

# Auth (if using)
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Third-party services
# STRIPE_SECRET_KEY=
# RESEND_API_KEY=
```

### 4.6 Barrel Exports

```typescript
// src/components/ui/index.ts
export { Button } from "./button";
export { Card } from "./card";
export { Input } from "./input";
export { Badge } from "./badge";

// This allows clean imports:
// import { Button, Card, Input } from "@/components/ui";
```

---

## Phase 5: Component Architecture

### 5.1 Base Button Component Template

```typescript
// src/components/ui/button.tsx

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          // Variants
          {
            "bg-primary text-white hover:bg-primary/90": variant === "primary",
            "bg-secondary text-white hover:bg-secondary/90": variant === "secondary",
            "border border-input bg-transparent hover:bg-accent": variant === "outline",
            "hover:bg-accent": variant === "ghost",
          },
          // Sizes
          {
            "h-8 px-3 text-sm rounded-md": size === "sm",
            "h-10 px-4 text-sm rounded-lg": size === "md",
            "h-12 px-6 text-base rounded-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps };
```

### 5.2 Base Card Component Template

```typescript
// src/components/ui/card.tsx

import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-6 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: CardProps) {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: CardProps) {
  return (
    <h3 className={cn("text-xl font-semibold", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: CardProps) {
  return (
    <p className={cn("text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }: CardProps) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}
```

### 5.3 Section Component Template

```typescript
// src/components/sections/hero.tsx

import { Button } from "@/components/ui";

export function HeroSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Headline Here
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your subheadline that explains the value proposition.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">Primary CTA</Button>
            <Button variant="outline" size="lg">Secondary CTA</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### 5.4 Component Guidelines

| Guideline | Why |
|-----------|-----|
| One component per file | Easier to find and maintain |
| Props interface above component | Clear contract, good for AI |
| Use `forwardRef` for interactive elements | Allows refs for form libraries |
| Accept `className` prop | Enables customization |
| Use `cn()` for conditional classes | Prevents Tailwind conflicts |
| Export from barrel file | Clean imports |

---

## Phase 6: Pre-Development Checklist

**Before you start building features, verify:**

### Project Setup
- [ ] Next.js project created with TypeScript
- [ ] Tailwind CSS working (test with a colored div)
- [ ] ESLint running without errors (`npm run lint`)
- [ ] Dev server starts without issues (`npm run dev`)
- [ ] Git initialized with first commit

### Folder Structure
- [ ] All folders created as per template
- [ ] Barrel export files created (`index.ts`)

### Foundation Files
- [ ] `config/site.ts` - Site metadata configured
- [ ] `config/navigation.ts` - Nav items defined
- [ ] `lib/utils.ts` - Utility functions ready
- [ ] `types/index.ts` - Base types defined
- [ ] `.env.example` - Template created

### Base Components
- [ ] Button component created and working
- [ ] Card component created (if needed)
- [ ] Header component created
- [ ] Footer component created

### Configuration
- [ ] `layout.tsx` - Metadata updated with site info
- [ ] `globals.css` - Base styles configured
- [ ] Custom fonts set up (if using)

### Git
- [ ] `.gitignore` includes `.env.local`
- [ ] Initial structure committed

---

## Phase 7: Development Workflow

### 7.1 Feature Development Process

```
1. Create/update types (if needed)
2. Create component(s)
3. Add to barrel exports
4. Use in page
5. Test thoroughly
6. Commit with clear message
```

### 7.2 Commit Message Convention

```bash
# Format: type: description

feat: add user authentication
fix: resolve navbar mobile menu bug
style: update button hover states
refactor: extract form validation logic
docs: add API documentation
test: add unit tests for utils
chore: update dependencies
```

### 7.3 Branch Strategy (for larger projects)

```bash
main          # Production-ready code
├── develop   # Integration branch
    ├── feature/add-auth      # New features
    ├── fix/navbar-bug        # Bug fixes
    └── refactor/forms        # Refactoring
```

### 7.4 Testing Approach

| Layer | What to Test | Tool |
|-------|--------------|------|
| Unit | Utility functions, hooks | Vitest |
| Component | Individual components | React Testing Library |
| Integration | API routes, data flow | Vitest |
| E2E | Critical user flows | Playwright |

**For small projects:** Focus on E2E tests for critical paths (signup, checkout).

---

## Phase 8: Pre-Deployment Checklist

### Code Quality
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] No console.log statements in production code
- [ ] No hardcoded secrets or API keys

### SEO & Meta
- [ ] Page titles set for all pages
- [ ] Meta descriptions set for all pages
- [ ] Open Graph images configured
- [ ] Favicon and app icons set
- [ ] `robots.txt` configured (if needed)
- [ ] `sitemap.xml` generated (if needed)

### Performance
- [ ] Images optimized (use `next/image`)
- [ ] Large dependencies code-split
- [ ] No unnecessary re-renders
- [ ] Lighthouse score acceptable (aim for 90+)

### Accessibility
- [ ] All images have alt text
- [ ] Color contrast passes WCAG
- [ ] Keyboard navigation works
- [ ] Form labels properly associated
- [ ] Focus states visible

### Security
- [ ] Environment variables in Vercel/host
- [ ] No secrets in client-side code
- [ ] Input validation on forms
- [ ] API routes protected (if needed)

### Mobile
- [ ] Responsive on all screen sizes
- [ ] Touch targets large enough (44x44px min)
- [ ] No horizontal scroll
- [ ] Forms usable on mobile

### Final Steps
- [ ] Test on multiple browsers
- [ ] Test on real mobile devices
- [ ] Check all links work
- [ ] Remove any test/placeholder content
- [ ] Update README with project info

---

## Quick Reference

### Essential Commands

```bash
# Development
npm run dev           # Start dev server
npm run build         # Build for production
npm run start         # Run production build locally
npm run lint          # Check for linting errors
npm run lint -- --fix # Auto-fix linting errors
npx tsc --noEmit      # Type check without building

# Git
git add .                    # Stage all changes
git commit -m "message"      # Commit
git push                     # Push to remote
git checkout -b feature/x    # Create new branch
git merge feature/x          # Merge branch

# Vercel
vercel                # Deploy preview
vercel --prod         # Deploy to production
vercel env pull       # Pull env vars locally

# Package management
npm install package   # Add dependency
npm install -D pkg    # Add dev dependency
npm update            # Update packages
npm outdated          # Check for updates
```

### File Templates Quick Copy

#### New Page
```typescript
export default function PageName() {
  return (
    <main>
      <h1>Page Title</h1>
    </main>
  );
}
```

#### New Component
```typescript
import { cn } from "@/lib/utils";

interface ComponentNameProps {
  className?: string;
  children?: React.ReactNode;
}

export function ComponentName({ className, children }: ComponentNameProps) {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
}
```

#### New API Route
```typescript
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello" });
}

export async function POST(request: Request) {
  const data = await request.json();
  return NextResponse.json({ received: data });
}
```

#### New Hook
```typescript
import { useState, useEffect } from "react";

export function useCustomHook() {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Effect logic
  }, []);

  return { state };
}
```

---

## Project Kickoff Template

Copy this for each new project:

```markdown
# Project: _______________

## Overview
- **Description:** 
- **Target Users:** 
- **Deadline:** 

## Pages
- [ ] Home (/)
- [ ] About (/about)
- [ ] ...

## Features
- [ ] Feature 1
- [ ] Feature 2
- [ ] ...

## Tech Stack
- Framework: Next.js
- Styling: Tailwind CSS
- Database: 
- Auth: 
- Hosting: Vercel

## Setup Progress
- [ ] Project created
- [ ] Folder structure set up
- [ ] Foundation files created
- [ ] Base components ready
- [ ] First page complete
- [ ] Deployed to Vercel

## Notes
- 
```

---

## Remember

> **"Structure creates freedom."**  
> A well-organized project lets you move fast without breaking things.

> **"Make it work, make it right, make it fast."**  
> Don't optimize prematurely. Get it working first.

> **"The best code is no code."**  
> Before building, ask if there's a simpler solution.

---

*Keep this guide handy. Update it as you learn new best practices.*

*Last updated: February 2026*
