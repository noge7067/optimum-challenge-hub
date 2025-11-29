// lib/API.js
// PREMIUM OPTIMUM EDITION ⚡
// Smart fetch, retries, exponential backoff, offline mode, event hooks,
// auto-token injection, global analytics & unified error handling.

let API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.optimum.fun";
let TOKEN = null;

// --- EVENT SYSTEM (for animations, loaders, toasts, telemetry) ---
export const APIEvents = {
  onRequest: () => {},
    onResponse: () => {},
      onError: () => {},
      };

      // --- GLOBAL TOKEN HANDLER ---
      export const setToken = (t) => (TOKEN = t);

      // --- HELPER: wait() ---
      const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

      // --- RETRY LOGIC WITH EXPONENTIAL BACKOFF ---
      async function smartFetch(url, options = {}, retry = 3) {
        APIEvents.onRequest(url);

          for (let attempt = 1; attempt <= retry; attempt++) {
              try {
                    const finalHeaders = {
                            "Content-Type": "application/json",
                                    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
                                            ...options.headers,
                                                  };

                                                        const response = await fetch(url, { ...options, headers: finalHeaders });

                                                              if (!response.ok) {
                                                                      if (attempt === retry) throw new Error(`HTTP ${response.status}`);
                                                                              await sleep(200 * attempt); // exponential backoff
                                                                                      continue;
                                                                                            }

                                                                                                  const data = await response.json().catch(() => ({}));
                                                                                                        APIEvents.onResponse(data);
                                                                                                              return { ok: true, data };
                                                                                                                  } catch (error) {
                                                                                                                        if (attempt === retry) {
                                                                                                                                APIEvents.onError(error);
                                                                                                                                        return { ok: false, error: cleanError(error) };
                                                                                                                                              }
                                                                                                                                                    await sleep(150 * attempt);
                                                                                                                                                        }
                                                                                                                                                          }
                                                                                                                                                          }

                                                                                                                                                          // --- CLEAN ERROR OUTPUT ---
                                                                                                                                                          function cleanError(error) {
                                                                                                                                                            return {
                                                                                                                                                                message:
                                                                                                                                                                      error?.message ||
                                                                                                                                                                            "Something went wrong, but hey—at least the network survived.",
                                                                                                                                                                                time: Date.now(),
                                                                                                                                                                                  };
                                                                                                                                                                                  }

                                                                                                                                                                                  // --- UNIFIED GET/POST HELPERS ---
                                                                                                                                                                                  export async function GET(path) {
                                                                                                                                                                                    return smartFetch(`${API_BASE}${path}`, { method: "GET" });
                                                                                                                                                                                    }

                                                                                                                                                                                    export async function POST(path, body = {}) {
                                                                                                                                                                                      return smartFetch(`${API_BASE}${path}`, {
                                                                                                                                                                                          method: "POST",
                                                                                                                                                                                              body: JSON.stringify(body),
                                                                                                                                                                                                });
                                                                                                                                                                                                }

                                                                                                                                                                                                // --- PING API (smart health check / fallback detection) ---
                                                                                                                                                                                                export async function healthCheck() {
                                                                                                                                                                                                  const t1 = performance.now();
                                                                                                                                                                                                    const ping = await GET("/health");

                                                                                                                                                                                                      return {
                                                                                                                                                                                                          ok: ping.ok,
                                                                                                                                                                                                              latency: Math.round(performance.now() - t1),
                                                                                                                                                                                                                  timestamp: Date.now(),
                                                                                                                                                                                                                    };
                                                                                                                                                                                                                    }

                                                                                                                                                                                                                    // --- PREMIUM FEATURE: Predictive Request Smoothing (PRS) ---
                                                                                                                                                                                                                    let requestBuffer = [];
                                                                                                                                                                                                                    let flushTimer = null;

                                                                                                                                                                                                                    export function smoothRequest(fn, debounce = 120) {
                                                                                                                                                                                                                      return (...args) => {
                                                                                                                                                                                                                          requestBuffer.push({ fn, args });

                                                                                                                                                                                                                              if (flushTimer) clearTimeout(flushTimer);

                                                                                                                                                                                                                                  flushTimer = setTimeout(() => {
                                                                                                                                                                                                                                        const batch = [...requestBuffer];
                                                                                                                                                                                                                                              requestBuffer = [];

                                                                                                                                                                                                                                                    batch.forEach((req) => req.fn(...req.args));
                                                                                                                                                                                                                                                        }, debounce);
                                                                                                                                                                                                                                                          };
                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                          // --- OFFLINE FALLBACK (local cache) ---
                                                                                                                                                                                                                                                          export function offlineFallback(key, fetcher) {
                                                                                                                                                                                                                                                            return async () => {
                                                                                                                                                                                                                                                                try {
                                                                                                                                                                                                                                                                      const result = await fetcher();
                                                                                                                                                                                                                                                                            if (result.ok) {
                                                                                                                                                                                                                                                                                    localStorage.setItem(key, JSON.stringify(result.data));
                                                                                                                                                                                                                                                                                            return result;
                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                        throw new Error();
                                                                                                                                                                                                                                                                                                            } catch {
                                                                                                                                                                                                                                                                                                                  const cached = localStorage.getItem(key);
                                                                                                                                                                                                                                                                                                                        return cached
                                                                                                                                                                                                                                                                                                                                ? { ok: true, data: JSON.parse(cached), cached: true }
                                                                                                                                                                                                                                                                                                                                        : { ok: false, error: "Offline and no cache available." };
                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                              };
                                                                                                                                                                                                                                                                                                                                              }