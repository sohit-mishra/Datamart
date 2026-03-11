import Redis from 'ioredis';
import env from '../config/env.config.js';
import logger from "../utils/logger.js";

let redisClient;

export const initRedisClient = () => {
    redisClient = new Redis(env.REDIS_URL, {
        maxRetriesPerRequest: 3,
        enableReadyCheck: true,
        reconnectOnError: () => true,
    });

    redisClient.on('connect', () => {
        logger.info('Redis connected');
    });

    redisClient.on('error', (err) => {
        logger.error('Redis error', err);
    })

    return redisClient;
}

export const getRedisClient = () => redisClient;