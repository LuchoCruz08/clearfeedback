/* eslint-disable @typescript-eslint/no-unused-vars */
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get the ID from the URL
    const id = request.url.split('/').pop();
    if (!id) {
      return NextResponse.json(
        { error: "Widget ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    // Fetch widget configuration from the database
    const { data: widget, error } = await supabase
      .from("widget")
      .select("*")
      .eq("business_id", id)
      .maybeSingle();

    // If no widget exists, return default configuration
    if (!widget) {
      return NextResponse.json({
        business_id: id,
        position: "bottom-right",
        theme: "light",
        custom_css: "",
        feedback_type: "combined",
        questions: [],
        show_emoji: true,
        show_rating: true,
        rating_scale: 5,
        button_text: "Give Feedback",
        title_text: "Share Your Feedback",
      });
    }

    return NextResponse.json(widget);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch widget configuration" },
      { status: 500 }
    );
  }
} 