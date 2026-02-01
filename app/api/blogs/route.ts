import { NextResponse } from "next/server";
import { saveBlog, getBlogs } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      content,
      meta_description,
      topic,
      primary_keyword,
      tone,
      article_type,
      word_count,
    } = body;

    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Title, slug, and content are required" },
        { status: 400 }
      );
    }

    const blog = await saveBlog({
      user_id: null, // Will be set when we add authentication
      title,
      slug,
      content,
      meta_description: meta_description || null,
      topic: topic || null,
      primary_keyword: primary_keyword || null,
      tone: tone || null,
      article_type: article_type || null,
      word_count: word_count || null,
    });

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error("Error saving blog:", error);
    return NextResponse.json(
      { error: "Failed to save blog. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const blogs = await getBlogs();
    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs." },
      { status: 500 }
    );
  }
}
