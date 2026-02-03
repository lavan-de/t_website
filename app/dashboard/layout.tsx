import { Sidebar } from "@/components/dashboard";
import { AuthProvider } from "@/components/dashboard/auth-provider";
import { getUser } from "@/lib/supabase-server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch the current user (server-side)
  // Middleware already ensures user is authenticated, but we need the email
  const user = await getUser();

  return (
    <AuthProvider userEmail={user?.email || null}>
      <div className="min-h-screen bg-neutral-950">
        <Sidebar />
        <main className="pl-64">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
