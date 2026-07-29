import crypto from "crypto";

/**
 * Generate secure reset password token
 */
export function generateResetToken() {
  // Random token (ye email me bheja jayega)
  const token = crypto.randomBytes(32).toString("hex");

  // Database me hash hi save karenge
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // 15 minutes expiry
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  return {
    token,
    hashedToken,
    expiresAt,
  };
}