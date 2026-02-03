import { Suspense } from "react";
import { LoginForm } from "./login-form";
import { Loader2 } from "lucide-react";
import Link from "next/link";

// Loading fallback for the login form
function LoginFormFallback() {
  return (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-bold text-white">
              AI<span className="text-purple-400">Blog</span>Pro
            </h1>
          </Link>
          <p className="mt-2 text-gray-400">Sign in to access your dashboard</p>
        </div>

        {/* Login Card - wrapped in Suspense because LoginForm uses useSearchParams */}
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
            ← Back to homepage
          </Link>
        </p>
      </div>
    </div>
  );
}
