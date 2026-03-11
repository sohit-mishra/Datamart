import cron from "node-cron";
import { getRedisClient } from "../cache/redis.client.js";
import logger from "../utils/logger.js";

export const startCacheCleanupJob = () => {

  cron.schedule("0 */6 * * *", async () => {
    try {

      const redis = getRedisClient();

      const keys = await redis.keys("products:*");

      if (keys.length > 0) {
        await redis.del(keys);
      }

      logger.info("Cache cleanup job executed");

    } catch (error) {
      logger.error("Cache cleanup job failed", error);
    }

  });

};