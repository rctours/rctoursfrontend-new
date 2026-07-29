export function forgotPasswordTemplate({
  name,
  resetLink,
}) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Reset Password</title>
</head>

<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:#ffffff;margin:40px auto;border-radius:10px;overflow:hidden;">

<tr>
<td
style="background:#0B5ED7;color:white;padding:25px;text-align:center;font-size:28px;font-weight:bold;">
RC Tours & Travels
</td>
</tr>

<tr>
<td style="padding:40px;">

<h2>Hello ${name},</h2>

<p style="font-size:16px;line-height:28px;">
We received a request to reset your admin account password.
</p>

<p style="font-size:16px;line-height:28px;">
Click the button below to create a new password.
</p>

<p style="text-align:center;margin:40px 0;">

<a
href="${resetLink}"
style="
background:#0B5ED7;
color:white;
padding:15px 35px;
text-decoration:none;
border-radius:6px;
display:inline-block;
font-size:18px;
font-weight:bold;
">
Reset Password
</a>

</p>

<p style="font-size:15px;color:#666;">
This link will expire in <b>15 minutes</b>.
</p>

<p style="font-size:15px;color:#666;">
If you didn't request this password reset, you can safely ignore this email.
</p>

<hr>

<p style="font-size:14px;color:#999;">
RC Tours & Travels Admin Security System
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
}