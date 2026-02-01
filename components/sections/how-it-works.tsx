const steps = [
  {
    step: "1",
    title: "Define Your Brand",
    description:
      "Tell us about your website, target audience, and content goals. Our AI learns your unique voice.",
  },
  {
    step: "2",
    title: "Generate Content",
    description:
      "Enter a topic or let AI suggest trending topics. Review, edit, and customize the generated content.",
  },
  {
    step: "3",
    title: "Publish & Grow",
    description:
      "Publish directly to your CMS or export. Watch your SEO rankings and traffic improve.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-white/[0.02]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Three simple steps to transform your content strategy
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((item, index) => (
            <div key={index} className="text-center relative">
              {/* Connector Line (hidden on mobile, hidden for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-purple-500/50 to-transparent" />
              )}

              {/* Step Number */}
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6 shadow-lg shadow-purple-500/30">
                {item.step}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
