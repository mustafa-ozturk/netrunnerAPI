import { MigrationConfig } from "drizzle-orm/migrator";

type Config = {
  api: APIConfig;
  db: DBConfig;
  jwt: JWTConfig;
};

type APIConfig = {
  port: number;
  platform: string;
};

type DBConfig = {
  url: string;
  migrationConfig: MigrationConfig;
};

type JWTConfig = {
  defaultDuration: number;
  refreshDuration: number;
  secret: string;
  issuer: string;
};

process.loadEnvFile();

const envOrThrow = (key: string) => {
  const val = process.env[key];
  if (!val) {
    throw new Error(`No ${key} found in .env`);
  }

  return val;
};

const migrationConfig: MigrationConfig = {
  migrationsFolder: "./src/db/migrations",
};

export const config: Config = {
  api: {
    port: Number(envOrThrow("PORT")),
    platform: envOrThrow("PLATFORM"),
  },
  db: {
    url: envOrThrow("DB_URL"),
    migrationConfig: migrationConfig,
  },
  jwt: {
    defaultDuration: 60 * 60, // 1 hour in seconds
    refreshDuration: 60 * 60 * 24 * 60 * 1000, // 60 days in milliseconds
    secret: envOrThrow("JWT_SECRET"),
    issuer: "chirpy",
  },
};
