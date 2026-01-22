import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  db: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.db ??
  new PrismaClient({
    log: ["query"], // Optional: Helpful for debugging in dev
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.db = prisma;
}

export default prisma;
