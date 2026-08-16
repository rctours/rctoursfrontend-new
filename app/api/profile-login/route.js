import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();

    // ==================================================
    // INPUT
    // ==================================================

    const inputMobile = (body.mobile || "").replace(/\D/g, "");
    const mobile = inputMobile.slice(-10);

    const email = (body.email || "").trim().toLowerCase();

    if (!mobile || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile Number and Email are required.",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("rctours");

    // ==================================================
    // FIND BOOKINGS USING MOBILE NUMBER ONLY
    // ==================================================
    //
    // IMPORTANT:
    //
    // Customer profile verification MOBILE NUMBER se hoga.
    //
    // Email booking ke existing email se match karna
    // required nahi hai.
    //
    // Customer jo email profile login par enter karega,
    // us email ko marketing/contact ke liye collect karenge.
    //
    // ==================================================

    const allBookings = await db
      .collection("bookings")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const bookings = allBookings.filter((booking) => {
      const bookingMobile = (booking.mobile || "")
        .replace(/\D/g, "")
        .slice(-10);

      return bookingMobile === mobile;
    });

    // ==================================================
    // NO BOOKING FOUND FOR MOBILE
    // ==================================================

    if (bookings.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found.",
        },
        { status: 404 }
      );
    }

    // ==================================================
    // CUSTOMER DATA
    // ==================================================

    let customer = await db
      .collection("customers")
      .findOne({ mobile });

    // ==================================================
    // SAVE / UPDATE CUSTOMER EMAIL
    // ==================================================
    //
    // Profile verification mobile se already ho chuka hai.
    //
    // Entered email ko customer record me save/update
    // kar rahe hain taaki future marketing/contact ke
    // liye use kiya ja sake.
    //
    // ==================================================

    if (customer) {
      await db.collection("customers").updateOne(
        { mobile },
        {
          $set: {
            email,
            updatedAt: new Date(),
          },
        }
      );

      customer = {
        ...customer,
        email,
      };
    } else {
      const newCustomer = {
        mobile,
        email,

        name: bookings[0]?.name || "",

        loyaltyPoints: 0,

        totalBookings: bookings.length,

        totalSpent: bookings.reduce(
          (sum, booking) =>
            sum + Number(booking.totalFare || 0),
          0
        ),

        membership: "Bronze",

        couponCode: "",
        couponDiscount: 0,
        couponUsed: false,

        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await db
        .collection("customers")
        .insertOne(newCustomer);

      customer = newCustomer;
    }

    // ==================================================
    // SUCCESS RESPONSE
    // ==================================================

    return NextResponse.json({
      success: true,

      bookings,

      email,

      loyalty: {
        points: customer.loyaltyPoints || 0,

        totalBookings:
          customer.totalBookings || bookings.length,

        totalSpent:
          customer.totalSpent || 0,

        membership:
          customer.membership || "Bronze",

        couponCode:
          customer.couponCode || "",

        couponDiscount:
          customer.couponDiscount || 0,

        couponUsed:
          customer.couponUsed || false,
      },
    });
  } catch (error) {
    console.error("PROFILE LOGIN ERROR :", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}