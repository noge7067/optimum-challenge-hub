// particleEngine.js  
// A hyper-optimized, physics-enhanced particle engine with:  
// Noise movement, orbit, bounce, pulse, color cycling, and energy decay.  

function rand(min, max) {  
  return Math.random() * (max - min) + min;  
  }  

  export function createParticles(count, width, height) {  
    return Array.from({ length: count }).map(() => ({  
        x: rand(0, width),  
            y: rand(0, height),  
                vx: rand(-0.4, 0.4),  
                    vy: rand(-0.4, 0.4),  
                        baseScale: rand(0.4, 1.2),  
                            scale: rand(0.4, 1.2),  
                                energy: rand(0.5, 1),  
                                    colorShift: rand(0, 360),  
                                        colorSpeed: rand(0.2, 1),  
                                            orbitStrength: rand(0.02, 0.06),  
                                                pulseSpeed: rand(0.01, 0.04),  
                                                    noiseSeed: rand(0, 9999),  
                                                      }));  
                                                      }  

                                                      // Simple pseudo noise (lightweight, mobile-safe)  
                                                      function noise(seed) {  
                                                        return Math.sin(seed + Math.cos(seed * 1.3)) * 0.5 + 0.5;  
                                                        }  

                                                        export function updateParticles(particles, width, height, centerX, centerY) {  
                                                          particles.forEach((p) => {  
                                                              // --- 1) Add soft perlin-like wobble motion ---  
                                                                  const n = noise(p.noiseSeed);  
                                                                      p.noiseSeed += 0.01;  
                                                                          p.vx += (n - 0.5) * 0.01;  
                                                                              p.vy += (0.5 - n) * 0.01;  

                                                                                  // --- 2) Orbit toward the center in a smooth circular motion ---  
                                                                                      const dx = centerX - p.x;  
                                                                                          const dy = centerY - p.y;  
                                                                                              p.vx += dx * p.orbitStrength * 0.001;  
                                                                                                  p.vy += dy * p.orbitStrength * 0.001;  

                                                                                                      // --- 3) Update position ---  
                                                                                                          p.x += p.vx;  
                                                                                                              p.y += p.vy;  

                                                                                                                  // --- 4) Bounce on edges ---  
                                                                                                                      if (p.x < 0 || p.x > width) p.vx *= -1;  
                                                                                                                          if (p.y < 0 || p.y > height) p.vy *= -1;  

                                                                                                                              // --- 5) Color cycle ---  
                                                                                                                                  p.colorShift = (p.colorShift + p.colorSpeed) % 360;  

                                                                                                                                      // --- 6) Pulse effect ---  
                                                                                                                                          p.scale =  
                                                                                                                                                p.baseScale +  
                                                                                                                                                      Math.sin(p.energy + performance.now() * p.pulseSpeed * 0.005) * 0.3;  

                                                                                                                                                          // --- 7) Energy drift (smooth random breathing effect) ---  
                                                                                                                                                              p.energy += rand(-0.03, 0.03);  
                                                                                                                                                                });  
                                                                                                                                                                }  

                                                                                                                                                                export function getRenderData(particles) {  
                                                                                                                                                                  // Returns *clean*, UI-friendly particle values  
                                                                                                                                                                    return particles.map((p) => ({  
                                                                                                                                                                        x: p.x,  
                                                                                                                                                                            y: p.y,  
                                                                                                                                                                                scale: p.scale,  
                                                                                                                                                                                    color: `hsl(${p.colorShift}, 80%, 60%)`,  
                                                                                                                                                                                      }));  
                                                                                                                                                                                      }  

                                                                                                                                                                                      // --- ADDED: safe guard for SSR + animation stability ---  
                                                                                                                                                                                      export function safePosition(val) {  
                                                                                                                                                                                        return Number.isFinite(val) ? val : 0;  
                                                                                                                                                                                        }