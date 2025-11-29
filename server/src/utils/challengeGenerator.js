import crypto from "crypto";
import rlncEngine from "./rlncEngine.js";

// ----------------------------------------------------------
// PREMIUM CHALLENGE GENERATOR
// Dynamic, entropy-driven, streak-aware, rarity-tiered
// ----------------------------------------------------------
/**
 *  * Generates a nano-grade entropy seed.
  * RLNC engine included for uniqueness and anti-cheat.
   */
   function generateEntropySeed(userId = "anonymous") {
     const raw = `${userId}-${Date.now()}-${Math.random()}`;
       return crypto.createHash("sha256").update(raw).digest("hex").substring(0, 16);
       }
 /**
  *  * Rarity tiers for challenges (inspired by gacha games)
   */
   const RARITY_TIERS = [
     { tier: "COMMON", multiplier: 1, chance: 60 },
       { tier: "RARE", multiplier: 1.4, chance: 25 },
         { tier: "EPIC", multiplier: 2, chance: 10 },
           { tier: "LEGENDARY", multiplier: 3, chance: 5 },
           ];
/**
 *  * Picks a rarity tier using probability distribution
  */
  function pickRarity() {
    const roll = Math.random() * 100;
      let cumulative = 0;

        for (const r of RARITY_TIERS) {
            cumulative += r.chance;
                if (roll <= cumulative) return r;
                  }
                    return RARITY_TIERS[0]; // fallback common
                    }
/**
 *  * Base challenge pool
  * You can expand these infinitely.
   */
   const BASE_CHALLENGES = [
     { id: "speed-tap", type: "speed", baseDifficulty: 1, baseXP: 10 },
       { id: "combo-react", type: "reaction", baseDifficulty: 2, baseXP: 15 },
         { id: "memory-path", type: "memory", baseDifficulty: 2, baseXP: 18 },
           { id: "pattern-crack", type: "puzzle", baseDifficulty: 3, baseXP: 25 },
             { id: "focus-hold", type: "concentration", baseDifficulty: 1, baseXP: 12 },
             ];
/**
 *  * MAIN PREMIUM GENERATOR
  */
  export function generateChallengeSets({
    userId = "unknown",
      level = 1,
        streak = 0,
          count = 3,
            useDailySeed = true
            } = {}) {
  // Daily seed (same challenge set for everyone each day)
    const dailySeed = new Date().toISOString().split("T")[0];

      const seedSource = useDailySeed ? `${dailySeed}-${userId}` : userId;
        const seed = generateEntropySeed(seedSource);

          // RLNC-based entropy boost
            const rlncBonus = rlncEngine.getEntropyBoost
                ? rlncEngine.getEntropyBoost(seed)
                    : Math.random();
const challenges = [];

  for (let i = 0; i < count; i++) {
      const base = BASE_CHALLENGES[Math.floor(Math.random() * BASE_CHALLENGES.length)];
          const rarity = pickRarity();

              // Scale difficulty
                  const difficulty =
                        base.baseDifficulty +
                              level +
                                    Math.floor(streak / 3) + // every 3 streak adds difficulty
                                          Math.floor(rlncBonus * 2);
// XP is boosted by level + streak + rarity effects
    const xp =
          Math.floor(
                  base.baseXP *
                            (1 + level * 0.3) *
                                      (1 + streak * 0.1) *
                                                rarity.multiplier
                                                      );
challenges.push({
          id: `${base.id}-${seed}-${i}`,
                type: base.type,
                      rarity: rarity.tier,
                            difficulty,
                                  xp,
                                        entropySeed: seed,
                                              generatedAt: new Date().toISOString(),
                                                    streakBoost: streak > 0 ? `+${streak * 10}%` : "+0%",
                                                          rlncEntropy: rlncBonus,
                                                                wowFactor: difficulty > 10 ? "🔥 ULTRA MODE" : "✨ NORMAL MODE",
                                                                    });
                                                                      }

                                                                        return challenges;
                                                                        }
// ----------------------------------------------------------
// Optional helper: generate one challenge quickly
// ----------------------------------------------------------

export function generateSingleChallenge(options = {}) {
  return generateChallengeSets({ ...options, count: 1 })[0];
  }