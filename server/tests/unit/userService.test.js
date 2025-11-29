/**
 *  * UNIT TEST — User Service
  * --------------------------------------------------
   * Verifies logic-level behavior without HTTP or DB layer.
    */

    import { registerUser, getUserProfile } from "../../src/services/userService.js";

    describe("👤 User Service — Premium Logic Checks", () => {
      test("should register a new user with clean inputs", async () => {
          const mock = { username: "AlphaTest", email: "alpha@test.com" };
              const res = await registerUser(mock);
                  expect(res).toHaveProperty("success", true);
                      expect(res).toHaveProperty("user.username", mock.username);
                        });

                          test("should reject registration with invalid email", async () => {
                              const badInput = { username: "Beta", email: "not-an-email" };
                                  await expect(registerUser(badInput)).rejects.toThrow(/invalid email/i);
                                    });

                                      test("should fetch a user profile with correct data", async () => {
                                          const userId = "demo-user-001";
                                              const profile = await getUserProfile(userId);
                                                  expect(profile).toHaveProperty("id", userId);
                                                      expect(profile).toHaveProperty("stats.level");
                                                        });
                                                        });