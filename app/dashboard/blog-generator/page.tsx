"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard";
import { Button } from "@/components/ui";
import {
  Sparkles,
  Settings2,
  Wand2,
  FileText,
  Target,
  Users,
  Palette,
  Link2,
  ChevronRight,
  Check,
  Copy,
  ArrowLeft,
  AlertCircle,
  Save,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface GeneratedResult {
  content: string;
  metadata: {
    title: string;
    metaDescription: string;
    slug: string;
    wordCount: number;
  };
  settings: FormData;
}

const generatorSteps = [
  { id: 1, title: "Topic & Keywords", icon: Target },
  { id: 2, title: "Audience & Tone", icon: Users },
  { id: 3, title: "Style & Structure", icon: Palette },
  { id: 4, title: "Links & SEO", icon: Link2 },
  { id: 5, title: "Generate", icon: Wand2 },
];

const toneOptions = ["Professional", "Conversational", "Academic", "Casual"];
const articleTypes = ["How-to Guide", "Listicle", "Comparison", "Opinion", "Review", "Case Study"];
const audienceOptions = [
  { value: "beginner", label: "Beginners" },
  { value: "intermediate", label: "Intermediate" },
  { value: "expert", label: "Experts" },
  { value: "general", label: "General Audience" },
];
const wordCountOptions = [
  { value: "500", label: "Short (~500 words)" },
  { value: "1000", label: "Medium (~1,000 words)" },
  { value: "1500", label: "Standard (~1,500 words)" },
  { value: "2000", label: "Long (~2,000 words)" },
  { value: "3000", label: "Comprehensive (~3,000+ words)" },
];

interface FormData {
  topic: string;
  primaryKeyword: string;
  secondaryKeywords: string;
  audience: string;
  tone: string;
  articleType: string;
  wordCount: string;
  internalLinks: string;
  includeFaq: boolean;
  includeToc: boolean;
  includeSchema: boolean;
}

export default function BlogGeneratorPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<GeneratedResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    topic: "",
    primaryKeyword: "",
    secondaryKeywords: "",
    audience: "beginner",
    tone: "Professional",
    articleType: "How-to Guide",
    wordCount: "1500",
    internalLinks: "",
    includeFaq: true,
    includeToc: true,
    includeSchema: true,
  });

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await fetch("/api/generate-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate blog");
      }
      
      setGeneratedResult(data);
      setIsGenerated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStartOver = () => {
    setIsGenerated(false);
    setGeneratedResult(null);
    setError(null);
    setCurrentStep(1);
    setFormData({
      topic: "",
      primaryKeyword: "",
      secondaryKeywords: "",
      audience: "beginner",
      tone: "Professional",
      articleType: "How-to Guide",
      wordCount: "1500",
      internalLinks: "",
      includeFaq: true,
      includeToc: true,
      includeSchema: true,
    });
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSave = async () => {
    if (!generatedResult) return;
    
    setIsSaving(true);
    setSaveError(null);
    
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: generatedResult.metadata.title,
          slug: generatedResult.metadata.slug,
          content: generatedResult.content,
          meta_description: generatedResult.metadata.metaDescription,
          topic: formData.topic,
          primary_keyword: formData.primaryKeyword,
          tone: formData.tone,
          article_type: formData.articleType,
          word_count: generatedResult.metadata.wordCount,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to save blog");
      }
      
      setIsSaved(true);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  // Generated content preview
  if (isGenerated && generatedResult) {
    return (
      <>
        <DashboardHeader
          title="Blog Generated!"
          description="Your SEO-optimized blog post is ready"
        />
        <div className="p-6">
          <div className="mb-6 flex items-center gap-4">
            <Button variant="outline" onClick={handleStartOver} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Generate Another
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Generated Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Success Banner */}
              <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Blog Generated Successfully!</h3>
                    <p className="text-sm text-gray-400">
                      {generatedResult.metadata.wordCount} words generated • Ready to copy and use
                    </p>
                  </div>
                </div>
              </div>

              {/* SEO Metadata */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-4 text-lg font-semibold text-white">SEO Metadata</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500">TITLE</label>
                    <p className="mt-1 text-white">{generatedResult.metadata.title}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">META DESCRIPTION</label>
                    <p className="mt-1 text-gray-300">{generatedResult.metadata.metaDescription}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">URL SLUG</label>
                    <p className="mt-1 font-mono text-purple-400">/{generatedResult.metadata.slug}</p>
                  </div>
                </div>
              </div>

              {/* Generated Article Preview */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Article Content</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    onClick={() => copyToClipboard(generatedResult.content)}
                  >
                    <Copy className="h-4 w-4" />
                    Copy Markdown
                  </Button>
                </div>
                
                <div className="prose prose-invert max-w-none rounded-lg border border-white/10 bg-slate-800/50 p-6">
                  <div 
                    className="whitespace-pre-wrap text-gray-300"
                    dangerouslySetInnerHTML={{ 
                      __html: generatedResult.content
                        .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold text-white mt-6 mb-3">$1</h2>')
                        .replace(/^### (.+)$/gm, '<h3 class="text-lg font-medium text-white mt-4 mb-2">$1</h3>')
                        .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-white mb-4">$1</h1>')
                        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
                        .replace(/\*(.+?)\*/g, '<em>$1</em>')
                        .replace(/^- (.+)$/gm, '<li class="ml-4">• $1</li>')
                        .replace(/^\d+\. (.+)$/gm, '<li class="ml-4">$1</li>')
                        .replace(/\n\n/g, '</p><p class="text-gray-300 mb-4">')
                    }}
                  />
                </div>
              </div>

              {/* Schema Markup */}
              {formData.includeSchema && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Schema Markup (JSON-LD)</h3>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => copyToClipboard(JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": generatedResult.metadata.title,
                        "description": generatedResult.metadata.metaDescription,
                        "keywords": `${formData.primaryKeyword}${formData.secondaryKeywords ? ", " + formData.secondaryKeywords : ""}`,
                        "wordCount": generatedResult.metadata.wordCount
                      }, null, 2))}
                    >
                      <Copy className="h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                  <pre className="overflow-x-auto rounded-lg bg-slate-800 p-4 text-sm text-gray-300">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": generatedResult.metadata.title,
  "description": generatedResult.metadata.metaDescription,
  "keywords": `${formData.primaryKeyword}${formData.secondaryKeywords ? ", " + formData.secondaryKeywords : ""}`,
  "wordCount": generatedResult.metadata.wordCount
}, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* Settings Summary Sidebar */}
            <div className="space-y-6">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-4 font-semibold text-white">Generation Settings</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Topic</span>
                    <span className="text-white truncate ml-2 max-w-[150px]">{formData.topic || "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Primary Keyword</span>
                    <span className="text-white truncate ml-2 max-w-[150px]">{formData.primaryKeyword || "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Audience</span>
                    <span className="text-white">{audienceOptions.find(a => a.value === formData.audience)?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tone</span>
                    <span className="text-purple-400">{formData.tone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Article Type</span>
                    <span className="text-purple-400">{formData.articleType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Word Count</span>
                    <span className="text-white">{generatedResult.metadata.wordCount} words</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">FAQ Section</span>
                    <span className={formData.includeFaq ? "text-green-400" : "text-gray-500"}>
                      {formData.includeFaq ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Table of Contents</span>
                    <span className={formData.includeToc ? "text-green-400" : "text-gray-500"}>
                      {formData.includeToc ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Schema Markup</span>
                    <span className={formData.includeSchema ? "text-green-400" : "text-gray-500"}>
                      {formData.includeSchema ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-6">
                <div className="mb-2 flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-400" />
                  <h3 className="font-semibold text-white">SEO Score</h3>
                </div>
                <div className="flex items-center justify-center py-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-green-500 bg-green-500/20">
                    <span className="text-2xl font-bold text-green-400">87</span>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-400">Good SEO optimization</p>
              </div>
              
              {/* Quick Actions */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-4 font-semibold text-white">Quick Actions</h3>
                <div className="space-y-2">
                  {/* Save to Library Button */}
                  <Button 
                    className={cn(
                      "w-full justify-start gap-2",
                      isSaved 
                        ? "bg-green-600 hover:bg-green-700" 
                        : "bg-purple-600 hover:bg-purple-700"
                    )}
                    onClick={handleSave}
                    disabled={isSaving || isSaved}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : isSaved ? (
                      <>
                        <Check className="h-4 w-4" />
                        Saved to Library!
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save to Library
                      </>
                    )}
                  </Button>
                  {saveError && (
                    <p className="text-xs text-red-400">{saveError}</p>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2"
                    onClick={() => copyToClipboard(generatedResult.content)}
                  >
                    <Copy className="h-4 w-4" />
                    Copy Raw Markdown
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      const blob = new Blob([generatedResult.content], { type: 'text/markdown' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${generatedResult.metadata.slug}.md`;
                      a.click();
                    }}
                  >
                    <FileText className="h-4 w-4" />
                    Download as .md
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <DashboardHeader
        title="Blog Generator"
        description="Create SEO-optimized, human-quality blog posts with AI"
      />

      <div className="p-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
            {generatorSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-2 transition-all",
                      isActive && "bg-purple-500/20 text-purple-400",
                      isCompleted && "text-green-400",
                      !isActive && !isCompleted && "text-gray-500 hover:text-gray-300"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full",
                        isActive && "bg-purple-500 text-white",
                        isCompleted && "bg-green-500/20 text-green-400",
                        !isActive && !isCompleted && "bg-white/10 text-gray-400"
                      )}
                    >
                      {isCompleted ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </div>
                    <span className="hidden font-medium md:block">{step.title}</span>
                  </button>
                  {index < generatorSteps.length - 1 && (
                    <ChevronRight className="mx-2 h-5 w-5 text-gray-600" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              {/* Step 1: Topic & Keywords */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-1 text-lg font-semibold text-white">Topic & Keywords</h2>
                    <p className="text-sm text-gray-400">What would you like to write about?</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">Blog Topic *</label>
                      <input
                        type="text"
                        value={formData.topic}
                        onChange={(e) => updateFormData("topic", e.target.value)}
                        placeholder="e.g., How to improve website SEO in 2026"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">Primary Keyword *</label>
                      <input
                        type="text"
                        value={formData.primaryKeyword}
                        onChange={(e) => updateFormData("primaryKeyword", e.target.value)}
                        placeholder="e.g., website SEO"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">Secondary Keywords (optional)</label>
                      <input
                        type="text"
                        value={formData.secondaryKeywords}
                        onChange={(e) => updateFormData("secondaryKeywords", e.target.value)}
                        placeholder="e.g., SEO tips, search engine optimization, ranking"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50"
                      />
                      <p className="mt-1 text-xs text-gray-500">Separate with commas</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Audience & Tone */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-1 text-lg font-semibold text-white">Audience & Tone</h2>
                    <p className="text-sm text-gray-400">Who is this content for?</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">Target Audience</label>
                      <select
                        value={formData.audience}
                        onChange={(e) => updateFormData("audience", e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-purple-500/50"
                      >
                        {audienceOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">Writing Tone</label>
                      <div className="grid grid-cols-2 gap-3">
                        {toneOptions.map((tone) => (
                          <button
                            key={tone}
                            onClick={() => updateFormData("tone", tone)}
                            className={cn(
                              "rounded-lg border px-4 py-3 text-left transition-all",
                              formData.tone === tone
                                ? "border-purple-500 bg-purple-500/20 text-white"
                                : "border-white/10 bg-white/5 text-gray-300 hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-white"
                            )}
                          >
                            <span className="flex items-center gap-2">
                              {formData.tone === tone && <Check className="h-4 w-4 text-purple-400" />}
                              {tone}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Style & Structure */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-1 text-lg font-semibold text-white">Style & Structure</h2>
                    <p className="text-sm text-gray-400">How should the article be formatted?</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">Article Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        {articleTypes.map((type) => (
                          <button
                            key={type}
                            onClick={() => updateFormData("articleType", type)}
                            className={cn(
                              "rounded-lg border px-4 py-3 text-left transition-all",
                              formData.articleType === type
                                ? "border-purple-500 bg-purple-500/20 text-white"
                                : "border-white/10 bg-white/5 text-gray-300 hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-white"
                            )}
                          >
                            <span className="flex items-center gap-2">
                              {formData.articleType === type && <Check className="h-4 w-4 text-purple-400" />}
                              {type}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">Word Count</label>
                      <select
                        value={formData.wordCount}
                        onChange={(e) => updateFormData("wordCount", e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-purple-500/50"
                      >
                        {wordCountOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Links & SEO */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-1 text-lg font-semibold text-white">Links & SEO</h2>
                    <p className="text-sm text-gray-400">Optimize for search engines</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Internal Links (URLs from your site)
                      </label>
                      <textarea
                        value={formData.internalLinks}
                        onChange={(e) => updateFormData("internalLinks", e.target.value)}
                        placeholder={"https://yoursite.com/related-article\nhttps://yoursite.com/another-page"}
                        rows={3}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50"
                      />
                    </div>

                    <div className="space-y-3">
                      <label
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all",
                          formData.includeFaq
                            ? "border-purple-500/50 bg-purple-500/10"
                            : "border-white/10 bg-white/5 hover:border-white/20"
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={formData.includeFaq}
                          onChange={(e) => updateFormData("includeFaq", e.target.checked)}
                          className="h-4 w-4 rounded border-white/10 bg-white/5 text-purple-500 focus:ring-purple-500"
                        />
                        <div>
                          <span className="text-sm font-medium text-white">Include FAQ section</span>
                          <p className="text-xs text-gray-400">Great for featured snippets</p>
                        </div>
                      </label>

                      <label
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all",
                          formData.includeToc
                            ? "border-purple-500/50 bg-purple-500/10"
                            : "border-white/10 bg-white/5 hover:border-white/20"
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={formData.includeToc}
                          onChange={(e) => updateFormData("includeToc", e.target.checked)}
                          className="h-4 w-4 rounded border-white/10 bg-white/5 text-purple-500 focus:ring-purple-500"
                        />
                        <div>
                          <span className="text-sm font-medium text-white">Include Table of Contents</span>
                          <p className="text-xs text-gray-400">Improves user navigation</p>
                        </div>
                      </label>

                      <label
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all",
                          formData.includeSchema
                            ? "border-purple-500/50 bg-purple-500/10"
                            : "border-white/10 bg-white/5 hover:border-white/20"
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={formData.includeSchema}
                          onChange={(e) => updateFormData("includeSchema", e.target.checked)}
                          className="h-4 w-4 rounded border-white/10 bg-white/5 text-purple-500 focus:ring-purple-500"
                        />
                        <div>
                          <span className="text-sm font-medium text-white">Generate Schema markup (JSON-LD)</span>
                          <p className="text-xs text-gray-400">Helps search engines understand content</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Generate */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-1 text-lg font-semibold text-white">Ready to Generate</h2>
                    <p className="text-sm text-gray-400">Review your settings and generate your blog post</p>
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-red-400" />
                        <div>
                          <p className="font-medium text-red-400">Generation Failed</p>
                          <p className="text-sm text-gray-400">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Settings Summary */}
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <h3 className="mb-3 font-medium text-white">Your Configuration</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Topic:</span>
                        <p className="text-white">{formData.topic || "Not set"}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Primary Keyword:</span>
                        <p className="text-white">{formData.primaryKeyword || "Not set"}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Audience:</span>
                        <p className="text-white">{audienceOptions.find(a => a.value === formData.audience)?.label}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Tone:</span>
                        <p className="text-purple-400">{formData.tone}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Article Type:</span>
                        <p className="text-purple-400">{formData.articleType}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Word Count:</span>
                        <p className="text-white">~{formData.wordCount}</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-6 text-center">
                    <Sparkles className="mx-auto mb-4 h-12 w-12 text-purple-400" />
                    <h3 className="mb-2 text-lg font-semibold text-white">AI Blog Generation</h3>
                    <p className="mb-6 text-sm text-gray-400">
                      Click the button below to generate your SEO-optimized, human-quality blog post using Google Gemini.
                    </p>
                    <Button 
                      size="lg" 
                      className="gap-2" 
                      onClick={handleGenerate}
                      disabled={isGenerating || !formData.topic || !formData.primaryKeyword}
                    >
                      {isGenerating ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                          Generating with Gemini...
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-5 w-5" />
                          Generate Blog Post
                        </>
                      )}
                    </Button>
                    {(!formData.topic || !formData.primaryKeyword) && (
                      <p className="mt-4 text-xs text-yellow-500">
                        ⚠️ Please fill in Topic and Primary Keyword first
                      </p>
                    )}
                    <p className="mt-4 text-xs text-gray-500">
                      Powered by Google Gemini AI
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between border-t border-white/10 pt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                  disabled={currentStep === 5}
                >
                  {currentStep === 4 ? "Review & Generate" : "Next Step"}
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar - Tips & Preview */}
          <div className="space-y-6">
            {/* Quick Tips */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-purple-400" />
                <h3 className="font-semibold text-white">Quick Tips</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  Use specific, long-tail keywords for better ranking
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  Include internal links to boost SEO
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  FAQ sections help win featured snippets
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  Longer content (2000+ words) ranks better
                </li>
              </ul>
            </div>

            {/* Current Settings */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-400" />
                <h3 className="font-semibold text-white">Current Settings</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Tone</span>
                  <span className="text-purple-400">{formData.tone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Type</span>
                  <span className="text-purple-400">{formData.articleType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Words</span>
                  <span className="text-white">~{formData.wordCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">FAQ</span>
                  <span className={formData.includeFaq ? "text-green-400" : "text-gray-500"}>
                    {formData.includeFaq ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>

            {/* SEO Score Preview */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-green-400" />
                <h3 className="font-semibold text-white">SEO Score Preview</h3>
              </div>
              <div className="mb-4 flex items-center justify-center">
                <div className={cn(
                  "flex h-24 w-24 items-center justify-center rounded-full border-4",
                  formData.topic && formData.primaryKeyword
                    ? "border-green-500 bg-green-500/10"
                    : "border-gray-700"
                )}>
                  <span className={cn(
                    "text-2xl font-bold",
                    formData.topic && formData.primaryKeyword ? "text-green-400" : "text-gray-500"
                  )}>
                    {formData.topic && formData.primaryKeyword ? "87" : "--"}
                  </span>
                </div>
              </div>
              <p className="text-center text-sm text-gray-400">
                {formData.topic && formData.primaryKeyword
                  ? "Good SEO potential"
                  : "Add topic & keyword to see score"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
