import { NextResponse } from "next/server";
import fetch from "node-fetch";

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;

export async function GET(request) {
  const url = new URL(request.url);
    const code = url.searchParams.get("code");

      if (!code) {
          return NextResponse.json({ error: "No code provided" }, { status: 400 });
            }

              // Exchange code for access token
                const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
                    method: "POST",
                        headers: {
                              "Content-Type": "application/x-www-form-urlencoded",
                                  },
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

                                                                                // Fetch user info
                                                                                  const userResponse = await fetch("https://discord.com/api/users/@me", {
                                                                                      headers: { Authorization: `Bearer ${accessToken}` },
                                                                                        });
                                                                                          const user = await userResponse.json();

                                                                                            // TODO: Save user in your database/session
                                                                                              console.log("Discord user:", user);

                                                                                                // Redirect to arena page after login
                                                                                                  return NextResponse.redirect("/arena");
                                                                                                  }