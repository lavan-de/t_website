"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How does the AI generate blog content?",
    answer:
      "Our AI analyzes your brand voice, target keywords, and content goals to generate unique, SEO-optimized blog posts. It uses advanced language models trained on high-quality content to ensure readability and engagement.",
  },
  {
    question: "Can I edit the generated content?",
    answer:
      "Absolutely! All generated content is fully editable. You can refine, expand, or modify any part of the blog post before publishing. We encourage reviewing and adding your personal touch.",
  },
  {
    question: "What CMS platforms do you integrate with?",
    answer:
      "We integrate with all major CMS platforms including WordPress, Webflow, Ghost, Contentful, Sanity, and more. You can also export content in various formats or use our API for custom integrations.",
  },
  {
    question: "Is the content unique and plagiarism-free?",
    answer:
      "Yes, every piece of content is generated uniquely for you. Our AI creates original content and we run plagiarism checks to ensure your blog posts are 100% unique.",
  },
  {
    question: "How does the SEO optimization work?",
    answer:
      "Our AI automatically optimizes content for your target keywords, generates meta descriptions, suggests internal links, and structures content with proper headings. It follows the latest SEO best practices.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time with no questions asked. Your access will continue until the end of your billing period.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-32 bg-white/[0.02]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about AIBlogPro
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="font-medium text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <p className="px-6 pb-5 text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
