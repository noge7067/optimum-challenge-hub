// server/src/routes/gameRoutes.js
import express from "express";
import * as GameController from "../controllers/gameController.js";

const router = express.Router();
/*  
 ====================================================================
     PREMIUM GAME ROUTES — ULTRA STRUCTURED & EXPANDABLE
      ====================================================================
      */

      // Global security + rate limiting for all game endpoints
      router.use(secureHeaders);
      router.use(rateLimitMiddleware(30, 60)); // 30 req per 60 sec

      // Versioned API prefix: /api/v1/game
// -------------------------------------------------------------
// Create new daily challenge
// -------------------------------------------------------------
router.post(
    "/create",
        requireAuth,                          // Must be logged in
            validate(createGameSchema),           // Validate request body
                GameController.createDailyChallenge
                );
// -------------------------------------------------------------
// Get today's challenge (no auth required)
// -------------------------------------------------------------
router.get(
    "/today",
        GameController.getTodayChallenge
        );
// -------------------------------------------------------------
// Submit user score for today's challenge
// -------------------------------------------------------------
router.post(
    "/submit",
        requireAuth,                          // Only authenticated users
            validate(submitScoreSchema),          // Validate score + metadata
                GameController.submitScore
                );
// -------------------------------------------------------------
// Full leaderboard (global, cached later)
// -------------------------------------------------------------
router.get(
    "/leaderboard",
        GameController.getLeaderboard
        );
// -------------------------------------------------------------
// Individual user game stats
// -------------------------------------------------------------
router.get(
    "/stats/:userId",
        requireAuth,
            GameController.getUserStats
            );
// -------------------------------------------------------------
// Historical challenges archive
// -------------------------------------------------------------
router.get(
    "/history",
        GameController.getChallengeHistory
        );
// -------------------------------------------------------------
// Admin: regenerate daily challenge manually
// -------------------------------------------------------------
router.post(
    "/admin/regenerate",
        requireAuth,                           // Later: Add admin role check
            GameController.regenerateChallenge
            );

            export default router;