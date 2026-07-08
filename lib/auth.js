import { cookies } from "next/headers";

export async function verifyAdmin() {
  const cookieStore = await cookies();

  const token = cookieStore.get("admin-auth");

  if (!token) {
    return false;
  }

  return true;
}