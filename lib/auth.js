import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function verifyAdmin() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("admin-auth")?.value;

    if (!token) {
      return null;
    }

    const decoded = await verifyToken(token);

    if (!decoded) {
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("VERIFY ADMIN ERROR:", error);
    return null;
  }
}