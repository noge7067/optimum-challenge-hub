// server/prisma-client.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server/.env
dotenv.config({ path: path.join(path.resolve(), 'server', '.env') });

// Ensure DATABASE_URL is defined
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) throw new Error('❌ DATABASE_URL is missing in server/.env');

// Detect CA certificate automatically

// Initialize PostgreSQL adapter with SSL
const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false  // <-- accept Supabase SSL
              },
              });

// Initialize Prisma Client with adapter
export const prisma = new PrismaClient({ adapter });