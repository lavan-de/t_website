"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { LogOut, User, ChevronDown, Loader2 } from "lucide-react";

interface UserMenuProps {
  email: string;
}

export function UserMenu({ email }: UserMenuProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();

      // Redirect to login page
      router.push("/login");
      router.refresh(); // Clear server-side session cache
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  // Get initials from email (e.g., "john@example.com" → "J")
  const initial = email.charAt(0).toUpperCase();

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
      >
        {/* Avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
          <span className="text-sm font-medium">{initial}</span>
        </div>
        {/* Email (hidden on small screens) */}
        <span className="hidden md:block text-sm text-gray-300 max-w-[150px] truncate">
          {email}
        </span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop to close menu */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-white/10 bg-neutral-900 py-2 shadow-xl z-50">
            {/* User Info */}
            <div className="px-4 py-2 border-b border-white/10">
              <p className="text-sm font-medium text-white truncate">{email}</p>
              <p className="text-xs text-gray-500">Logged in</p>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white disabled:opacity-50 transition-colors"
              >
                {isLoggingOut ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4" />
                )}
                {isLoggingOut ? "Signing out..." : "Sign out"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
