import { Button } from "@/components/ui";
import { Award, Users, Home, TrendingUp } from "lucide-react";

const stats = [
  { icon: Home, value: "500+", label: "Properties Sold" },
  { icon: Users, value: "1,200+", label: "Happy Clients" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: TrendingUp, value: "$2.5B+", label: "Total Sales Volume" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Your Trusted Real Estate Partner
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              With over 15 years of experience in luxury real estate, we've built a reputation 
              for excellence, integrity, and results. Our team of expert agents is dedicated to 
              making your property dreams a reality.
            </p>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Whether you're buying your first home, investing in property, or selling a luxury 
              estate, we provide personalized service and expert guidance every step of the way.
            </p>
            <Button size="lg">Learn More About Us</Button>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 text-center"
                >
                  <Icon className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
