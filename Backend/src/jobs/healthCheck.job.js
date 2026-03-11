import cron from "node-cron";
import logger from "../utils/logger.js";
import { getRedisClient } from "../cache/redis.client.js";

export const startHealthCheckJob = () => {

  cron.schedule("*/5 * * * *", async () => {

    try {

      const redis = getRedisClient();
      await redis.ping();

      logger.info("System health check OK");

    } catch (error) {
      logger.error("Health check failed", error);
    }

  });

};