import express from "express";
import * as UserController from "../controllers/userController.js";

import { asyncHandler, sanitizeInput, generateTraceId } from "../utils/index.js";

                const router = express.Router();
/*
 ====================================================================
    OPTIMUM CHALLENGE HUB — PREMIUM USER ROUTES (NON-CRYPTO)
     ====================================================================
     */

     // security + safety
     router.use(secureHeaders);
     router.use(rateLimitMiddleware(45, 60)); // 45 requests/min per user
// -------------------------------------------------------------
// Check if username is available (for premium onboarding UX)
// -------------------------------------------------------------
router.post(
    "/check-username",
        validate(usernameCheckSchema),
            UserController.checkUsernameAvailability
            );
// -------------------------------------------------------------
// Register new user
// (Enhanced, premium experience: device-aware, metadata, UX-ready)
// -------------------------------------------------------------
router.post(
    "/register",
        validate(registerSchema),
            UserController.register
            );
// -------------------------------------------------------------
// Login user (device-aware + session-ready)
// -------------------------------------------------------------
router.post(
      "/register",
        validate(registerSchema),
          asyncHandler(async (req, res) => {
      console.log("trace:", generateTraceId());

        // sanitize input fields
        if (req.body.username) {
      req.body.username = sanitizeInput(req.body.username);
                                }
       if (req.body.email) {
      req.body.email = sanitizeInput(req.body.email);
                                              }

     return UserController.register(req, res);
                         })
                   );
// -------------------------------------------------------------
// Refresh session token silently
// -------------------------------------------------------------
router.get(
    "/refresh",
        requireAuth,
            UserController.refreshSession
            );

            // -------------------------------------------------------------
            // Get profile of currently logged user
            // -------------------------------------------------------------
            router.get(
                "/me",
                    requireAuth,
                        UserController.getMyProfile
                        );
// -------------------------------------------------------------
// Update profile (bio, avatar, display preferences, etc.)
// -------------------------------------------------------------
router.put(
    "/update",
        requireAuth,
            validate(updateProfileSchema),
                UserController.updateProfile
                );

                // -------------------------------------------------------------
                // Logout (invalidate tokens)
                // -------------------------------------------------------------
                router.post(
                    "/logout",
                        requireAuth,
                            UserController.logout
                            );

                            // -------------------------------------------------------------
                            // Delete account fully
                            // -------------------------------------------------------------
                            router.delete(
                                "/delete",
                                    requireAuth,
                                        UserController.deleteAccount
                                        );

                                        export default router;