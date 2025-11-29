// server/src/services/gameService.js

import prisma from "../prisma/client.js";                            // OK

import { generateChallengeSets } from "../utils/challengeGenerator.js";
import { rlncBoostScore } from "../utils/rlncEngine.js";
import { nanoid } from "nanoid";
import dayjs from "dayjs";

// Use it here to un-grey the import
const challenge = generateChallengeSets();

// Exported function that other files can call
export const startGame = async () => {
  const challenges = generateChallengeSets();
    return challenges;
    };

// Helper: Convert to start/end of UTC day
const startOfToday = () => dayjs().utc().startOf("day").toDate();
const endOfToday = () => dayjs().utc().endOf("day").toDate();
/*
=====================================================================
   OPTIMUM CHALLENGE HUB – PREMIUM GAME SERVICE
   =====================================================================
    Everything below is designed to:
     - Deliver unique challenges daily
      - Track progress with streaks, XP, score
       - Prevent repeat spam
        - Allow "premium feel" in UI
         - Support expansions later (boss challenges, seasons, etc.)
         =====================================================================
         */

         export const GameService = {
  /* --------------------------------------------------------------
       1. Fetch today's challenge (unique per day, automatically rotates)
         -------------------------------------------------------------- */
           async getTodayChallenge(userId) {
               // Check if user already has today's challenge
                   const todayAttempt = await prisma.challengeAttempt.findFirst({
                         where: {
                                 userId,
                                         createdAt: {
                                                   gte: startOfToday(),
                                                             lte: endOfToday()
                                                                     }
                                                                           }
                                                                               });

                                                                                   if (todayAttempt) return todayAttempt;
// If user doesn't have one, generate a new challenge set
    const challengeSet = generateChallengeSet(); // randomized, difficulty-balanced

        return await prisma.challengeAttempt.create({
              data: {
                      userId,
                              challengeId: challengeSet.id,
                                      challengeData: challengeSet,
                                              completed: false,
                                                      score: 0,
                                                              seed: nanoid()
                                                                    }
                                                                        });
                                                                          },
/* --------------------------------------------------------------
     2. Submit challenge results
          Premium scoring logic:
               - baseScore
                    - accuracyScore
                         - streak bonus
                              - time multiplier
                                   - RLNC secret spice multiplier 😏
-------------------------------------------------------------- */
  async submitChallenge(userId, payload) {
      const { score, accuracy, timeTaken } = payload;
const attempt = await prisma.challengeAttempt.findFirst({
          where: {
                  userId,
                          completed: false,
                                  createdAt: { gte: startOfToday(), lte: endOfToday() }
                                        }
                                            });

                                                if (!attempt) {
                                                      throw new Error("No active challenge for today.");
                                                          }
// Calculate final score
    const baseScore = score;
        const accuracyBonus = Math.floor(accuracy * 15);
            const timeBonus = timeTaken < 30 ? 25 : timeTaken < 60 ? 10 : 0;

                // Apply RLNC “network propagation style” multiplier
                    const rlncMultiplier = rlncBoostScore(accuracy, timeTaken);

                        const finalScore = Math.floor(
                              (baseScore + accuracyBonus + timeBonus) * rlncMultiplier
                                  );

                                      // Update attempt as completed
                                          await prisma.challengeAttempt.update({
                                                where: { id: attempt.id },
                                                      data: {
                                                              completed: true,
                                                                      score: finalScore
                                                                            }
                                                                                });
// Handle streak logic
    const streak = await this.updateStreak(userId);

        // Add XP based on final score + streak
            const xpGain = Math.floor(finalScore / 10 + streak * 2);

                await prisma.user.update({
                      where: { id: userId },
                            data: {
                                    xp: { increment: xpGain },
                                            highestScore: { increment: finalScore }
                                                  }
                                                      });

                                                          return {
                                                                finalScore,
                                                                      xpGain,
                                                                            streak
                                                                                };
                                                                                  },
/* --------------------------------------------------------------
     3. Streak manager
          Premium version includes:
               - streak reset logic
                    - streak recovery window (24h + grace)
                         - streak milestones (future expansions)
                           -------------------------------------------------------------- */
                             async updateStreak(userId) {
                                 const user = await prisma.user.findUnique({ where: { id: userId } });

                                     const last = user.lastChallengeDate
                                           ? dayjs(user.lastChallengeDate).utc()
                                                 : null;
const today = dayjs().utc();

    let newStreak = user.streak || 0;

        if (!last) {
              newStreak = 1;
                  } else if (today.diff(last, "day") === 0) {
                        // already did today's challenge → streak unchanged
                              return newStreak;
                                  } else if (today.diff(last, "day") === 1) {
                                        // consecutive day
                                              newStreak += 1;
                                                  } else {
                                                        // streak broken, reset
                                                              newStreak = 1;
                                                                  }
await prisma.user.update({
          where: { id: userId },
                data: {
                        streak: newStreak,
                                lastChallengeDate: today.toDate()
                                      }
                                          });

                                              return newStreak;
                                                },
/* --------------------------------------------------------------
     4. Leaderboard (Premium Edition)
          - Paginated
               - Sorted by weekly or all-time
                    - Anti-cheat weight (score consistency)
                      -------------------------------------------------------------- */
                        async getLeaderboard(type = "weekly", page = 1, limit = 20) {
                            const offset = (page - 1) * limit;

                                let where = {};
                                    if (type === "weekly") {
                                          where = {
                                                  createdAt: {
                                                            gte: dayjs().utc().startOf("week").toDate()
                                                                    }
                                                                          };
                                                                              }
const leaderboard = await prisma.user.findMany({
          where,
                orderBy: [{ highestScore: "desc" }],
                      skip: offset,
                            take: limit,
                                  select: {
                                          id: true,
                                                  username: true,
                                                          avatar: true,
                                                                  highestScore: true,
                                                                          xp: true,
                                                                                  streak: true
                                                                                        }
                                                                                            });

                                                                                                return leaderboard;
                                                                                                  },
/* --------------------------------------------------------------
     5. Bonus: Hidden easter-egg challenge (Premium charm)
       -------------------------------------------------------------- */
         async unlockSecretChallenge(userId) {
             const user = await prisma.user.findUnique({ where: { id: userId } });

                 // Requirement: 7-day streak
                     if (user.streak < 7) return null;

                         return {
                               message: "🔥 You've unlocked the Optimum Secret Node Challenge!",
                                     rewardMultiplier: 2.5,
                                           challengeId: "secret-rlnc-boss"
                                               };
                                                 }
                                                 };