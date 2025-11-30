"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

export default function AuthCallbackPage() {
  const router = useRouter();

useEffect(() => {
    const handleAuthRedirect = async () => {
    try {
    const { data: { session }, error } = await supabase.auth.getSessionFromUrl();

    if (error) throw error;
    if (session?.user) {
    // Check if profile exists
    const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", session.user.id)
    .single();

    if (profile) {
    router.replace("/dashboard"); // redirect for existing profile
      } else {
      router.replace("/profile-setup/form"); // redirect to your form page
        }
          }
            } catch (err) {
            console.error("Auth callback error:", err.message);
                  }
                      };
handleAuthRedirect();
}, [router]);
return (
<main className="relative min-h-screen w-full bg-black flex items-center justify-center">
{/* Hologram background like login page */}
<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,150,255,0.08)_0%,transparent_70%)] animate-holoWave"></div>

{/* Glass Auth Card */}
<motion.div
initial={{ opacity: 0, scale: 0.96, y: 20 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
transition={{ duration: 0.6 }}
className="relative z-10 w-[92%] max-w-md bg-black/50 border border-blue-400/30 rounded-3xl backdrop-blur-lg p-10 shadow-[0_0_40px_rgba(0,200,255,0.35)] text-center"
 >
  <h1 className="text-3xl font-extrabold text-white mb-4">
  Welcome Back!
   </h1>
   <p className="text-white/50 mb-6">
   Setting up your account...
   </p>
<div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
</motion.div>
</main>
 );
 }