import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schemas from "./../db/schemas/index.js";

dotenv.config();

const poolConnection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const db = drizzle({
  client: poolConnection,
  schema: schemas,
  mode: "default",
});
  
async function main() {
  try {
    const connection = await poolConnection.getConnection();
    console.log("MySQL Connected Successfully");
  } catch (err) {
    console.error("MySQL Connection Error:", err);
    process.exit(1);
  }
}
main();

export default db;
