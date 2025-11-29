"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Particles from "../components/Particles"; // your safe particle engine

export default function HomePage() {
    return (
    <>
    <Header />
    <main className="relative min-h-screen w-full bg-black text-white overflow-hidden flex items-center justify-center px-6 py-10">

    {/* ===== BACKGROUND LAYERS ===== */}

    {/* Neon Grid */}
    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(#0a0a0a_1px,transparent_1px),linear-gradient(to_right,#0a0a0a_1px,transparent_1px)] bg-[size:40px_40px]" />

    {/* Radial Energy Field */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,120,255,0.25)_0%,transparent_70%)] blur-[90px]" />

    {/* Holographic Distortion Layer */}
    <div className="absolute inset-0 opacity-[0.08] animate-holoWave bg-[url('/noise.png')] mix-blend-soft-light" />

    {/* GPU Particles */}
    <Particles count={80} />

    {/* Orbiting Rings */}
    <div className="absolute w-[800px] h-[800px] rounded-full border border-blue-400/20 animate-slowSpin blur-[2px]" />
    <div className="absolute w-[1100px] h-[1100px] rounded-full border border-indigo-400/10 animate-slowerSpin blur-sm" />
{/* Light Sweep */}
<div className="absolute inset-0 pointer-events-none overflow-hidden">
<div className="absolute inset-y-0 w-[35%] left-0 bg-gradient-to-r from-blue-500/10 to-transparent animate-sweep" />
</div>
{/* ===== MAIN CONTENT ===== */}
<motion.div
initial={{ opacity: 0, y: 20, scale: 0.97 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
transition={{ duration: 0.7, ease: "easeOut" }}
className="relative z-10 max-w-3xl text-center space-y-8"
   >
   {/* HERO TITLE */}
   <motion.h1
   className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-b from-white to-blue-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(0,150,255,0.5)]"
   initial={{ opacity: 0, y: 12 }}animate={{ opacity: 1, y: 0 }}transition={{ duration: 0.6 }}
     >
     Optimum Daily Challenge
     </motion.h1>
{/* GLITCH TEXT */}
<motion.div
className="font-extrabold text-4xl text-blue-200/80 tracking-wider drop-shadow-[0_0_15px_rgba(0,200,255,0.7)] relative z-20"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 0.5, duration: 0.6 }}
    >
    <span className="glitch" data-text="Decrypt. Race. Survive.">
    Decrypt. Race. Survive.
     </span>
     </motion.div>
{/* HOLOGRAM SUBTITLE */}
<motion.p
className="max-w-2xl mx-auto text-blue-100/70 font-semibold leading-relaxed drop-shadow-[0_0_12px_rgba(0,160,255,0.4)]"
initial={{ opacity: 0, y: 12 }}
animate={{ opacity: 0.85, y: 0 }}
transition={{ delay: 0.7, duration: 0.7 }}
    >
    Decode clues. Outrun RLNC packets.  
    Beat the network to earn absolute bragging rights.  
    The testnet hasn’t even begun and you’re already sweating.
    </motion.p>
{/* BUTTON */}
<Link href="/auth/login">
<motion.button
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
whileHover={{
scale: 1.1,
boxShadow:
"0 0 40px rgba(0,200,255,0.9), 0 0 60px rgba(0,150,255,0.6)",
     }}
     whileTap={{ scale: 0.96 }}
     transition={{ duration: 0.15 }}
     className="relative px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-lg shadow-[0_0_25px_rgba(0,170,255,0.7)] border border-blue-400/50 backdrop-blur-md overflow-hidden"
        >
        <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-20"
animate={{ x: ["-150%", "150%"] }}transition={{ repeat: Infinity, duration: 2.3, ease: "linear" }}
  />
  Enter the Arena
  </motion.button>
  </Link>
  </motion.div>
  </main>
  <Footer />
  </>
    );
    }