import clientPromise from "@/lib/mongodb";

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

    await db.collection("notifications").insertOne({
      audience: "admin",

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
    console.error("Create Admin Notification Error:", error);

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
    console.error("Create Customer Notification Error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
}