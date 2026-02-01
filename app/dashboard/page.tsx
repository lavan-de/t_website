"use client";

import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard";
import {
  Sparkles,
  FileText,
  TrendingUp,
  Clock,
  ArrowRight,
  BarChart3,
  Target,
  Zap,
} from "lucide-react";

const stats = [
  {
    title: "Total Articles",
    value: "0",
    change: "Start creating",
    icon: FileText,
    color: "purple",
  },
  {
    title: "Avg. SEO Score",
    value: "--",
    change: "No data yet",
    icon: Target,
    color: "green",
  },
  {
    title: "Words Generated",
    value: "0",
    change: "Start writing",
    icon: BarChart3,
    color: "blue",
  },
  {
    title: "Time Saved",
    value: "0h",
    change: "Track your progress",
    icon: Clock,
    color: "pink",
  },
];

const quickActions = [
  {
    title: "Generate Blog Post",
    description: "Create SEO-optimized content with AI",
    icon: Sparkles,
    href: "/dashboard/blog-generator",
    color: "purple",
    active: true,
  },
  {
    title: "View Analytics",
    description: "Track your content performance",
    icon: TrendingUp,
    href: "#",
    color: "green",
    active: false,
  },
  {
    title: "Bulk Generate",
    description: "Create multiple articles at once",
    icon: Zap,
    href: "#",
    color: "blue",
    active: false,
  },
];

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your content."
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
                    className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${stat.color}-500/20`}
                  >
                    <Icon className={`h-5 w-5 text-${stat.color}-400`} />
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
                      ? "hover:border-purple-500/50 hover:bg-white/10"
                      : "cursor-not-allowed opacity-60"
                  }`}
                  onClick={(e) => !action.active && e.preventDefault()}
                >
                  {/* Gradient overlay on hover */}
                  {action.active && (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  )}

                  <div className="relative">
                    <div
                      className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-${action.color}-500/20`}
                    >
                      <Icon className={`h-6 w-6 text-${action.color}-400`} />
                    </div>
                    <h3 className="mb-1 text-lg font-semibold text-white">
                      {action.title}
                    </h3>
                    <p className="mb-4 text-sm text-gray-400">
                      {action.description}
                    </p>
                    <div className="flex items-center text-sm font-medium text-purple-400">
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

        {/* Getting Started Banner */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 p-8">
          <div className="relative z-10">
            <h2 className="mb-2 text-2xl font-bold text-white">
              Ready to create your first blog post?
            </h2>
            <p className="mb-6 max-w-xl text-gray-300">
              Our AI-powered blog generator creates SEO-optimized, human-quality content
              in minutes. Start with a topic and let the magic happen.
            </p>
            <Link
              href="/dashboard/blog-generator"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:bg-gray-100"
            >
              <Sparkles className="h-5 w-5" />
              Open Blog Generator
            </Link>
          </div>

          {/* Background decoration */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-10 h-48 w-48 rounded-full bg-pink-500/20 blur-3xl" />
        </div>

        {/* Recent Activity (Empty State) */}
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-white">Recent Activity</h2>
          <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
            <FileText className="mx-auto mb-4 h-12 w-12 text-gray-600" />
            <p className="text-gray-400">No content generated yet</p>
            <p className="mt-1 text-sm text-gray-500">
              Your generated articles will appear here
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
