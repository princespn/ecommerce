import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

// Loads your environment variables from the root .env file
dotenv.config();

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schemas/index.js",
  dialect: "mysql",
  dbCredentials: {
    // Dynamic fallback in case your local environment doesn't specify DATABASE_URL
    url: process.env.DATABASE_URL || "mysql://root:admin123@localhost:3306/risk_care_2",
  },
});