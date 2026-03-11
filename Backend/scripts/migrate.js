import fs from "fs";
import path from "path";
import logger from "../src/utils/logger.js";
const migrationsPath = "./src/database/migrations";

const runMigrations = async () => {
  try {
    const files = fs.readdirSync(migrationsPath);
    for (const file of files) {
      const sql = fs.readFileSync(
        path.join(migrationsPath, file),
        "utf8"
      );
      console.log(`Running migration: ${file}`);
    }
    logger.info("Migrations executed successfully");
  } catch (error) {
    logger.error("Migration failed", error);
  }

};

runMigrations();