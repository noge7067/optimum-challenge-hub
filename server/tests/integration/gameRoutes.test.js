/**
 *  * INTEGRATION TEST — Game Routes
  * --------------------------------------------------
   * Tests real game route logic with RLNC-powered endpoints.
    */

    import request from "supertest";
    import app from "../../src/index.js";

    describe("🚀 Game Routes — Integration", () => {
      test("POST /api/game/start → should initialize game", async () => {
          const res = await request(app)
                .post("/api/game/start")
                      .send({ playerId: "test-player-99", mode: "challenge" })
                            .expect("Content-Type", /json/)
                                  .expect(201);

                                      expect(res.body.success).toBe(true);
                                          expect(res.body.sessionId).toBeDefined();
                                            });

                                              test("POST /api/game/packet → should handle RLNC packet correctly", async () => {
                                                  const res = await request(app)
                                                        .post("/api/game/packet")
                                                              .send({
                                                                      sessionId: "session-xyz",
                                                                              packet: { symbol: [10, 20, 30], coefficients: [1, 1, 0] },
                                                                                    })
                                                                                          .expect("Content-Type", /json/)
                                                                                                .expect(200);

                                                                                                    expect(res.body).toHaveProperty("updatedState");
                                                                                                      });
                                                                                                      });