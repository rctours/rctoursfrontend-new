import clientPromise from "@/lib/mongodb";

// ===============================================
// NORMALIZE MOBILE NUMBER
// ===============================================
function normalizeMobile(mobile) {
  let value = String(mobile || "").replace(/\D/g, "");

  if (value.length === 10) {
    value = "91" + value;
  }

  return value;
}

// ===============================================
// CREATE CUSTOMER NOTIFICATION
// ===============================================
export async function createCustomerNotification({
  mobile,
  title,
  message,
  type = "info",
  link = "/profile-login",
}) {
  try {
    const normalizedMobile = normalizeMobile(mobile);

    // Mobile, title aur message required
    if (!normalizedMobile || !title || !message) {
      console.error(
        "Customer notification missing required data."
      );

      return {
        success: false,
        message: "Mobile, title and message are required.",
      };
    }

    const client = await clientPromise;
    const db = client.db("rctours");

    const notification = {
      mobile: normalizedMobile,

      title,

      message,

      type,

      // Customer notification click karne par
      // Customer Portal/Login page open hoga
      link,

      isRead: false,

      createdAt: new Date(),
    };

    const result = await db
      .collection("customerNotifications")
      .insertOne(notification);

    return {
      success: true,
      notificationId: result.insertedId,
    };

  } catch (error) {
    console.error(
      "CREATE CUSTOMER NOTIFICATION ERROR:",
      error
    );

    return {
      success: false,
      error: error.message,
    };
  }
}