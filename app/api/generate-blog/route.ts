import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      topic,
      primaryKeyword,
      secondaryKeywords,
      audience,
      tone,
      articleType,
      wordCount,
      includeFaq,
      includeToc,
    } = body;

    // Validate required fields
    if (!topic || !primaryKeyword) {
      return NextResponse.json(
        { error: "Topic and primary keyword are required" },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    // Build the prompt
    const prompt = buildPrompt({
      topic,
      primaryKeyword,
      secondaryKeywords,
      audience,
      tone,
      articleType,
      wordCount,
      includeFaq,
      includeToc,
    });

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedContent = response.text();

    // Generate metadata
    const metadata = {
      title: generateTitle(topic, articleType),
      metaDescription: generateMetaDescription(topic, primaryKeyword, tone),
      slug: generateSlug(primaryKeyword),
      wordCount: countWords(generatedContent),
    };

    return NextResponse.json({
      success: true,
      content: generatedContent,
      metadata,
      settings: {
        topic,
        primaryKeyword,
        secondaryKeywords,
        audience,
        tone,
        articleType,
        wordCount,
        includeFaq,
        includeToc,
      },
    });
  } catch (error) {
    console.error("Error generating blog:", error);
    return NextResponse.json(
      { error: "Failed to generate blog content. Please try again." },
      { status: 500 }
    );
  }
}

function buildPrompt(params: {
  topic: string;
  primaryKeyword: string;
  secondaryKeywords: string;
  audience: string;
  tone: string;
  articleType: string;
  wordCount: string;
  includeFaq: boolean;
  includeToc: boolean;
}): string {
  const audienceMap: Record<string, string> = {
    beginner: "beginners who are new to the topic",
    intermediate: "readers with some existing knowledge",
    expert: "advanced professionals in the field",
    general: "a general audience with mixed experience levels",
  };

  const toneInstructions: Record<string, string> = {
    Professional: "Use a professional, authoritative tone. Be clear and precise.",
    Conversational: "Write in a friendly, conversational tone. Use 'you' and 'I' naturally.",
    Academic: "Use a formal, academic tone with well-structured arguments.",
    Casual: "Write in a relaxed, casual tone as if talking to a friend.",
  };

  const articleTypeInstructions: Record<string, string> = {
    "How-to Guide": "Structure this as a step-by-step guide with numbered steps.",
    "Listicle": "Structure this as a numbered list of key points or tips.",
    "Comparison": "Compare different options, highlighting pros and cons of each.",
    "Opinion": "Share a clear opinion with supporting arguments and evidence.",
    "Review": "Provide an in-depth review with ratings and recommendations.",
    "Case Study": "Present this as a case study with real-world examples and outcomes.",
  };

  return `You are an expert content writer specializing in SEO-optimized blog posts. Write a blog post with the following requirements:

**TOPIC:** ${params.topic}

**PRIMARY KEYWORD:** ${params.primaryKeyword}
(Use this keyword naturally 3-5 times throughout the article, including in the first paragraph)

${params.secondaryKeywords ? `**SECONDARY KEYWORDS:** ${params.secondaryKeywords}\n(Incorporate these naturally where relevant)` : ""}

**TARGET AUDIENCE:** ${audienceMap[params.audience] || audienceMap.general}

**TONE:** ${toneInstructions[params.tone] || toneInstructions.Professional}

**ARTICLE TYPE:** ${articleTypeInstructions[params.articleType] || articleTypeInstructions["How-to Guide"]}

**LENGTH:** Approximately ${params.wordCount} words

**STRUCTURE REQUIREMENTS:**
${params.includeToc ? "- Start with a Table of Contents listing all main sections" : ""}
- Use clear H2 and H3 headings to organize content
- Include an engaging introduction that hooks the reader
- Provide valuable, actionable information
- End with a strong conclusion
${params.includeFaq ? "- Include a FAQ section with 3-4 relevant questions and answers at the end" : ""}

**IMPORTANT GUIDELINES:**
1. Write as if you are a human expert with first-hand experience
2. Include specific examples, numbers, and details where possible
3. Avoid generic AI-sounding phrases like "In today's fast-paced world" or "Let's dive in"
4. Use personal anecdotes or "I" statements occasionally for authenticity
5. Make the content genuinely helpful and unique
6. Format with markdown (## for H2, ### for H3, **bold**, *italic*, bullet points, etc.)

Write the blog post now:`;
}

function generateTitle(topic: string, articleType: string): string {
  const prefixes: Record<string, string> = {
    "How-to Guide": "How to",
    "Listicle": "Top 10",
    "Comparison": "Complete Guide:",
    "Opinion": "Why",
    "Review": "Honest Review:",
    "Case Study": "Case Study:",
  };
  
  const prefix = prefixes[articleType] || "";
  if (prefix && !topic.toLowerCase().startsWith(prefix.toLowerCase())) {
    return `${prefix} ${topic}`;
  }
  return topic;
}

function generateMetaDescription(topic: string, keyword: string, tone: string): string {
  const toneWord = tone === "Casual" ? "friendly" : tone === "Academic" ? "comprehensive" : "expert";
  return `Discover ${topic.toLowerCase()} in this ${toneWord} guide. Learn everything about ${keyword} with practical tips and actionable advice. Read now!`.slice(0, 160);
}

function generateSlug(keyword: string): string {
  return keyword
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(word => word.length > 0).length;
}
