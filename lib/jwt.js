import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

// ==========================================
// Generate JWT
// ==========================================
export async function generateToken(admin) {
  return await new SignJWT({
    id: admin._id.toString(),
    username: admin.username,
    role: admin.role,
    name: admin.name,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);
}

// ==========================================
// Verify JWT
// ==========================================
export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret);

    return payload;
  } catch (error) {
    return null;
  }
}