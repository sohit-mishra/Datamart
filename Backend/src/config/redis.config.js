import env from './env.config';

const redisConfig = {
    url: env.REDIS_URL,
    options: {
        maxRetriesPerRequest: 3,
        enableReadyCheck: true,
        reconnectOnError: () => true
    },

    ttl: {
        default: 300,
        products: 600
    }
}

export default redisConfig;