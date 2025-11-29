// server/src/controllers/gameController.js

const gameService = require("../services/gameService");
const antiCheat = require("../utils/antiCheat");
const logger = require("../utils/logger");
const crypto = require("crypto");

module.exports = {

  // ----------------------------------------------------------
    // 🌅 Start Daily Challenge (RLNC-themed, dynamic difficulty)
      // ----------------------------------------------------------
        startDailyChallenge: async (req, res) => {
            try {
                  const userId = req.user.id;

                        const challenge = await gameService.generateDailyChallenge(userId);

                              logger.info(`Daily challenge started for user ${userId}`);

                                    return res.status(200).json({
                                            status: "success",
                                                    message: "Daily Challenge Loaded",
                                                            challenge,
                                                                  });
                                                                      } catch (err) {
                                                                            logger.error("ERROR in startDailyChallenge:", err);
                                                                                  return res.status(500).json({ error: "Server failed to start challenge." });
                                                                                      }
                                                                                        },
//-------------------------------------------------------
  // 🎯 Submit Challenge Result (Anti-Cheat + RLNC logic)
    // ----------------------------------------------------------
      submitChallenge: async (req, res) => {
          try {
                const userId = req.user.id;
                      const { score, timeTaken, rlncProof } = req.body;

                            // Anti-cheat system (Premium AI-powered checks)
                                  if (!antiCheat.verifyHumanity(req) || antiCheat.detectImpossibleStats(score, timeTaken)) {
                                          logger.warn(`Cheat attempt detected from user ${userId}`);
                                                  return res.status(403).json({ error: "Suspicious activity detected." });
                                                        }

                                                              // Validate RLNC-themed proof (fictional but fun 😎)
                                                                    if (!gameService.verifyProof(rlncProof)) {
                                                                            return res.status(400).json({ error: "Invalid RLNC proof." });
                                                                                  }
      const result = await gameService.saveResult(userId, score, timeTaken);

            return res.status(200).json({
                    status: "success",
                            message: "Result submitted successfully.",
                                    data: result,
                                          });

                                              } catch (err) {
                                                    logger.error("ERROR in submitChallenge:", err);
                                                          return res.status(500).json({ error: "Could not submit challenge." });
                                                              }
                                                                },
// ----------------------------------------------------------
  // 🏆 Leaderboard (Weekly, Monthly, All-Time)
    // ----------------------------------------------------------
      getLeaderboard: async (req, res) => {
          try {
                const period = req.query.period || "weekly";

                      const leaderboard = await gameService.fetchLeaderboard(period);

                            return res.status(200).json({
                                    status: "success",
                                            leaderboard,
                                                  });
                                                      } catch (err) {
                                                            logger.error("ERROR in getLeaderboard:", err);
                                                                  return res.status(500).json({ error: "Leaderboard retrieval failed." });
                                                                      }
                                                                        },
// ----------------------------------------------------------
  // ❓ RLNC Mystery / Treasure Event (Premium feature)
    // ----------------------------------------------------------
      getMysteryEvent: async (req, res) => {
          try {
                const clues = await gameService.generateMysteryEvent();

                      return res.status(200).json({
                              status: "success",
                                      message: "New RLNC mystery event unlocked!",
                                              clues,
                                                    });
                                                        } catch (err) {
                                                              logger.error("ERROR in getMysteryEvent:", err);
                                                                    return res.status(500).json({ error: "Unable to generate mystery event." });
                                                                        }
                                                                          },
// ----------------------------------------------------------
  // 🔮 Bonus: AI-Powered Hint Engine (users will scream WOW)
    // ----------------------------------------------------------
      getHint: async (req, res) => {
          try {
                const userId = req.user.id;
                      const hint = await gameService.generateHint(userId);

                            return res.status(200).json({
                                    status: "success",
                                            hint,
                                                  });
                                                      } catch (err) {
                                                            logger.error("ERROR in getHint:", err);
                                                                  return res.status(500).json({ error: "Hint engine failed." });
                                                                      }
                                                                        },
// ----------------------------------------------------------
  // 🎁 Daily Streak System (Premium retention feature)
    // ----------------------------------------------------------
      getStreak: async (req, res) => {
          try {
                const userId = req.user.id;
                      const streak = await gameService.getUserStreak(userId);

                            return res.status(200).json({
                                    status: "success",
                                            streak,
                                                  });
                                                      } catch (err) {
                                                            logger.error("ERROR in getStreak:", err);
                                                                  return res.status(500).json({ error: "Could not fetch streak." });
                                                                      }
                                                                        },
                                                                        };