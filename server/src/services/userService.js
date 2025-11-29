// server/src/services/userService.js

import prisma from "../../prisma/client.js";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { usernameFromEmail } from "../utils/nameGenerator.js";
import dayjs from "dayjs";

export const UserService = {
/* --------------------------------------------------------------
     1. CREATE USER (Premium Registration)
          - Strong password hashing
               - Auto username if not supplied
                    - Random avatar generator
                         - Reputation baseline
                              - Anti-multi-account fingerprint placeholder
                                -------------------------------------------------------------- */
                                  async createUser({ email, password, username }) {

                                      const existing = await prisma.user.findUnique({ where: { email } });
                                          if (existing) {
                                                throw new Error("Account already exists for this email.");
                                                    }
const hashed = await bcrypt.hash(password, 12);

    const finalUsername = username || usernameFromEmail(email);

        const avatarUrl = `https://api.dicebear.com/7.x/shapes/svg?seed=${finalUsername}`;

            const newUser = await prisma.user.create({
                  data: {
                          email,
                                  password: hashed,
                                          username: finalUsername,
                                                  avatar: avatarUrl,
                                                          xp: 0,
                                                                  streak: 0,
                                                                          highestScore: 0,
                                                                                  reputation: 50, // middle ground: neutral reputation
                                                                                          healthScore: 100, // anti-cheat trust factor
                                                                                                  createdAt: new Date(),
                                                                                                        }
                                                                                                            });
// hide password in returned object
    delete newUser.password;

        return newUser;
          },

            /* --------------------------------------------------------------
                 2. LOGIN USER
                      - bcrypt verification
                           - login streak boost
                                - reputation adjustments
                                     - lastLogin update
-------------------------------------------------------------- */
  async loginUser({ email, password }) {
      const user = await prisma.user.findUnique({ where: { email } });

          if (!user) throw new Error("Invalid credentials.");

              const verified = await bcrypt.compare(password, user.password);
                  if (!verified) throw new Error("Invalid credentials.");
// bonus rep for daily login
    const last = user.lastLogin ? dayjs(user.lastLogin).utc() : null;
        const now = dayjs().utc();
            const consecutive = last && now.diff(last, "hour") <= 36;

                await prisma.user.update({
                      where: { id: user.id },
                            data: {
                                    lastLogin: new Date(),
                                            reputation: {
                                                      increment: consecutive ? 1 : 0
                                                              }
                                                                    }
                                                                        });
delete user.password;
    return user;
      },

        /* --------------------------------------------------------------
             3. GET USER PROFILE
                  - strips sensitive fields
                       - auto-calculates "level"
                            - assigns badge based on XP
                              -------------------------------------------------------------- */
                                async getUserProfile(userId) {
                                    const user = await prisma.user.findUnique({
                                          where: { id: userId }
                                              });
if (!user) throw new Error("User not found.");

    delete user.password;

        const level = Math.floor(user.xp / 120);

            const badge =
                  level >= 20 ? "💎 Diamond" :
                        level >= 15 ? "🔥 Ruby" :
                              level >= 10 ? "⭐ Gold" :
                                    level >= 5  ? "🥈 Silver" : "🥉 Bronze";

                                        return {
                                              ...user,
                                                    level,
                                                          badge,
                                                              };
                                                                },
/* --------------------------------------------------------------
     4. UPDATE PROFILE
          - username change
               - avatar refresh
                    - social links (optional)
                      -------------------------------------------------------------- */
                        async updateProfile(userId, data) {
                            const allowed = {};

                                if (data.username) allowed.username = data.username;
                                    if (data.avatar) allowed.avatar = data.avatar;
if (data.socials) {
          allowed.socials = data.socials; // { twitter:'', github:'' }
              }

                  const updated = await prisma.user.update({
                        where: { id: userId },
                              data: allowed
                                  });

                                      delete updated.password;
                                          return updated;
                                            },
/* --------------------------------------------------------------
     5. REPUTATION MANAGEMENT (Premium)
          - Used for anti-cheat and incentives
            -------------------------------------------------------------- */
              async adjustReputation(userId, value) {
                  return prisma.user.update({
                        where: { id: userId },
                              data: {
                                      reputation: {
                                                increment: value
                                                        }
                                                              }
                                                                  });
                                                                    },
/* --------------------------------------------------------------
     6. USER HEALTH SCORE
          - Tracks suspicious behaviour
               - Can be used later for challenge difficulty tuning
                 -------------------------------------------------------------- */
                   async adjustHealthScore(userId, change) {
                       const user = await prisma.user.findUnique({ where: { id: userId } });
let newHealth = user.healthScore + change;
    if (newHealth > 100) newHealth = 100;
        if (newHealth < 0) newHealth = 0;

            return prisma.user.update({
                  where: { id: userId },
                        data: { healthScore: newHealth }
                            });
                              },
/* --------------------------------------------------------------
     7. DELETE USER
          - Soft delete (premium style)
               - Keeps leaderboard integrity
                 -------------------------------------------------------------- */
                   async softDeleteUser(userId) {
                       return prisma.user.update({
                             where: { id: userId },
                                   data: {
                                           deleted: true,
                                                   username: `deleted_${nanoid(6)}`,
                                                           avatar: null,
                                                                   reputation: 0,
                                                                           healthScore: 0
                                                                                 }
                                                                                     });
                                                                                       }
                                                                                       };