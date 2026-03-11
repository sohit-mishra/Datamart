import Redis from 'ioredis';
import env from '../config/env.config';
import logger from '../utlis/logger';

let redis;

export const initRedis = async () => {
    try {
        redis = new Redis(env.REDIS_URL);
        redis.on('connect', () => {
            logger.info('Redis connected');
        })
        redis.on('error', (err) => {
            logger.error('Redis err', err);
        })

    } catch (error) {
        logger.error('Redis err', err);
        process.exit(1);
    }
}

export const getRedis = () => redis;