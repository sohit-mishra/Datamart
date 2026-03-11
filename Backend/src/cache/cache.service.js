import { getRedisClient } from "./redis.client.js";

export const cacheService = {

  async get(key) {
    const redis = getRedisClient();

    const data = await redis.get(key);

    return data ? JSON.parse(data) : null;
  },

  async set(key, value, ttl = 300) {
    const redis = getRedisClient();

    await redis.set(
      key,
      JSON.stringify(value),
      "EX",
      ttl
    );
  },

  async del(key) {
    const redis = getRedisClient();
    await redis.del(key);
  }

};