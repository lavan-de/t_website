import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface Blog {
  id: string;
  user_id: string | null;
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

// Helper functions
export async function saveBlog(blog: Omit<Blog, "id" | "created_at">) {
  const { data, error } = await supabase
    .from("blogs")
    .insert([blog])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getBlogs(userId?: string) {
  let query = supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  if (userId) {
    query = query.eq("user_id", userId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as Blog[];
}

export async function getBlogById(id: string) {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Blog;
}

export async function deleteBlog(id: string) {
  const { error } = await supabase.from("blogs").delete().eq("id", id);

  if (error) throw error;
}
