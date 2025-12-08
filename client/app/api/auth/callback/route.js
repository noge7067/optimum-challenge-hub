import { NextResponse } from "next/server";

export async function GET(request) {
  // After any provider authenticates → redirect to profile-setup
    return NextResponse.redirect(
        "https://silver-broccoli-97rqrppw4g6q2xq6j.github.dev/profile-setup"
          );
          }