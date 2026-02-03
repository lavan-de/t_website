import Link from "next/link";
import { Button, Badge } from "@/components/ui";
import { Home, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-stone-900/30 to-neutral-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(180,83,9,0.15),transparent_50%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <Badge variant="amber" className="mb-6">
            <Home className="w-4 h-4 mr-2" />
            Premium Real Estate Services
          </Badge>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">
              Dream Home
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover luxury properties with expert guidance. We make finding your perfect home effortless.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#properties">
              <Button size="lg" className="group">
                Browse Properties
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg">
                Agent Dashboard
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-6 md:gap-8 text-gray-400 text-sm">
            <span className="flex items-center gap-2">
              <span className="text-green-400">✓</span> 500+ Properties Sold
            </span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-2">
              <span className="text-amber-500">★</span> 4.9/5 Client Rating
            </span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-2">
              <span className="text-amber-600">🏆</span> Award-Winning Service
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
