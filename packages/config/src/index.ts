import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  APP_NAME: z.string().default('NexusAI'),
  API_HOST: z.string().default('0.0.0.0'),
  API_PORT: z.coerce.number().default(3001),
  DATABASE_URL: z
    .string()
    .default('postgresql://nexusai:nexusai@localhost:5432/nexusai?schema=public'),
  REDIS_URL: z.string().optional(),
  RABBITMQ_URL: z.string().optional(),
  JWT_SECRET: z.string().min(1).optional(),
  QDRANT_URL: z.string().url().optional(),
});

export type Env = z.infer<typeof envSchema>;

export function parseEnv(input: NodeJS.ProcessEnv = process.env): Env {
  return envSchema.parse(input);
}
