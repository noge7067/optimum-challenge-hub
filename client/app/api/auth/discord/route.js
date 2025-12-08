import { NextResponse } from "next/server";

// Read from environment variables
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI; // e.g., https://silver-broccoli-97rqrppw4g6q2xq6j.github.dev/api/auth/discord/callback
const DISCORD_SCOPE = "identify email";

export async function GET() {
  // Build Discord OAuth URL
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(
        DISCORD_REDIRECT_URI
          )}&response_type=code&scope=${encodeURIComponent(DISCORD_SCOPE)}`;

            // Redirect user to Discord login
              return NextResponse.redirect(discordAuthUrl);
              }