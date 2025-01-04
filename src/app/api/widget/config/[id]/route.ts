/* eslint-disable @typescript-eslint/no-unused-vars */
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get the ID from the URL
    const id = request.url.split('/').pop();
    if (!id) {
      return new NextResponse(
        JSON.stringify({ error: "Widget ID is required" }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        }
      );
    }

    const supabase = await createClient();
    
    const { data: widget, error } = await supabase
      .from("widget")
      .select("*")
      .eq("business_id", id)
      .maybeSingle();

    // If no widget exists, return default configuration
    if (!widget) {
      return new NextResponse(
        JSON.stringify({
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
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        }
      );
    }

    return new NextResponse(JSON.stringify(widget), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch widget configuration" }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 