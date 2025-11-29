/**
 *  * INTEGRATION TEST — User Routes
  * --------------------------------------------------
   * Validates full stack flow: routing + service logic + response.
    */

    import request from "supertest";
    import app from "../../src/index.js";

    describe("🌐 User Routes — Integration", () => {
      test("POST /api/user/register → should register user successfully", async () => {
          const payload = { username: "Tester", email: "tester@hub.ai" };
              const res = await request(app)
                    .post("/api/user/register")
                          .send(payload)
                                .expect("Content-Type", /json/)
                                      .expect(201);

                                          expect(res.body.success).toBe(true);
                                              expect(res.body.user.username).toBe("Tester");
                                                });

                                                  test("GET /api/user/:id → should fetch user profile", async () => {
                                                      const id = "demo-user-01";
                                                          const res = await request(app)
                                                                .get(`/api/user/${id}`)
                                                                      .expect("Content-Type", /json/)
                                                                            .expect(200);

                                                                                expect(res.body.success).toBe(true);
                                                                                    expect(res.body).toHaveProperty("profile");
                                                                                      });
                                                                                      });