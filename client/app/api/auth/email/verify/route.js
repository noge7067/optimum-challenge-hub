import { NextResponse } from "next/server";

const OTP_STORE = {}; // same as in route.js or use DB

export async function POST(request) {
  const { email, otp } = await request.json();
    if (!email || !otp) {
        return NextResponse.json({ error: "Email and OTP required" }, { status: 400 });
          }

            const storedOtp = OTP_STORE[email];
              if (storedOtp !== otp) {
                  return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
                    }

                      delete OTP_STORE[email]; // invalidate OTP

                        // TODO: Create user session here

                          return NextResponse.json({ message: "Login successful", redirect: "/arena" });
                          }