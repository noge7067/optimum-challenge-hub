import dotenv from 'dotenv';
import path from 'node:path';
import { defineConfig, env } from 'prisma/config';

// Load .env explicitly from server folder
dotenv.config({ path: path.resolve(process.cwd(), 'server', '.env') });

export default defineConfig({
  schema: path.join('server', 'prisma', 'schema.prisma'),
    migrations: {
        path: path.join('server', 'prisma', 'migrations'),
            seed: 'ts-node server/prisma/seed.ts',
              },
                datasource: {
                    url: env('DATABASE_URL'), // Now prisma can see it
                      },
                      });