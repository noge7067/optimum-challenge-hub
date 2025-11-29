"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Twitter, Github, Sparkles } from "lucide-react";

export default function Footer() {
  return (
  <footer className="relative w-full py-10 mt-20 border-t border-gray-800/50 bg-black/20 backdrop-blur-md">
  {/* Decorative sparkles */}
  <Sparkles className="absolute left-4 top-4 h-5 w-5 text-blue-400 animate-pulse" />
  <Sparkles className="absolute right-6 bottom-6 h-4 w-4 text-purple-400 animate-ping" />

  <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 text-center px-4">
  {/* Logo / Symbol (clickable to home) */}
  <motion.div
  initial={{ opacity: 0, y: 6 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.45 }}className="flex items-center gap-3"
    >
    <Link href="/" className="flex items-center gap-3 no-underline">
    {/* Logo Mark */}
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_6px_30px_rgba(0,170,255,0.12)]">
    <Sparkles className="w-5 h-5 text-white" />
      </div>
{/* Logo Text */}
<div className="flex flex-col items-start">
<span className="text-white font-extrabold tracking-tight text-lg">
RoastLab
</span>
<span className="text-xs text-gray-400 -mt-1">Optimum • Challenge Hub</span>
</div>
</Link>
</motion.div>

{/* Short tagline */}
<motion.h2
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, delay: 0.05 }}
className="text-sm md:text-base text-gray-300 font-light tracking-wide max-w-[720px]"
  >
  Built for challengers. Powered by Optimum vibes.
  </motion.h2>
{/* Social Icons */}
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 0.15 }}
className="flex items-center gap-6"
  >
  {/* X / Twitter */}
  <motion.a
  whileHover={{ scale: 1.15 }}
  whileTap={{ scale: 0.95 }}
  href="https://x.com/Ix_prinx?s=09"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-300 hover:text-blue-400 transition"
  aria-label="Visit our X (Twitter)"
    >
<Twitter className="h-6 w-6" />
</motion.a>

{/* GitHub */}
<motion.a
whileHover={{ scale: 1.15 }}
whileTap={{ scale: 0.95 }}
            href="https://github.com/YourGitHubHandle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition"
            aria-label="Visit our GitHub"
             >
             <Github className="h-6 w-6" />
             </motion.a>
             </motion.div>
{/* Bottom note */}
<motion.p
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 0.25 }}
className="text-xs text-gray-500 tracking-wide"
  >
  © {new Date().getFullYear()} RoastLab • Crafted with precision ⚡
   </motion.p>
    </div>
    </footer>
      );
      }