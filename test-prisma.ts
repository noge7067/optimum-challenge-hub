// test-prisma.ts
import prisma from "/workspaces/optimum-challenge-hub/client/lib/prisma.ts"; // correct for TS

async function main() {
  try {
      const count = await prisma.user.count(); // make sure "user" model exists
          console.log("Total users:", count);
            } catch (e) {
                console.error("Prisma test error:", e);
                  } finally {
                      await prisma.$disconnect();
                        }
                        }

                        main();
