import { NextResponse } from "next/server";

export async function GET() {
  try {
    // ========================================
    // GEMINI API KEY
    // ========================================

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          message: "GEMINI_API_KEY not found",
        },
        { status: 500 }
      );
    }

    // ========================================
    // GEMINI CONNECTION TEST
    // ========================================

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },

        body: JSON.stringify({
          contents: [
            {
              role: "user",

              parts: [
                {
                  text: "Reply with exactly: RC Tours Gemini Connected",
                },
              ],
            },
          ],

          generationConfig: {
            maxOutputTokens: 50,
          },
        }),
      }
    );

    // ========================================
    // READ GEMINI RESPONSE
    // ========================================

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);

      return NextResponse.json(
        {
          success: false,

          message: "Gemini API connection failed",

          error:
            data?.error?.message ||
            "Unknown Gemini API error",

          status: response.status,
        },
        {
          status: response.status,
        }
      );
    }

    // ========================================
    // GET TEXT FROM GEMINI
    // ========================================

    const reply =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("")
        .trim() || "";

    if (!reply) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Gemini connected but returned no text.",
        },
        { status: 500 }
      );
    }

    // ========================================
    // SUCCESS
    // ========================================

    return NextResponse.json({
      success: true,

      model: "gemini-flash-latest",

      reply,
    });
  } catch (error) {
    console.error("Gemini Test Error:", error);

    return NextResponse.json(
      {
        success: false,

        message: "Gemini test failed",

        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}