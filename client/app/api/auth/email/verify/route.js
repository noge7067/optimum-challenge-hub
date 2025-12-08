import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Example DB client
import { setCookie } from "cookies-next";

const OTP_STORE = {}; // In-memory store. For production, move to DB or Redis
const OTP_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function POST(request) {
try {
const { email, otp } = await request.json();

if (!email || !otp) {
return NextResponse.json({ error: "Email and OTP required" }, { status: 400 });
 }

 const stored = OTP_STORE[email];

 if (!stored || stored.code !== otp) {
 return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
   }

   // Check if OTP expired
   if (Date.now() > stored.expiresAt) {
   delete OTP_STORE[email];
   return NextResponse.json({ error: "OTP expired" }, { status: 401 });
       }

       // OTP is valid, remove it
       delete OTP_STORE[email];

       // Upsert user in DB
       const user = await prisma.user.upsert({
       where: { email },
       update: {},
       create: { email },
        });

        // Set secure session cookie
        const response = NextResponse.redirect(user.profileCompleted ? "/arena" : "/profile-setup");
        setCookie("sessionToken", `user-${user.id}`, { req: request, res: response, httpOnly: true });

        console.log(`Premium email login success: ${email}`);

        return response;
         } catch (err) {
         console.error("Email OTP Premium Error:", err);
         return NextResponse.json({ error: "OTP verification failed" }, { status: 500 });
           }
           }

           // Optional: function to generate OTP (use in email/route.js)
           export function generateOTP(email) {
           const code = Math.floor(100000 + Math.random() * 900000).toString();
           OTP_STORE[email] = { code, expiresAt: Date.now() + OTP_EXPIRY };
           return code;
           }