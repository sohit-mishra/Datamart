import "../src/config/env.config.js";
import { seedProducts } from "../src/database/seeds/product.seed.js";
import logger from "../src/utils/logger.js";

const runSeed = async () => {

    try {
        logger.info("Starting seed process...");
        await seedProducts();
        logger.info("Seed completed");
        process.exit(0);
    } catch (error) {
        logger.error("Seed failed", error);
        process.exit(1);
    }
};

runSeed();