import { seedProducts } from "./product.seed.js";
import logger from "../../utils/logger.js";

const runSeeds = async () => {
  try {
    logger.info("Running seeds...");

    await seedProducts();

    logger.info("Seeding completed");
    process.exit();
  } catch (error) {
    logger.error("Seeding failed", error);
    process.exit(1);
  }
};

runSeeds();