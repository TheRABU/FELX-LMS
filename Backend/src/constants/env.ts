import "dotenv/config";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const ENV = {
  NODE_ENV: process.env.NODE_ENV ?? "development",

  PORT: Number(process.env.PORT ?? 3000),
  MONGODB_URI: requireEnv("MONGODB_URI"),
  SESSION_SECRET: requireEnv("SESSION_SECRET"),
} as const;
