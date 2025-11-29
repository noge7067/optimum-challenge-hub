import rlncEngine from "./utils/rlncEngine.js";
import crypto from "crypto";
import express from "express";
import cors from "cors";

// ---------------------------------------------
// PREMIUM LOGGER (timestamps, colors, labels)
// ---------------------------------------------
const logger = {
  info: (msg) =>
      console.log("\x1b[36m%s\x1b[0m", `[INFO ${new Date().toISOString()}] ${msg}`),
        success: (msg) =>
            console.log("\x1b[32m%s\x1b[0m", `[SUCCESS ${new Date().toISOString()}] ${msg}`),
              warn: (msg) =>
                  console.warn("\x1b[33m%s\x1b[0m", `[WARN ${new Date().toISOString()}] ${msg}`),
                    error: (msg) =>
                        console.error("\x1b[31m%s\x1b[0m", `[ERROR ${new Date().toISOString()}] ${msg}`),
                        };
// ---------------------------------------------
// SAFE JSON HELPERS
// ---------------------------------------------
const safeJSON = {
  parse(str, fallback = null) {
      try {
            return JSON.parse(str);
                } catch {
                      return fallback;
                          }
                            },

                              stringify(obj, fallback = "{}") {
                                  try {
                                        return JSON.stringify(obj);
                                            } catch {
                                                  return fallback;
                                                      }
                                                        },
                                                        };
// ---------------------------------------------
// ASYNC WRAPPER – prevents try/catch spam
// ---------------------------------------------
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
    };

    export const sanitizeInput = (value) => {
      if (typeof value !== "string") return value;
        return value.replace(/[<>$;]/g, "");
        };

        export const generateTraceId = () => {
          return "trace_" + Math.random().toString(36).substring(2, 10);
          };
// ---------------------------------------------
// PERFORMANCE TIMER (Premium Dev Tool)
// ---------------------------------------------
const perf = {
  start(label = "task") {
      const startTime = performance.now();
          return {
                end() {
                        const end = performance.now();
                                const ms = (end - startTime).toFixed(2);
                                        logger.info(`⏱️  ${label} completed in ${ms}ms`);
                                                return ms;
                                                      },
                                                          };
                                                            },
                                                            };
// ---------------------------------------------
// UID GENERATORS — nano-grade unique IDs
// ---------------------------------------------
function uid(size = 16) {
  return crypto.randomBytes(size).toString("hex");
  }

  function nanoid(size = 12) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      let id = "";
        const bytes = crypto.randomBytes(size);
          for (let i = 0; i < size; i++) {
              id += chars[bytes[i] % chars.length];
                }
                  return id;
                  }
// ---------------------------------------------
// DEEP CLONE (fast, safe, premium)
// ---------------------------------------------
function deepClone(obj) {
  return safeJSON.parse(safeJSON.stringify(obj));
  }

  // ---------------------------------------------
  // AUTOMATIC UTIL EXPORTER (future-proofing)
  // ---------------------------------------------
  const utils = {
    rlncEngine,
      logger,
        safeJSON,
          asyncHandler,
            perf,
              uid,
                nanoid,
                  deepClone,
                  };
// ---------------------------------------------
// EXPORT MAIN UTIL HUB
// ---------------------------------------------
export default utils;

// Also allow named imports
export {
  rlncEngine,
    logger,
      safeJSON,
        perf,
          uid,
            nanoid,
              deepClone,
              };
// ------------------------------------------------------
// 🔥🔥🔥 PREMIUM SERVER BOOTSTRAP (added below) 🔥🔥🔥
// ------------------------------------------------------
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
// Health route (important for client)
app.get("/", (req, res) => {
  logger.success("Health check hit.");
    res.json({ status: "ok", message: "Optimum Challenge Hub Server Running 🚀" });
    });
// Optional: add your game routes later
// import userRoutes from "./routes/userRoutes.js";
// import gameRoutes from "./routes/gameRoutes.js";
// app.use("/api/users", userRoutes);
// app.use("/api/game", gameRoutes);
// Automatic port selection
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  logger.success(`🚀 Server running on port ${PORT}`);
  });