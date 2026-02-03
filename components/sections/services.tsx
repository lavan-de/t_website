import { Card, CardIcon, CardTitle, CardDescription } from "@/components/ui";
import { Home, Key, TrendingUp, Users, FileText, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Property Sales",
    description: "Expert guidance through every step of buying or selling your property.",
  },
  {
    icon: Key,
    title: "Property Management",
    description: "Comprehensive management services for rental properties and investments.",
  },
  {
    icon: TrendingUp,
    title: "Market Analysis",
    description: "In-depth market insights to help you make informed decisions.",
  },
  {
    icon: Users,
    title: "Client Services",
    description: "Personalized service tailored to your unique needs and preferences.",
  },
  {
    icon: FileText,
    title: "Legal Support",
    description: "Navigate contracts and paperwork with confidence and ease.",
  },
  {
    icon: BarChart3,
    title: "Investment Consulting",
    description: "Strategic advice for real estate investment opportunities.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-32 bg-white/[0.02]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Services
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive real estate solutions designed for your success
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="group">
                <CardIcon>
                  <Icon className="h-8 w-8 text-amber-600" />
                </CardIcon>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
