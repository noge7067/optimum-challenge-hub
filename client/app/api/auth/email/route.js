import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
      auth: {
          user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
                },
                });

                const OTP_STORE = {}; // In-memory store (for production, use DB)

                export async function POST(request) {
                  const { email } = await request.json();
                    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

                      const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
                        OTP_STORE[email] = otp;

                          await transporter.sendMail({
                              from: process.env.SMTP_USER,
                                  to: email,
                                      subject: "Your OTP Code",
                                          text: `Your OTP code is ${otp}. It expires in 5 minutes.`,
                                            });

                                              return NextResponse.json({ message: "OTP sent" });
                                              }