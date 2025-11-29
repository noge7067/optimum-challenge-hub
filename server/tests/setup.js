/**
 *  * 🧠 Global Test Setup
  * --------------------------------------------------
   * Loads environment variables, connects test database,
    * and configures any shared utilities before test runs.
     */

     import dotenv from "dotenv";
     dotenv.config({ path: "./server/.env" });

     beforeAll(async () => {
       console.log("🧪 Bootstrapping Optimum Challenge Hub test environment...");
       });

       afterAll(async () => {
         console.log("🧹 Cleaning up after tests...");
         });