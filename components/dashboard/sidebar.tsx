"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  Users,
  Calendar,
  BarChart3,
  MessageSquare,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Building2,
  Sparkles,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const mainNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    title: "Blog Generator",
    href: "/dashboard/blog-generator",
    icon: Sparkles,
    active: true,
    highlight: true,
  },
  {
    title: "My Content",
    href: "/dashboard/my-content",
    icon: FileText,
    active: true,
  },
  {
    title: "Test Email",
    href: "/dashboard/test-email",
    icon: Mail,
    active: true,
  },
  {
    title: "Listings",
    href: "/dashboard/listings",
    icon: Home,
    active: false,
  },
  {
    title: "Leads",
    href: "/dashboard/leads",
    icon: Users,
    active: false,
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: Calendar,
    active: false,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    active: false,
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
    active: false,
    badge: "3",
  },
];

const bottomNavItems = [
  {
    title: "Documents",
    href: "#",
    icon: FileText,
    active: false,
  },
  {
    title: "Settings",
    href: "#",
    icon: Settings,
    active: false,
  },
  {
    title: "Help & Support",
    href: "#",
    icon: HelpCircle,
    active: false,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-neutral-950/50 backdrop-blur-xl">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-700 to-amber-900">
            <Building2 className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white">{siteConfig.name}</span>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Main
          </p>
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.active ? item.href : "#"}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-amber-700/20 text-amber-500"
                    : item.active
                    ? "text-gray-300 hover:bg-white/5 hover:text-white"
                    : "cursor-not-allowed text-gray-500",
                  item.highlight && !isActive && item.active && "text-amber-500 hover:text-amber-400"
                )}
                onClick={(e) => !item.active && e.preventDefault()}
              >
                <Icon className="h-5 w-5" />
                {item.title}
                {item.badge && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-amber-700 text-xs text-white">
                    {item.badge}
                  </span>
                )}
                {item.highlight && item.active && !item.badge && (
                  <span className="ml-auto rounded-full bg-amber-700/20 px-2 py-0.5 text-xs text-amber-500">
                    New
                  </span>
                )}
                {!item.active && !item.badge && (
                  <span className="ml-auto rounded-full bg-gray-700 px-2 py-0.5 text-xs text-gray-400">
                    Soon
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t border-white/10 px-3 py-4">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Account
          </p>
          {bottomNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.active ? item.href : "#"}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  item.active
                    ? "text-gray-300 hover:bg-white/5 hover:text-white"
                    : "cursor-not-allowed text-gray-500"
                )}
                onClick={(e) => !item.active && e.preventDefault()}
              >
                <Icon className="h-5 w-5" />
                {item.title}
                {!item.active && (
                  <span className="ml-auto rounded-full bg-gray-700 px-2 py-0.5 text-xs text-gray-400">
                    Soon
                  </span>
                )}
              </Link>
            );
          })}

          {/* User Section */}
          <div className="mt-4 flex items-center gap-3 rounded-lg bg-white/5 px-3 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-700 to-amber-900 text-sm font-medium text-white">
              JD
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
            <Link href="/" className="rounded-lg p-1.5 text-gray-400 hover:bg-white/5 hover:text-white">
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
