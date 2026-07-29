import clientPromise from "@/lib/mongodb";

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
    console.error("Create Notification Error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
}