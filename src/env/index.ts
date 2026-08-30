import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"), //enum quer dizer uma opção entre outras, caso nenhuma ai por padrão é dev.
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333), //converte o valor para um número.
});

const _env = envSchema.safeParse(process.env); //validação das variáveis ambientes de acordo com o envSchema.

if (_env.success == false) {
  console.error("Invalid environment!", z.treeifyError(_env.error));

  throw new Error("Invalid environment variables."); // a partir o throw nenhum código roda
}

export const env = _env.data;
