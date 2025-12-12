import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";  // <-- THIS is correct// Example DB client
import { setCookie } from "cookies-next"; // Optional, for session

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;

export async function GET(request) {
try {
const url = new URL(request.url);
const code = url.searchParams.get("code");

if (!code) {
return NextResponse.json({ error: "No code provided" }, { status: 400 });
 }
 // Exchange code for access token
 const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
 method: "POST",
 headers: { "Content-Type": "application/x-www-form-urlencoded" },
 body: new URLSearchParams({
 client_id: DISCORD_CLIENT_ID,
 client_secret: DISCORD_CLIENT_SECRET,
 grant_type: "authorization_code",
 code,
 redirect_uri: DISCORD_REDIRECT_URI,
       }),
           });
           const tokenData = await tokenResponse.json();
           const accessToken = tokenData.access_token;
           const refreshToken = tokenData.refresh_token;

           if (!accessToken) {
           return NextResponse.json({ error: "Failed to get access token" }, { status: 400 });
             }

             // Fetch user info
             const userResponse = await fetch("https://discord.com/api/users/@me", {
             headers: { Authorization: `Bearer ${accessToken}` },
                 });
                 const discordUser = await userResponse.json();

                 // Save user in DB (upsert)
                 const user = await prisma.user.upsert({
                 where: { discordId: discordUser.id },
                 update: { username: discordUser.username, accessToken, refreshToken },
                 create: { discordId: discordUser.id, username: discordUser.username, accessToken, refreshToken },
                  });
                  // Set cookie session (optional)
                  const response = NextResponse.redirect(user.profileCompleted ? "/arena" : "/profile-setup");
                  setCookie("sessionToken", accessToken, { req: request, res: response, httpOnly: true });

                  console.log("Premium Discord user login:", user.username);

                  return response;
                  } catch (err) {
                  console.error("Discord OAuth Premium Error:", err);
                  return NextResponse.json({ error: "Discord OAuth failed" }, { status: 500 });
                   }
                   }