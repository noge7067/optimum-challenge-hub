// server/diagnose-prisma.ts
import { prisma } from './prisma-client.ts';
import dotenv from 'dotenv';
import path from 'node:path';

// Load env just in case
dotenv.config({ path: path.join(path.resolve(), 'server', '.env') });

async function main() {
  try {
      const result = await prisma.$queryRaw`SELECT NOW()`;
          console.log('✅ Database connected! Current time:', result);
            } catch (err) {
                console.error('❌ Prisma query failed:', err);
                  } finally {
                      await prisma.$disconnect();
                        }
                        }

                        main();