"use client";

import { Bell, Search } from "lucide-react";
import { UserMenu } from "./user-menu";

interface DashboardHeaderProps {
  title: string;
  description?: string;
  userEmail?: string;
}

export function DashboardHeader({ title, description, userEmail }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Title */}
        <div>
          <h1 className="text-xl font-semibold text-white">{title}</h1>
          {description && (
            <p className="text-sm text-gray-400">{description}</p>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs..."
              className="h-9 w-64 rounded-lg border border-white/10 bg-white/5 pl-9 pr-4 text-sm text-white placeholder-gray-400 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50"
            />
          </div>

          {/* Notifications */}
          <button className="relative rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-purple-500" />
          </button>

          {/* User Menu */}
          {userEmail && <UserMenu email={userEmail} />}
        </div>
      </div>
    </header>
  );
}
