"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { createParticles, updateParticles } from "./particleEngine";

const safePosition = (value) => {
    if (typeof window === "undefined") return 0;
      return Math.max(0, Math.min(value, window.innerWidth || 0));
      };
const safePositionY = (value) => {
    if (typeof window === "undefined") return 0;
      return Math.max(0, Math.min(value, window.innerHeight || 0));
      };

export default function Particles({ count = 80, speed = 0.6 }) {
  // Prevent SSR output completely
    if (typeof window === "undefined") return null;

      // ready = true only when we have valid width & height and particles created
        const [ready, setReady] = useState(false);
          const [size, setSize] = useState({ width: 0, height: 0 });
            const particlesRef = useRef([]);

              // 1) Detect client window size (run only on client)
                useEffect(() => {
                    if (typeof window === "undefined") return;

                        const update = () => {
                              setSize({
                                      width: Math.max(1, window.innerWidth || 1),
                                              height: Math.max(1, window.innerHeight || 1),
                                                    });
                                                        };

                                                            update();
                                                                window.addEventListener("resize", update);
                                                                    return () => window.removeEventListener("resize", update);
                                                                      }, []);

                                                                        // 2) Create particles only after we have valid size
                                                                          useEffect(() => {
                                                                              if (!size.width || !size.height) return;

                                                                                  particlesRef.current = createParticles(count, size.width, size.height, speed);
                                                                                      setReady(true);

                                                                                          // eslint-disable-next-line react-hooks/exhaustive-deps
                                                                                            }, [size.width, size.height, count, speed]);

                                                                                              // 3) Animation loop (requestAnimationFrame), updates in engine only
                                                                                                useEffect(() => {
                                                                                                    if (!ready) return;

                                                                                                        let mounted = true;
                                                                                                            let rafId = null;

                                                                                                                const tick = () => {
                                                                                                                      if (!mounted) return;
                                                                                                                            updateParticles(
                                                                                                                                    particlesRef.current,
                                                                                                                                            size.width,
                                                                                                                                                    size.height,
                                                                                                                                                            size.width / 2,
                                                                                                                                                                    size.height / 2
                                                                                                                                                                          );
                                                                                                                                                                                rafId = requestAnimationFrame(tick);
                                                                                                                                                                                    };

                                                                                                                                                                                        rafId = requestAnimationFrame(tick);

                                                                                                                                                                                            return () => {
                                                                                                                                                                                                  mounted = false;
                                                                                                                                                                                                        if (rafId) cancelAnimationFrame(rafId);
                                                                                                                                                                                                            };
                                                                                                                                                                                                              }, [ready, size.width, size.height]);

                                                                                                                                                                                                                // 4) Don’t render until ready
                                                                                                                                                                                                                  if (!ready) return null;

                                                                                                                                                                                                                    // 5) Render purely client-side values (safePosition guards against NaN)
                                                                                                                                                                                                                      return (
                                                                                                                                                                                                                          <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                                                                                                                                                                                                                {particlesRef.current.map((p, i) => (
                                                                                                                                                                                                                                        <motion.div
                                                                                                                                                                                                                                                  key={i}
                                                                                                                                                                                                                                                            className="absolute w-2 h-2 rounded-full"
                                                                                                                                                                                                                                                                      style={{
                                                                                                                                                                                                                                                                                  left: safePosition(p.x),
                                                                                                                                                                                                                                                                                              top: safePosition(p.y),
                                                                                                                                                                                                                                                                                                          width: Math.max(2, (p.scale || 1) * 4),
                                                                                                                                                                                                                                                                                                                      height: Math.max(2, (p.scale || 1) * 4),
                                                                                                                                                                                                                                                                                                                                  backgroundColor: p.color,
                                                                                                                                                                                                                                                                                                                                              transformOrigin: "center center",
                                                                                                                                                                                                                                                                                                                                                        }}
                                                                                                                                                                                                                                                                                                                                                                  animate={{
                                                                                                                                                                                                                                                                                                                                                                              scale: [1, 1.25, 1],
                                                                                                                                                                                                                                                                                                                                                                                        }}
                                                                                                                                                                                                                                                                                                                                                                                                  transition={{
                                                                                                                                                                                                                                                                                                                                                                                                              duration: p.pulseDur || 3,
                                                                                                                                                                                                                                                                                                                                                                                                                          repeat: Infinity,
                                                                                                                                                                                                                                                                                                                                                                                                                                      ease: "easeInOut",
                                                                                                                                                                                                                                                                                                                                                                                                                                                }}
                                                                                                                                                                                                                                                                                                                                                                                                                                                        />
                                                                                                                                                                                                                                                                                                                                                                                                                                                              ))}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }