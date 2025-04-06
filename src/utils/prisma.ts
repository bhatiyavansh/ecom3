import { PrismaClient } from "@prisma/client";

declare global {
  // Prevent multiple Prisma Client instances in development
  var prisma: PrismaClient | undefined;
}

export const prisma =
  globalThis.prisma ??
  new PrismaClient({
    log: ["query", "error", "warn"], // Optional: logs for debugging
  });

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
