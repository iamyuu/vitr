import { z } from 'zod';
import { createTypedEnv } from '~/utils/typed-env';

const envSchema = z.object({
  MODE: z.enum(['development', 'test', 'staging', 'production']).default('development'),
  VITE_API_URL: z.string().default('http://localhost:8080'),
  VITE_SENTRY_DSN: z.string().optional(),
  VITE_SENTRY_RELEASE: z.string().optional().default('dev'),
});

export const env = createTypedEnv(envSchema.parse)(import.meta.env);

export const isBrowser = typeof window !== 'undefined';
