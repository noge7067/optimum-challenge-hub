// client/app/api/redirect/[...supabase]/route.js
import { NextResponse } from "next/server";
export async function GET(request) {
    const url = new URL(request.url);
      const params = url.search; // keeps ?access_token=...
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/profile-setup/form${params}`);
        }