import pg from "pg"

const { Pool } = pg

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? 5432),
  database: process.env.DB_NAME ?? "ecommerce",
  user: process.env.DB_USER ?? "ecommerce",
  password: process.env.DB_PASSWORD ?? "ecommerce"
})
