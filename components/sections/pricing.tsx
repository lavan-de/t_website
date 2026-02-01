import { Button } from "@/components/ui";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for small blogs and personal websites",
    features: [
      "10 blog posts per month",
      "Basic SEO optimization",
      "1 brand voice profile",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$79",
    period: "/month",
    description: "For growing businesses and content teams",
    features: [
      "50 blog posts per month",
      "Advanced SEO optimization",
      "5 brand voice profiles",
      "Priority support",
      "Analytics dashboard",
      "CMS integrations",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with custom needs",
    features: [
      "Unlimited blog posts",
      "Custom AI training",
      "Unlimited brand profiles",
      "Dedicated account manager",
      "API access",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your content needs. All plans include a
            14-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "rounded-2xl p-8 transition-all duration-300",
                plan.highlighted
                  ? "bg-gradient-to-b from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 scale-105 shadow-xl shadow-purple-500/20"
                  : "bg-white/5 border border-white/10 hover:border-white/20"
              )}
            >
              {/* Plan Badge */}
              {plan.highlighted && (
                <div className="text-center mb-4">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-xl font-semibold text-white mb-2">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-gray-400">{plan.period}</span>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start gap-3 text-gray-300 text-sm"
                  >
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.highlighted ? "primary" : "outline"}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
