// DO NOT use "use client"
// RootLayout.jsx
import "../styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });

export const metadata = {
  title: "Optimum Challenge Hub",
    description: "Compete. Climb. Conquer.",
    };

    export default function RootLayout({ children }) {
      return (
          <html lang="en">
                <body
                        className={`${inter.className} bg-black text-white min-h-screen flex flex-col relative overflow-x-hidden`}
                              >
{/* STRONG AMBIENT GLOW */}
<div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(0,110,255,0.35)_0%,transparent_80%)] blur-[140px] opacity-90"></div>
{/* STRONGER NEON GRID */}
<div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40"></div>
{/* VISIBLE FLOATING PARTICLES */}
 <div className="pointer-events-none fixed inset-0 overflow-hidden">
 <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-500 rounded-full blur-xl animate-ping"></div>
 <div className="absolute bottom-1/3 right-1/2 w-5 h-5 bg-purple-400 rounded-full blur-2xl animate-bounce"></div>
 <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-cyan-300 rounded-full blur-lg animate-pulse"></div>
         </div>
{/* MAIN WRAPPER WITH REAL SPACING */}
<div className="relative z-10 flex flex-col w-full flex-grow px-8 py-6">
{children}
</div>
</body>
</html>
 );
 }