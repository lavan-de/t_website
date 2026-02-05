"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard";
import { useAuth } from "@/components/dashboard/auth-provider";
import { Button } from "@/components/ui";
import { Mail, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function TestEmailPage() {
  const { userEmail } = useAuth();
  const [to, setTo] = useState(userEmail || "");
  const [subject, setSubject] = useState("Test Email from SOEZ Estates");
  const [message, setMessage] = useState("This is a test email sent from the dashboard!");
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setResult(null);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          subject,
          html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #9333ea;">SOEZ Estates</h1>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              ${message.replace(/\n/g, "<br>")}
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 12px; color: #666;">
              This email was sent from the SOEZ Estates dashboard.
            </p>
          </div>`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      setResult({
        success: true,
        message: `Email sent successfully! Message ID: ${data.messageId}`,
      });

      // Clear form after successful send
      setSubject("Test Email from SOEZ Estates");
      setMessage("This is a test email sent from the dashboard!");
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : "Failed to send email",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <DashboardHeader
        title="Test Email"
        description="Send a test email to verify your email server setup"
        userEmail={userEmail || undefined}
      />

      <div className="p-6">
        <div className="mx-auto max-w-2xl">
          {/* Info Card */}
          <div className="mb-6 rounded-xl border border-blue-500/30 bg-blue-500/10 p-6">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="mb-1 font-semibold text-white">Email Server Test</h3>
                <p className="text-sm text-gray-400">
                  Use this page to test your Resend email integration. Emails will be sent from{" "}
                  <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-purple-400">
                    hello@soez-estates.nl
                  </code>
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <form onSubmit={handleSend} className="space-y-6">
              {/* Result Message */}
              {result && (
                <div
                  className={`rounded-lg border p-4 ${
                    result.success
                      ? "border-green-500/30 bg-green-500/10"
                      : "border-red-500/30 bg-red-500/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {result.success ? (
                      <CheckCircle className="h-5 w-5 text-green-400 shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
                    )}
                    <p
                      className={`text-sm ${
                        result.success ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {result.message}
                    </p>
                  </div>
                </div>
              )}

              {/* To Field */}
              <div>
                <label
                  htmlFor="to"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  To (Recipient Email)
                </label>
                <input
                  id="to"
                  type="email"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="recipient@example.com"
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-colors"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Email subject"
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-colors"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message here..."
                  rows={6}
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isSending || !to || !subject || !message}
              >
                {isSending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Test Email
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Instructions */}
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-3 font-semibold text-white">How to Test</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-400">
              <li>Enter your email address in the "To" field</li>
              <li>Customize the subject and message (or use defaults)</li>
              <li>Click "Send Test Email"</li>
              <li>Check your inbox (and spam folder) for the email</li>
              <li>Verify it came from <code className="text-purple-400">hello@soez-estates.nl</code></li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
