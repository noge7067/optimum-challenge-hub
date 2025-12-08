import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
      db: {
            url: process.env.DATABASE_URL, // your Supabase URL here
                },
                  },
                  });

                  export default prisma;