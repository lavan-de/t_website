"use client";

import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard";
import { useAuth } from "@/components/dashboard/auth-provider";
import {
  Home,
  Users,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Calendar,
  MessageSquare,
  BarChart3,
  Clock,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    title: "Active Listings",
    value: "24",
    change: "+3 this month",
    icon: Home,
    color: "amber",
  },
  {
    title: "Total Leads",
    value: "156",
    change: "+12 this week",
    icon: Users,
    color: "stone",
  },
  {
    title: "Monthly Revenue",
    value: "$48.5K",
    change: "+8% from last month",
    icon: DollarSign,
    color: "green",
  },
  {
    title: "Properties Sold",
    value: "8",
    change: "This quarter",
    icon: TrendingUp,
    color: "amber",
  },
];

const quickActions = [
  {
    title: "Blog Generator",
    description: "Create SEO-optimized content with AI",
    icon: Sparkles,
    href: "/dashboard/blog-generator",
    color: "amber",
    active: true,
  },
  {
    title: "Add New Listing",
    description: "Create a new property listing",
    icon: Home,
    href: "/dashboard/listings",
    color: "stone",
    active: false,
  },
  {
    title: "View Leads",
    description: "Manage your client leads",
    icon: Users,
    href: "/dashboard/leads",
    color: "neutral",
    active: false,
  },
];

const recentLeads = [
  {
    name: "Sarah Johnson",
    property: "Modern Luxury Villa",
    time: "2 hours ago",
    status: "hot",
  },
  {
    name: "Michael Chen",
    property: "Downtown Penthouse",
    time: "5 hours ago",
    status: "warm",
  },
  {
    name: "Emily Davis",
    property: "Coastal Estate",
    time: "1 day ago",
    status: "new",
  },
  {
    name: "Robert Wilson",
    property: "Urban Loft",
    time: "2 days ago",
    status: "warm",
  },
];

const upcomingAppointments = [
  {
    title: "Property Viewing",
    client: "Sarah Johnson",
    property: "123 Ocean Drive",
    time: "Today, 2:00 PM",
  },
  {
    title: "Client Meeting",
    client: "Michael Chen",
    property: "Office",
    time: "Today, 4:30 PM",
  },
  {
    title: "Property Viewing",
    client: "Emily Davis",
    property: "456 Sunset Blvd",
    time: "Tomorrow, 10:00 AM",
  },
];

const statusColors: Record<string, string> = {
  hot: "bg-red-500/20 text-red-400",
  warm: "bg-amber-500/20 text-amber-400",
  new: "bg-stone-500/20 text-stone-400",
};

export default function DashboardPage() {
  const { userEmail } = useAuth();
  
  // Get first name from email (before @) or show email
  const displayName = userEmail?.split("@")[0] || "there";
  
  return (
    <>
      <DashboardHeader
        title="Dashboard"
        description={`Welcome back, ${displayName}! Here's your overview.`}
        userEmail={userEmail || undefined}
      />

      <div className="p-6">
        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      stat.color === "amber"
                        ? "bg-amber-700/20"
                        : stat.color === "green"
                        ? "bg-green-500/20"
                        : "bg-stone-500/20"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        stat.color === "amber"
                          ? "text-amber-500"
                          : stat.color === "green"
                          ? "text-green-400"
                          : "text-stone-400"
                      }`}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.title}</p>
                </div>
                <p className="mt-2 text-xs text-gray-500">{stat.change}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-white">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.title}
                  href={action.active ? action.href : "#"}
                  className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all ${
                    action.active
                      ? "hover:border-amber-700/50 hover:bg-white/10"
                      : "cursor-not-allowed opacity-60"
                  }`}
                  onClick={(e) => !action.active && e.preventDefault()}
                >
                  {/* Gradient overlay on hover */}
                  {action.active && (
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-700/10 to-stone-700/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  )}

                  <div className="relative">
                    <div
                      className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
                        action.color === "amber"
                          ? "bg-amber-700/20"
                          : action.color === "stone"
                          ? "bg-stone-500/20"
                          : "bg-neutral-500/20"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          action.color === "amber"
                            ? "text-amber-500"
                            : action.color === "stone"
                            ? "text-stone-400"
                            : "text-neutral-400"
                        }`}
                      />
                    </div>
                    <h3 className="mb-1 text-lg font-semibold text-white">
                      {action.title}
                    </h3>
                    <p className="mb-4 text-sm text-gray-400">
                      {action.description}
                    </p>
                    <div className="flex items-center text-sm font-medium text-amber-500">
                      {action.active ? (
                        <>
                          Get started
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      ) : (
                        <span className="text-gray-500">Coming soon</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Leads */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Recent Leads</h2>
              <Link
                href="/dashboard/leads"
                className="text-sm text-amber-500 hover:text-amber-400"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentLeads.map((lead, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-white/5 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-700 to-amber-900 text-sm font-medium text-white">
                      {lead.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium text-white">{lead.name}</p>
                      <p className="text-sm text-gray-400">
                        Interested in: {lead.property}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs font-medium capitalize ${statusColors[lead.status]}`}
                    >
                      {lead.status}
                    </span>
                    <p className="mt-1 text-xs text-gray-500">{lead.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                Upcoming Appointments
              </h2>
              <Link
                href="/dashboard/calendar"
                className="text-sm text-amber-500 hover:text-amber-400"
              >
                View calendar
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-lg bg-white/5 p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-700/20">
                    <Calendar className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{appointment.title}</p>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {appointment.client}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {appointment.property}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <Clock className="h-4 w-4" />
                    {appointment.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Banner */}
        <div className="mt-8 relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-700/20 to-stone-700/20 border border-amber-700/30 p-8">
          <div className="relative z-10">
            <h2 className="mb-2 text-2xl font-bold text-white">
              Your performance is up 12% this month!
            </h2>
            <p className="mb-6 max-w-xl text-gray-300">
              You've closed 3 more deals than last month. Keep up the great work
              and check your detailed analytics to see what's working.
            </p>
            <Link
              href="/dashboard/analytics"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-neutral-900 transition-all hover:bg-gray-100"
            >
              <BarChart3 className="h-5 w-5" />
              View Analytics
            </Link>
          </div>

          {/* Background decoration */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-700/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-10 h-48 w-48 rounded-full bg-stone-700/20 blur-3xl" />
        </div>
      </div>
    </>
  );
}
