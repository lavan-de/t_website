"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Settings,
  BarChart3,
  Users,
  CreditCard,
  HelpCircle,
  LogOut,
  Sparkles,
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
    active: true, // This one works!
    highlight: true,
  },
  {
    title: "My Content",
    href: "#",
    icon: FileText,
    active: false,
  },
  {
    title: "Analytics",
    href: "#",
    icon: BarChart3,
    active: false,
  },
  {
    title: "Team",
    href: "#",
    icon: Users,
    active: false,
  },
];

const bottomNavItems = [
  {
    title: "Billing",
    href: "#",
    icon: CreditCard,
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
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-slate-900/50 backdrop-blur-xl">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
            <Sparkles className="h-4 w-4 text-white" />
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
                    ? "bg-purple-500/20 text-purple-400"
                    : item.active
                    ? "text-gray-300 hover:bg-white/5 hover:text-white"
                    : "cursor-not-allowed text-gray-500",
                  item.highlight && !isActive && "text-purple-400 hover:text-purple-300"
                )}
                onClick={(e) => !item.active && e.preventDefault()}
              >
                <Icon className="h-5 w-5" />
                {item.title}
                {item.highlight && (
                  <span className="ml-auto rounded-full bg-purple-500/20 px-2 py-0.5 text-xs text-purple-400">
                    New
                  </span>
                )}
                {!item.active && (
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
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-sm font-medium text-white">
              U
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">User</p>
              <p className="text-xs text-gray-400">Free Plan</p>
            </div>
            <button className="rounded-lg p-1.5 text-gray-400 hover:bg-white/5 hover:text-white">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
