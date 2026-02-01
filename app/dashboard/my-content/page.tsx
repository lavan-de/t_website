"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard";
import { Button } from "@/components/ui";
import {
  FileText,
  Calendar,
  Hash,
  Trash2,
  Eye,
  Copy,
  ExternalLink,
  Loader2,
  Plus,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_description: string | null;
  topic: string | null;
  primary_keyword: string | null;
  tone: string | null;
  article_type: string | null;
  word_count: number | null;
  created_at: string;
}

export default function MyContentPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch blogs");
      }
      
      setBlogs(data.blogs || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    
    setIsDeleting(id);
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }
      
      setBlogs(blogs.filter(blog => blog.id !== id));
      if (selectedBlog?.id === id) {
        setSelectedBlog(null);
      }
    } catch (err) {
      alert("Failed to delete blog");
    } finally {
      setIsDeleting(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <>
        <DashboardHeader
          title="My Content"
          description="View and manage your generated blog posts"
        />
        <div className="flex items-center justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <DashboardHeader
          title="My Content"
          description="View and manage your generated blog posts"
        />
        <div className="p-6">
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div>
                <p className="font-medium text-red-400">Error Loading Content</p>
                <p className="text-sm text-gray-400">{error}</p>
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
        title="My Content"
        description="View and manage your generated blog posts"
      />
      
      <div className="p-6">
        {blogs.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
            <FileText className="mx-auto mb-4 h-12 w-12 text-gray-500" />
            <h3 className="mb-2 text-lg font-semibold text-white">No content yet</h3>
            <p className="mb-6 text-sm text-gray-400">
              Generate your first blog post and save it to see it here.
            </p>
            <Link href="/dashboard/blog-generator">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Generate Blog Post
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Blog List */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">{blogs.length} Saved Posts</h3>
                <Link href="/dashboard/blog-generator">
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    New
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                {blogs.map((blog) => (
                  <button
                    key={blog.id}
                    onClick={() => setSelectedBlog(blog)}
                    className={cn(
                      "w-full rounded-lg border p-4 text-left transition-all",
                      selectedBlog?.id === blog.id
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-white/10 bg-white/5 hover:border-purple-500/50"
                    )}
                  >
                    <h4 className="mb-1 font-medium text-white line-clamp-2">
                      {blog.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(blog.created_at)}
                      </span>
                      {blog.word_count && (
                        <span className="flex items-center gap-1">
                          <Hash className="h-3 w-3" />
                          {blog.word_count} words
                        </span>
                      )}
                    </div>
                    {blog.primary_keyword && (
                      <span className="mt-2 inline-block rounded-full bg-purple-500/20 px-2 py-0.5 text-xs text-purple-400">
                        {blog.primary_keyword}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Preview */}
            <div className="lg:col-span-2">
              {selectedBlog ? (
                <div className="space-y-4">
                  {/* Blog Header */}
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-white">
                          {selectedBlog.title}
                        </h2>
                        <p className="mt-1 text-sm text-gray-400">
                          /{selectedBlog.slug}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => copyToClipboard(selectedBlog.content)}
                        >
                          <Copy className="h-4 w-4" />
                          Copy
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 text-red-400 hover:bg-red-500/10 hover:text-red-400"
                          onClick={() => handleDelete(selectedBlog.id)}
                          disabled={isDeleting === selectedBlog.id}
                        >
                          {isDeleting === selectedBlog.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    {/* Metadata */}
                    <div className="grid grid-cols-2 gap-4 rounded-lg bg-white/5 p-4 text-sm">
                      <div>
                        <span className="text-gray-400">Topic:</span>
                        <p className="text-white">{selectedBlog.topic || "—"}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Keyword:</span>
                        <p className="text-purple-400">{selectedBlog.primary_keyword || "—"}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Tone:</span>
                        <p className="text-white">{selectedBlog.tone || "—"}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Type:</span>
                        <p className="text-white">{selectedBlog.article_type || "—"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <h3 className="mb-4 font-semibold text-white">Content Preview</h3>
                    <div className="prose prose-invert max-w-none rounded-lg border border-white/10 bg-slate-800/50 p-6 max-h-[500px] overflow-y-auto">
                      <div 
                        className="whitespace-pre-wrap text-gray-300 text-sm"
                        dangerouslySetInnerHTML={{ 
                          __html: selectedBlog.content
                            .replace(/^## (.+)$/gm, '<h2 class="text-lg font-semibold text-white mt-4 mb-2">$1</h2>')
                            .replace(/^### (.+)$/gm, '<h3 class="text-base font-medium text-white mt-3 mb-1">$1</h3>')
                            .replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold text-white mb-3">$1</h1>')
                            .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
                            .replace(/\*(.+?)\*/g, '<em>$1</em>')
                            .replace(/^- (.+)$/gm, '<li class="ml-4">• $1</li>')
                            .replace(/^\d+\. (.+)$/gm, '<li class="ml-4">$1</li>')
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center rounded-xl border border-white/10 bg-white/5 p-12">
                  <div className="text-center">
                    <Eye className="mx-auto mb-4 h-12 w-12 text-gray-500" />
                    <p className="text-gray-400">Select a blog post to preview</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
