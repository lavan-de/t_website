import { Card, CardIcon, CardTitle, CardDescription } from "@/components/ui";

const features = [
  {
    icon: "🎯",
    title: "SEO Optimized",
    description:
      "Every blog post is crafted with search engines in mind. Automatic keyword optimization, meta descriptions, and structured data.",
  },
  {
    icon: "🎨",
    title: "Brand Aligned",
    description:
      "Our AI learns your brand voice, tone, and style to maintain consistency across all your content.",
  },
  {
    icon: "⚡",
    title: "Lightning Fast",
    description:
      "Generate high-quality, publish-ready blog posts in minutes, not hours. Scale your content effortlessly.",
  },
  {
    icon: "📚",
    title: "Research Backed",
    description:
      "AI researches topics thoroughly, citing sources and including up-to-date statistics and information.",
  },
  {
    icon: "🌍",
    title: "Multi-Language",
    description:
      "Create content in 50+ languages. Reach global audiences without hiring translators.",
  },
  {
    icon: "📊",
    title: "Analytics Built-In",
    description:
      "Track performance of every post. See what resonates with your audience and optimize accordingly.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose AIBlogPro?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Powerful features designed to supercharge your content strategy
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group">
              <CardIcon>{feature.icon}</CardIcon>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
