/* eslint-disable @typescript-eslint/no-unused-vars */
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await req.json();
    const { projectId, name, email, feedback } = body;

    const { error } = await supabase.from("feedback").insert([
      {
        business_id: projectId,
        user_name: name,
        user_email: email,
        feedback_text: feedback,
        submitted_at: new Date().toISOString(),
      },
    ]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 }
    );
  }
} 