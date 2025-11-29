/**
 *  * UNIT TEST — Game Service
  * --------------------------------------------------
   * Pure logic tests for RLNC-enhanced gameplay.
    */

    import { startGame, processPacket } from "../../src/services/gameService.js";

    describe("🎮 Game Service — RLNC-Powered Logic", () => {
      test("should start a new game session correctly", async () => {
          const game = await startGame("player-001", "standard");
              expect(game).toHaveProperty("sessionId");
                  expect(game.mode).toBe("standard");
                    });

                      test("should process RLNC packets and return new state", async () => {
                          const mockPacket = { symbol: [1, 2, 3], coefficients: [1, 0, 1] };
                              const res = await processPacket("session-01", mockPacket);
                                  expect(res).toHaveProperty("updatedState");
                                    });
                                    });