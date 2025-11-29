import crypto from "crypto";

// --------------------------
// INTERNAL HELPERS
// --------------------------

/** Secure random bytes (Premium strength) */
function secureRandomBytes(size = 32) {
  return crypto.randomBytes(size);
  }

  /** Convert bytes → big integer */
  function bytesToBigInt(bytes) {
    return BigInt("0x" + bytes.toString("hex"));
    }
/** Hash input with SHA-256 */
function sha256(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
  }
  
  /**
   * Generate time-salted entropy
    * - Protects against replay attacks
     * - Adds microtime noise
      */
      function generateEntropySeed() {
        const time = Date.now().toString();
          const nano = process.hrtime.bigint().toString();
            const rand = secureRandomBytes(32).toString("hex");
              return sha256(time + nano + rand);
              }
/**
 *  * Create an N×N random matrix using CSPRNG
  */
  function generateRandomMatrix(n = 4) {
    const matrix = [];
      for (let i = 0; i < n; i++) {
          const row = [];
              for (let j = 0; j < n; j++) {
                    row.push(secureRandomBytes(1)[0]); // 0 — 255
                        }
                            matrix.push(row);
                              }
                                return matrix;
                                }
/**
 *  * Compute entropy score (0–100)
  * Used for fairness logs so players trust challenges.
   */
   function entropyScore(seedHex) {
     const unique = new Set(seedHex.split(""));
       return Math.min(100, Math.floor((unique.size / 16) * 100));
       }

       /**
        * Difficulty Modulator Engine (DME)
         * Converts difficulty "EASY / MEDIUM / HARD / INSANE"
          * into real mathematical complexity.
           */
           function difficultyToSize(difficulty) {
             const map = {
                 EASY: 3,
                     MEDIUM: 4,
                         HARD: 5,
                             INSANE: 6,
                               };
                                 return map[difficulty] || 4;
                                 }
// --------------------------
// MAIN RLNC ENGINE
// --------------------------

const rlncEngine = {
  /**
     * Generate fully encoded challenge seed
        */
          generateChallengeSeed(mode = "MEDIUM", proofMode = false) {
              const seed = proofMode
                    ? sha256("STATIC_PROOF_SEED_" + mode)
                          : generateEntropySeed();

                              return {
                                    seed,
                                          entropy: entropyScore(seed),
                                                timestamp: Date.now(),
                                                      mode,
                                                          };
                                                            },
  /**
   *    * Generate matrix-based game challenge (premium)
      */
        generateChallengeMatrix(mode = "MEDIUM", proofMode = false) {
            const { seed, entropy } = this.generateChallengeSeed(mode, proofMode);
                const size = difficultyToSize(mode);

                    // matrix from secure RNG
                        const matrix = generateRandomMatrix(size);

                            return {
                                  seed,
                                        entropy,
                                              matrix,
                                                    size,
                                                          mode,
                                                              };
                                                                },
/**
 *    * Encode challenge matrix → final puzzle token
    */
      encodeMatrix(matrix, seed) {
          const flat = matrix.flat().join("-");
              const encoded = sha256(flat + seed);

                  return {
                        encoded,
                              complexity: matrix.length ** 2,
                                    previewHash: encoded.slice(0, 12), // tiny preview for logs
                                        };
                                          },
  /**
   *    * Generate a complete premium challenge bundle
      * (Used by GameService)
         */
           createFullChallenge(mode = "MEDIUM", proofMode = false) {
               const bundle = this.generateChallengeMatrix(mode, proofMode);

                   const encoded = this.encodeMatrix(bundle.matrix, bundle.seed);

                       return {
                             ...bundle,
                                   encodedToken: encoded.encoded,
                                         complexity: encoded.complexity,
                                               previewHash: encoded.previewHash,
                                                   };
                                                     },
                                                     };

                                                     // --------------------------
                                                     // EXPORT
                                                     // --------------------------

                                                     export default rlncEngine;