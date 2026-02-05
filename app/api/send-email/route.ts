import { Resend } from "resend";
import { NextResponse } from "next/server";

/**
 * API route to send emails using Resend.
 * 
 * Usage:
 * POST /api/send-email
 * Body: {
 *   to: "recipient@example.com",
 *   subject: "Email subject",
 *   html: "<p>Email content</p>",
 *   from?: "custom@soez-estates.nl" // Optional, defaults to hello@soez-estates.nl
 * }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subject, html, from } = body;

    // Validate required fields
    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject, html" },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Resend API key not configured" },
        { status: 500 }
      );
    }

    // Initialize Resend inside the function (not at module level)
    // This prevents build-time errors if env var isn't available
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email
    const { data, error } = await resend.emails.send({
      from: from || "hello@soez-estates.nl", // Default sender
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: data?.id,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
