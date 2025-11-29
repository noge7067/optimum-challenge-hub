// server/src/controllers/userController.js

const userService = require("../services/userService");
const logger = require("../utils/logger");
const antiCheat = require("../utils/antiCheat");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { generateNeonAvatar } = require("../utils/avatarGen");
const { detectSuspiciousDevice } = require("../utils/deviceGuard");
const { validateInviteCode } = require("../utils/inviteEngine");

module.exports = {
// ----------------------------------------------------------
  // ⭐ PREMIUM USER REGISTRATION (Not Basic At ALL)
    // ----------------------------------------------------------
      registerUser: async (req, res) => {
          try {
                const { username, wallet, inviteCode, personality } = req.body;

                      if (!username || !wallet) {
                              return res.status(400).json({ error: "Missing required fields." });
                                    }

                                          // 1. Invite Code System (Optional but Premium)
                                                if (process.env.REQUIRE_INVITE === "true") {
                                                        const valid = await validateInviteCode(inviteCode);
                                                                if (!valid) return res.status(403).json({ error: "Invalid invite code." });
                                                                      }
// 2. Anti-cheat Human Test (Gesture pattern)
      if (!antiCheat.verifyHumanGesture(req)) {
              logger.warn("Failed human gesture test during signup");
                      return res.status(403).json({ error: "Verification failed. Try again." });
                            }

                                  // 3. Device Safety Check
                                        if (detectSuspiciousDevice(req)) {
                                                return res.status(403).json({
                                                          error: "Suspicious device detected. Contact support."
                                                                  });
                                                                        }
// 4. Generate Premium Neon Avatar
      const avatarUrl = generateNeonAvatar(username);

            // 5. Generate RLNC-enhanced randomness for onboarding perks
                  const entropy = crypto.randomBytes(16).toString("hex");

                        // 6. Create the user
                              const user = await userService.registerUser({
                                      username,
                                              wallet,
                                                      avatarUrl,
                                                              personality: personality || "mysterious",
                                                                      entropy,
                                                                            });
// 7. Assign first-login rewards
      await userService.assignOnboardingRewards(user.id);

            // 8. Auto Give Secret Badge (1% chance)
                  const luck = Math.random();
                        if (luck < 0.01) {
                                await userService.unlockAchievement(user.id, "SECRET_OG_1");
                                        logger.info(`✨ SECRET OG BADGE unlocked for ${username}`);
                                              }

                                                    logger.info(`🎉 New premium user registered: ${username}`);

                                                          return res.status(201).json({
                                                                  status: "success",
                                                                          message: "Premium account created successfully.",
                                                                                  user,
                                                                                          onboardingBonus: true,
                                                                                                });
                                                                                            } catch (err) {
                                                                                                      logger.error("ERROR in registerUser:", err);
                                                                                                            return res.status(500).json({ error: "Registration failed." });
                                                                                                                }
                                                                                                                  },

                                                                                                                    // ----------------------------------------------------------
                                                                                                                      // 🔐 Premium Login System (Upgraded)
                                                                                                                        // ----------------------------------------------------------
                                                                                                                          login: async (req, res) => {
                                                                                                                              try {
                                                                                                                                    const { wallet } = req.body;

                                                                                                                                          const user = await userService.findByWallet(wallet);
                                                                                                                                                if (!user) return res.status(404).json({ error: "User not found." });
// Anti-cheat
      if (!antiCheat.verifyHumanity(req)) {
              logger.warn(`Bot-like login attempt: ${wallet}`);
                      return res.status(403).json({ error: "Suspicious login attempt." });
                            }

                                  // Device check
                                        if (detectSuspiciousDevice(req)) {
                                                logger.warn(`Device flagged for user ${user.username}`);
                                                        return res.status(403).json({ error: "Unsafe device detected." });
                                                              }

                                                                    // JWT
                                                                          const token = jwt.sign(
                                                                                  { id: user.id, wallet: user.wallet },
                                                                                          process.env.JWT_SECRET,
                                                                                                  { expiresIn: "7d" }
                                                                                                        );
 // Login streak
       await userService.updateLoginStreak(user.id);

             logger.info(`🔥 ${user.username} logged in`);

                   return res.status(200).json({
                           status: "success",
                                   message: "Welcome back!",
                                           user,
                                                   token,
                                                         });

                                                             } catch (err) {
                                                                   logger.error("ERROR in login:", err);
                                                                         return res.status(500).json({ error: "Login failed." });
                                                                             }
                                                                               },
// ----------------------------------------------------------
  // 👤 Premium Profile + RLNC Stats
    // ----------------------------------------------------------
      getProfile: async (req, res) => {
          try {
                const userId = req.user.id;
                      const profile = await userService.getProfile(userId);

                            return res.status(200).json({
                                    status: "success",
                                            profile,
                                                  });
                                                      } catch (err) {
                                                            logger.error("ERROR in getProfile:", err);
                                                                  return res.status(500).json({ error: "Could not fetch profile." });
                                                                      }
                                                                        },
// ----------------------------------------------------------
  // 🎮 Progress, Streaks, XP
    // ----------------------------------------------------------
      getProgress: async (req, res) => {
          try {
                const userId = req.user.id;
                      const progress = await userService.getProgress(userId);

                            return res.status(200).json({
                                    status: "success",
                                            progress,
                                                  });

                                                      } catch (err) {
                                                            logger.error("ERROR in getProgress:", err);
                                                                  return res.status(500).json({ error: "Failed to fetch progress." });
                                                                      }
                                                                        },
// ----------------------------------------------------------
  // 🏆 Premium Achievement System
    // ----------------------------------------------------------
      unlockAchievement: async (req, res) => {
          try {
                const userId = req.user.id;
                      const { achievementId } = req.body;

                            const achievement = await userService.unlockAchievement(userId, achievementId);

                                  return res.status(200).json({
                                          status: "success",
                                                  message: "Achievement unlocked!",
                                                          achievement,
                                                                });
                                                            } catch (err) {
                                                                      logger.error("ERROR in unlockAchievement:", err);
                                                                            return res.status(500).json({ error: "Achievement unlock failed." });
                                                                                }
                                                                                  },
// ----------------------------------------------------------
  // 🎨 Premium Settings System (Themes, Avatars, UX Preferences)
    // ----------------------------------------------------------
      updateSettings: async (req, res) => {
          try {
                const userId = req.user.id;
                      const settingsData = req.body;

                            const settings = await userService.updateSettings(userId, settingsData);

                                  return res.status(200).json({
                                          status: "success",
                                                  message: "Settings updated.",
                                                          settings,
                                                                });

                                                                    } catch (err) {
                                                                          logger.error("ERROR in updateSettings:", err);
                                                                                return res.status(500).json({ error: "Settings update failed." });
                                                                                    }
                                                                                      },
// ----------------------------------------------------------
  // 🚪 Premium Logout (Blacklist Token)
    // ----------------------------------------------------------
      logout: async (req, res) => {
          try {
                const token = req.token;

                      await userService.blacklistToken(token);

                            return res.status(200).json({
                                    status: "success",
                                            message: "Goodbye 👋",
                                                  });

                                                      } catch (err) {
                                                            logger.error("ERROR in logout:", err);
                                                                  return res.status(500).json({ error: "Logout failed." });
                                                                      }
                                                                        },
// ----------------------------------------------------------
  // 🧩 Flex Badges (Optimum Lore)
    // ----------------------------------------------------------
      getBadges: async (req, res) => {
          try {
                const userId = req.user.id;
                      const badges = await userService.getBadges(userId);

                            return res.status(200).json({
                                    status: "success",
                                            badges,
                                                  });

                                                      } catch (err) {
                                                            logger.error("ERROR in getBadges:", err);
                                                                  return res.status(500).json({ error: "Unable to fetch badges." });
                                                                      }
                                                                        },
                                                                        };