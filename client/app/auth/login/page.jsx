"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../../lib/supabase";

// Icons
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaDiscord } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

export default function LoginPage() {
    const [email, setEmail] = useState("");

    // --- GOOGLE LOGIN ---
    const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${window.location.origin}/auth/callback` },
        });
          };
// --- DISCORD LOGIN ---
const loginWithDiscord = async () => {
await supabase.auth.signInWithOAuth({
provider: "discord",
options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
      };
// --- EMAIL OTP ---
const sendOtp = async () => {
if (!email) return alert("Enter a valid email");
const { error } = await supabase.auth.signInWithOtp({ email });
if (error) alert(error.message);
else alert("OTP sent! Check your email.");
  };
return (
    <main className="relative min-h-screen w-full bg-black flex items-center justify-center">
    {/* Slight blue hologram background */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,150,255,0.08)_0%,transparent_70%)] animate-holoWave"></div>
{/* AUTH CARD */}
<motion.div
initial={{ opacity: 0, scale: 0.96, y: 20 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
transition={{ duration: 0.6 }}
className="relative z-10 w-[92%] max-w-md bg-black/50 border border-blue-400/30 rounded-3xl backdrop-blur-lg p-10 shadow-[0_0_40px_rgba(0,200,255,0.35)]"
      >
{/* TITLE */}
<h1 className="text-center text-3xl font-extrabold text-white tracking-wide mb-6">
YOU’RE ABOUT TO ENTER THE ARENA
</h1>

{/* GOOGLE LOGIN */}
<button
onClick={loginWithGoogle}
className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 rounded-xl font-bold text-lg shadow-md hover:scale-[1.02] transition-all"
        >
<FcGoogle size={26} />
Continue with Google
</button>

{/* SEPARATOR */}
<div className="flex justify-center my-4 text-white/50 text-sm">
          ───────── OR ─────────
          </div>

          {/* EMAIL FIELD */}
          <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4 py-3 mb-4">
          <FiMail className="text-white/60" size={22} />
          <input
          type="email"
          className="bg-transparent text-white w-full pl-3 focus:outline-none"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
                    />
                            </div>
{/* PASSWORD FIELD (photo requirement only) */}
<div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 mb-6 flex items-center">
<input
type="password"
className="bg-transparent text-white w-full focus:outline-none"
placeholder="Password"
  />
  </div>

  {/* LOGIN BUTTON */}
  <button
  onClick={sendOtp}
  className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl text-white font-bold text-lg shadow-lg"
    >
    Login
    </button>
{/* SIGN UP LINK */}
<p className="text-center text-white/50 mt-4">
Don’t have an account?{" "}
<span className="text-blue-400">Sign up</span>
 </p>

 {/* SOCIAL ICONS (Photo-accurate layout) */}
 <div className="flex justify-center gap-6 mt-6">
 <div className="cursor-pointer" onClick={loginWithGoogle}>
 <FcGoogle size={32} />
 </div>

 <div className="cursor-pointer" onClick={loginWithDiscord}>
 <FaDiscord size={32} className="text-[#5865F2]" />
  </div>
{/* Facebook placeholder – NOT clickable */}
 <div className="opacity-40">
  <FaFacebook size={32} />
  </div>
  </div>
  </motion.div>
  </main>
    );
    }