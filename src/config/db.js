import mysql from "mysql2/promise"; // ✅ this was missing
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import dotenv from "dotenv";

dotenv.config(); // load environment variables

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  ssl: {
    ca: fs.readFileSync(resolve(__dirname, "ca.pem")),
    rejectUnauthorized: true,
  },
  connectTimeout: 10000,
});

export default pool;
