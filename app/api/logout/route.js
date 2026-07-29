import { NextResponse } from "next/server";

// ===============================================
// POST METHOD: TERMINATE ADMIN SESSION
// ===============================================
export async function POST() {
  try {
    // 1. Construct response indicating session termination
    const response = NextResponse.json(
      {
        success: true,
        message: "Session terminated successfully. Administrative access revoked.",
      },
      { status: 200 }
    );

    // 2. Clear authentication cookie by expiring it immediately
    response.cookies.set({
      name: "admin-auth",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Strictly enforced for session termination
      path: "/",
      expires: new Date(0), // Immediate expiration
    });

    return response;

  } catch (error) {
    console.error("CRITICAL ADMIN LOGOUT DISPATCH FAILED:", error);
    
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error during session termination.",
      },
      { status: 500 }
    );
  }
}