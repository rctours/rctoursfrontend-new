import { NextResponse } from "next/server";
import { getRoadDistance } from "@/lib/rcDistance";

// ======================================================
// RC TOURS & TRAVELS
// ROAD DISTANCE HELPER TEST API
// ======================================================
//
// TEMPORARY TEST ROUTE
//
// Example:
// /api/distance-test?pickup=Nagpur&drop=Tuljapur
//
// ======================================================

export async function GET(request) {
  try {
    // ==================================================
    // READ URL PARAMETERS
    // ==================================================

    const { searchParams } =
      new URL(request.url);

    const pickup =
      searchParams.get("pickup");

    const drop =
      searchParams.get("drop");

    // ==================================================
    // VALIDATE
    // ==================================================

    if (!pickup || !drop) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Pickup and drop are required.",

          example:
            "/api/distance-test?pickup=Nagpur&drop=Tuljapur",
        },
        {
          status: 400,
        }
      );
    }

    // ==================================================
    // CALL RC DISTANCE HELPER
    // ==================================================

    const result =
      await getRoadDistance({
        pickup,
        drop,
      });

    // ==================================================
    // DISTANCE FAILED
    // ==================================================

    if (!result.success) {
      return NextResponse.json(
        result,
        {
          status: 400,
        }
      );
    }

    // ==================================================
    // SUCCESS
    // ==================================================

    return NextResponse.json({
      success: true,

      verified:
        result.verified,

      pickup:
        result.pickup,

      drop:
        result.drop,

      distanceKm:
        result.distanceKm,

      pickupCoordinates:
        result.pickupCoordinates,

      dropCoordinates:
        result.dropCoordinates,

      source:
        result.source,

      note:
        result.note,
    });
  } catch (error) {
    console.error(
      "RC Distance Test Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        verified: false,

        message:
          "Distance test failed.",

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