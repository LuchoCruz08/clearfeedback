/* eslint-disable @typescript-eslint/no-unused-vars */
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for feedback submission
const FeedbackSchema = z.object({
  projectId: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  feedback: z.string().min(1, "Feedback is required"),
  rating: z.number().optional(),
  emoji: z.enum(["happy", "neutral", "sad"]).optional(),
  customAnswers: z.record(z.string(), z.string()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await req.json();
    const validatedData = FeedbackSchema.parse(body);

    const supabase = await createClient();

    // Fetch widget configuration to validate custom questions
    const { data: widget } = await supabase
      .from("widget")
      .select("questions")
      .eq("business_id", validatedData.projectId)
      .single();

    // Prepare metadata with all feedback data
    const metadata = {
      rating: validatedData.rating,
      emoji: validatedData.emoji,
      custom_answers: validatedData.customAnswers,
      user_agent: req.headers.get("user-agent"), 
      ip_address: req.headers.get("x-forwarded-for"),
      submission_time: new Date().toISOString(),
      ...validatedData.metadata,
    };

    // Insert feedback with retry logic
    const maxRetries = 3;
    let retryCount = 0;
    let error = null;

    while (retryCount < maxRetries) {
      const { error: insertError } = await supabase.from("feedback").insert([
        {
          business_id: validatedData.projectId,
          user_name: validatedData.name,
          user_email: validatedData.email,
          feedback_text: validatedData.feedback,
          metadata,
          submitted_at: new Date().toISOString(),
        },
      ]);

      if (!insertError) {
        // Successfully inserted
        return NextResponse.json({ success: true });
      }

      error = insertError;
      retryCount++;
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
    }

    // If we get here, all retries failed
    console.error("Failed to submit feedback after retries:", error);
    return NextResponse.json(
      { error: "Failed to submit feedback after multiple attempts" },
      { status: 500 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      // Validation error
      return NextResponse.json(
        { error: "Invalid feedback data", details: error.errors },
        { status: 400 }
      );
    }

    // Unknown error
    console.error("Error processing feedback:", error);
    return NextResponse.json(
      { error: "Failed to process feedback" },
      { status: 500 }
    );
  }
} 