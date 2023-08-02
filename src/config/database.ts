import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

console.log("NODE_ENV: ", process.env.NODE_ENV);
export const pool: Pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  database:
    process.env.NODE_ENV === "test"
      ? process.env.DB_NAME_TEST
      : process.env.DB_NAME_DEV,
});

