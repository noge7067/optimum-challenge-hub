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
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/redirect/supabase`
        },
        });
          };
// --- DISCORD LOGIN ---
const loginWithDiscord = async () => {
await supabase.auth.signInWithOAuth({
provider: "discord",
redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/redirect/supabase`
    },
    });
      };
// --- EMAIL OTP ---
const sendOtp = async () => {
  if (!email) return alert("Enter a valid email");

  const { error } = await supabase.auth.signInWithOtp({
  email,
  options: {
redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/redirect/supabase`
    },
      });

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
className="relative z-10 w-[90%] max-w-md bg-black/50 border border-blue-400/30 rounded-[4rem] backdrop-blur-lg p-10 shadow-[0_0_40px_rgba(0,200,255,0.35)]"
        >
{/* TITLE */}
<h1 className="text-center text-3xl font-extrabold tracking-wide mb-6 text-color-wave">
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
<div
className="flex items-center mb-4"
style={{
backgroundColor: "rgba(255,0,0,0.05)", // faint red background
border: "2px solid red",               // red border
borderRadius: "1rem",                  // curved edges
paddingTop: "1.5rem",
paddingBottom: "1.5rem",
paddingLeft: "1.5rem",
width: "calc(100% - 2rem)",  // retracts 1rem on each side
marginLeft: "1rem",
marginRight: "1rem",
transition: "all 0.3s ease",
alignItems: "center",
  }}
  onMouseEnter={(e) => (e.currentTarget.style.border = "2px solid darkred")}
  onMouseLeave={(e) => (e.currentTarget.style.border = "2px solid red")}
  >
  <FiMail size={22} style={{ color: "red", flexShrink: 0 }} />
  <input
  type="email"
  className="bg-transparent w-full pl-3"
  placeholder="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  style={{
  color: "red",
  border: "none",
  outline: "none",
  flex: 1,
  fontSize: "1rem",
  backgroundColor: "transparent",
  marginLeft: "0.75rem",
   }}
   onFocus={(e) => (e.currentTarget.parentElement.style.boxShadow = "0 0 10px red")}
   onBlur={(e) => (e.currentTarget.parentElement.style.boxShadow = "none")}
    />
    </div>
{/* PASSWORD FIELD (photo requirement only) */}
<div
className="flex items-center px-4 mb-6"
style={{
backgroundColor: "rgba(255,0,0,0.05)",
border: "2px solid red",
borderRadius: "1rem",
paddingTop: "1.5rem",
paddingBottom: "1.5rem",
paddingLeft: "1.5rem",   // <-- add or increase
paddingRight: "1.5rem",  // <-- add or increase
width: "calc(100% - 2rem)",  // retracts 1rem on each side
marginLeft: "1rem",
marginRight: "1rem",
transition: "all 0.3s ease",
alignItems: "center",
  }}
  onMouseEnter={(e) => (e.currentTarget.style.border = "2px solid darkred")}
  onMouseLeave={(e) => (e.currentTarget.style.border = "2px solid red")}
  >
  <input
  type="password"
  className="bg-transparent w-full"
  placeholder="Password"
  style={{
  color: "red",
  border: "none",
  outline: "none",
  flex: 1,
  fontSize: "1rem",
  backgroundColor: "transparent",
    }}
    onFocus={(e) => (e.currentTarget.parentElement.style.boxShadow = "0 0 10px red")}
    onBlur={(e) => (e.currentTarget.parentElement.style.boxShadow = "none")}
     />
     </div>

  {/* LOGIN BUTTON */}
<button  
  onClick={sendOtp} 

className="w-[40%] mx-auto h-20 rounded-full text-white font-bold text-lg shadow-lg mt-6 transition-all"
style={{
  backgroundColor: 'green',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1.25rem', // text-lg
  width: '80%',
  margin: '1.5rem auto 0 auto', // mt-6 + mx-auto
  borderRadius: '9999px', // fully rounded
  paddingTop: '1.5rem',
  paddingBottom: '1.5rem', // make it fat
  boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
  display: 'block',
  textAlign: 'center',
  transition: 'all 0.3s ease'
   }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'darkgreen'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'green'}
        >
      Login / Sign Up  
      </button>
{/* SIGN UP LINK */}
<p className="text-center text-white/70 mt-20 font-bold tracking-wide">
  Don’t have an account?{" "}
    <span className="text-blue-400 font-extrabold">Sign up</span>
    </p>

 {/* SOCIAL ICONS (Photo-accurate layout) */}
 <div className="flex justify-center gap-14 mt-14">
 <div className="cursor-pointer bg-white/10 p-3 rounded-xl hover:bg-white/20 transition" onClick={loginWithGoogle}>
 <FcGoogle size={32} />
 </div>

 <div className="cursor-pointer bg-white/10 p-3 rounded-xl hover:bg-white/20 transition" onClick={loginWithDiscord}>
 <FaDiscord size={32} className="text-[#5865F2]" />
  </div>
{/* Facebook placeholder – NOT clickable */}
 <div className="opacity-40 bg-white/10 p-3 rounded-xl">
  <FaFacebook size={32} />
  </div>
  </div>
  </motion.div>
  </main>
    );
    }