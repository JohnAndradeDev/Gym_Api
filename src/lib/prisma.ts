import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";
import { env } from "@/env";

const connectionString = process.env.DATABASE_URL!;
export const schema: string =
  new URL(connectionString).searchParams.get("schema") ?? "public";

const adapter = new PrismaPg({ connectionString }, { schema });

export const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === "dev" ? ["query"] : [],
});
