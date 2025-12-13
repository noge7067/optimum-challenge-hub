// client/app/api/auth/redirect/[...supabase]/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
const url = new URL(request.url);
const params = url.search;

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

if (!appUrl) {
console.error("❌ NEXT_PUBLIC_APP_URL not set");
return NextResponse.redirect("/profile-setup");
  }

  const redirectTo = `${appUrl}/profile-setup${params}`;

  console.log("✅ Auth redirect →", redirectTo);

  return NextResponse.redirect(redirectTo);
  }