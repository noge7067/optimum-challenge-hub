import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
    const params = url.search; // access_token, refresh_token, etc.

      const redirectTo =
          process.env.NEXT_PUBLIC_APP_URL + "/profile-setup" || "/profile-setup";

            return NextResponse.redirect(redirectTo + params);
            }