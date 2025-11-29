"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [shine, setShine] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setShine(true), 4500);
            return () => clearInterval(interval);
              }, []);
 return (
  <header
    className="
        fixed inset-0 z-50
            flex items-center justify-center
                bg-transparent
                    text-white
                        font-black text-6xl tracking-wider uppercase
                            pointer-events-none select-none
                              "
  style={{
  transform: "translateY(-500%)",
  textShadow: "0 0 25px rgba(0,150,255,0.9), 0 0 50px rgba(0,150,255,0.6)",
                  }}
                               >
{/* Floating particles */}
 <div className="absolute inset-0 -z-10 animate-floating-particles pointer-events-none" />

 <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
{/* LOGO with maximum shine */}
  <div
    className="
     relative text-5xl md:text-6xl font-black tracking-wide tracking-tight uppercase
       bg-gradient-to-r from-white via-neutral-300 to-white
        bg-clip-text text-transparent
          hover:scale-[1.05] transition-all duration-300
                    "
                            >
Optimum
 {shine && (
   <span
    onAnimationEnd={() => setShine(false)}
     className="
      absolute inset-0 block bg-gradient-to-r 
       from-transparent via-white/70 to-transparent
       animate-shine pointer-events-none
                     "
           />
          )}
     </div>
{/* STATUS + MODES */}
<div className="flex items-center gap-4">
<span className="text-sm text-white font-semibold hover:text-white transition">
  🌐 Testnet Era
    </span>
     <div
     className="
     px-4 py-2 text-sm font-semibold 
      rounded-xl
      bg-gradient-to-r from-indigo-600/40 to-purple-600/40
       border border-white/20
        hover:scale-[1.07] hover:shadow-[0_0_30px_rgba(130,80,255,0.35)]
        transition-all duration-300
              "
               >
🔮 Live Mode
 </div>
  </div>
   </div>

    {/* BOTTOM RGB PULSE LINE */}
      <div
       className="
        w-full h-[2px]
         animate-rgb-pulse
          bg-gradient-to-r 
           from-indigo-400 via-purple-400 to-pink-400
                     opacity-90
                             "
                                   />
                                       </header>

  );
  }