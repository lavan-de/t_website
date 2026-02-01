import Link from "next/link";
import { Button, Badge } from "@/components/ui";
import { Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <Badge variant="purple" className="mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Content Creation
          </Badge>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Generate SEO-Optimized{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Blog Content
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Transform your website with AI-generated blog posts that align with
            your brand voice, boost SEO rankings, and engage your audience.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="group">
                Open Dashboard
                <span className="ml-2 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Button>
            </Link>
            <Link href="/dashboard/blog-generator">
              <Button variant="outline" size="lg">
                <Sparkles className="w-4 h-4 mr-2" />
                Try Blog Generator
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-6 md:gap-8 text-gray-400 text-sm">
            <span className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Trusted by 1,000+ websites
            </span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-2">
              <span className="text-yellow-400">★</span> 4.9/5 rating
            </span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-2">
              <span className="text-blue-400">🔒</span> SOC 2 Certified
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
