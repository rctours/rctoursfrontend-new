import clientPromise from "@/lib/mongodb";
import webpush from "web-push";

// ==============================================
// VAPID CONFIGURATION
// ==============================================

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// ==============================================
// CREATE ADMIN NOTIFICATION
// ==============================================

export async function createNotification({
  title,
  message,
  type = "info",
  link = "",
}) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // ==========================================
    // 1. SAVE ADMIN NOTIFICATION IN MONGODB
    // ==========================================

    await db.collection("notifications").insertOne({
      audience: "admin",

      title,
      message,
      type,
      link,

      isRead: false,

      createdAt: new Date(),
    });

    // ==========================================
    // 2. FIND ALL ADMIN PUSH SUBSCRIPTIONS
    // ==========================================

    const adminSubscriptions = await db
      .collection("pushSubscriptions")
      .find({
        role: "admin",
      })
      .toArray();

    console.log(
      "ADMIN PUSH SUBSCRIPTIONS FOUND:",
      adminSubscriptions.length
    );

    // ==========================================
    // 3. SEND PUSH NOTIFICATION TO ALL ADMINS
    // ==========================================

    const payload = JSON.stringify({
      title,
      message,
      url: link || "/admin",
    });

    const expiredEndpoints = [];

    let pushSent = 0;

    for (const item of adminSubscriptions) {
      try {
        await webpush.sendNotification(
          item.subscription,
          payload
        );

        pushSent++;

        console.log(
          "ADMIN PUSH NOTIFICATION SENT:",
          item.endpoint
        );
      } catch (pushError) {
        console.error(
          "ADMIN PUSH SEND ERROR:",
          pushError
        );

        // ======================================
        // REMOVE INVALID / EXPIRED DEVICE
        // ======================================

        if (
          pushError.statusCode === 404 ||
          pushError.statusCode === 410
        ) {
          expiredEndpoints.push(
            item.endpoint
          );
        }
      }
    }

    // ==========================================
    // 4. REMOVE EXPIRED SUBSCRIPTIONS
    // ==========================================

    if (expiredEndpoints.length > 0) {
      await db
        .collection("pushSubscriptions")
        .deleteMany({
          endpoint: {
            $in: expiredEndpoints,
          },
        });

      console.log(
        "EXPIRED ADMIN SUBSCRIPTIONS REMOVED:",
        expiredEndpoints.length
      );
    }

    return {
      success: true,
      pushSent,
    };

  } catch (error) {
    console.error(
      "Create Admin Notification Error:",
      error
    );

    return {
      success: false,
      error: error.message,
    };
  }
}

// ==============================================
// CREATE CUSTOMER NOTIFICATION
// ==============================================

export async function createCustomerNotification({
  mobile,
  bookingId = "",
  title,
  message,
  type = "info",
  link = "/my-profile",
}) {
  try {
    if (!mobile || !title || !message) {
      throw new Error(
        "Mobile, title and message are required for customer notification."
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // ==========================================
    // SAVE CUSTOMER NOTIFICATION IN MONGODB
    // ==========================================

    await db.collection("notifications").insertOne({
      audience: "customer",

      mobile: String(mobile),

      bookingId,

      title,
      message,
      type,
      link,

      isRead: false,

      createdAt: new Date(),
    });

    return {
      success: true,
    };

  } catch (error) {
    console.error(
      "Create Customer Notification Error:",
      error
    );

    return {
      success: false,
      error: error.message,
    };
  }
}