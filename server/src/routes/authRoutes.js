// server/src/routes/authRoutes.js
import express from "express";
import prisma from "../../lib/prisma.js"; // server-side prisma
// import anything else needed (node-fetch, nodemailer) and use process.env

const router = express.Router();

// Example: email -> send OTP
router.post("/email/send", async (req, res) => {
const { email } = req.body;
if (!email) return res.status(400).json({ error: "Email required" });

// create OTP (example: 6 digits)
const otp = Math.floor(100000 + Math.random() * 900000).toString();
// TODO: store otp in DB or redis; here simple example with DB
await prisma.otp.create({ data: { email, code: otp, expiresAt: new Date(Date.now() + 5*60*1000) }});

// send mail via nodemailer (config with env)
// ... omitted for brevity
return res.json({ message: "OTP sent" });
});

// Example: verify
router.post("/email/verify", async (req, res) => {
const { email, otp } = req.body;
if (!email || !otp) return res.status(400).json({ error: "email and otp required" });

const record = await prisma.otp.findFirst({ where: { email, code: otp }});
if (!record) return res.status(401).json({ error: "Invalid OTP" });

// Create or update user etc.
const user = await prisma.user.upsert({
where: { email },
update: {},
create: { email, name: null },
  });

  // Clear OTP
  await prisma.otp.delete({ where: { id: record.id } });

  // Return redirect target to client
  return res.json({ message: "OK", redirect: "/profile-setup" });
  });

  // For OAuth callbacks (Discord/Github via provider) — example route:
  router.get("/discord/callback", async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send("No code");

  // Exchange code with Discord and fetch user, then upsert in DB
  // After success, redirect client to the client app's profile setup page:
  const clientUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return res.redirect(`${clientUrl}/profile-setup`);
  });

  export default router;