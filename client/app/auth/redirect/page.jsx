"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie, getCookie } from "cookies-next";
import { supabase } from "../../../lib/supabase";

export default function AuthRedirectPage() {
const router = useRouter();
const [loadingMessage, setLoadingMessage] = useState("Logging you in… Please wait.");

useEffect(() => {
const handleRedirect = async () => {
try {
// Grab tokens from URL hash (#) or query (?)
const hash = window.location.hash.replace("#", "?");
const search = window.location.search;
const params = new URLSearchParams(hash || search);

let accessToken = params.get("access_token") || getCookie("sessionToken");
let refreshToken = params.get("refresh_token") || getCookie("refreshToken");

if (!accessToken && !refreshToken) {
console.warn("⚠️ No access or refresh token → redirecting to login");
router.replace("/auth/login");
return;
 }

 const cookieOptions = { path: "/", httpOnly: true, maxAge: 3 * 24 * 60 * 60 };
 if (accessToken) setCookie("sessionToken", accessToken, cookieOptions);
 if (refreshToken) setCookie("refreshToken", refreshToken, cookieOptions);

 // Attach token to Supabase client (premium fix)
 if (accessToken) {
  await supabase.auth.setSession({
  access_token: accessToken,
  refresh_token: refreshToken || getCookie("refreshToken")
                });
                }
 
// Fetch user info
const { data: { user }, error: userError } = await supabase.auth.getUser();
if (userError) console.warn("Supabase user fetch error:", userError.message);

// Silent session refresh if needed
if (!user && refreshToken) {
const { data: refreshed, error: refreshError } = await supabase.auth.refreshSession({ refresh_token: refreshToken });
if (refreshError) {
console.error("❌ Session refresh failed:", refreshError.message);
router.replace("/auth/login");
return;
 }
 accessToken = refreshed.session.access_token;
 setCookie("sessionToken", accessToken, cookieOptions);
           supabase.auth.setSession(refreshed.session);
            }

 // Check profile existence
  const { data: profileData, error: profileError } = await supabase
  .from("user_profiles")
  .select("id")
  .eq("user_id", user?.id)
  .single();
  if (profileError) {
  console.warn("⚠️ Fetch profile failed:", profileError.message);
  setLoadingMessage("Fetching profile failed… Proceed to create an account first!");
  } else if (profileData) {
  setLoadingMessage("Welcome back! Redirecting to Arena… 🏟️");
  } else {
  setLoadingMessage("No profile found. Redirecting to setup… 🛠️");
         }
// Smooth redirect after short delay
const destination = profileData ? "/arena" : "/profile-setup";
setTimeout(() => router.replace(destination), 1200);

} catch (err) {
console.error("Auth callback error:", err.message || err);
router.replace("/auth/login");
 }
  };
  handleRedirect();
  }, [router]);

  return (
  <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white">
  <p className="text-center text-lg animate-pulse">{loadingMessage}</p>
  <div className="mt-6 w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
   );
   }