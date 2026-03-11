import app from "./app.js";
import env from "./config/env.config.js";
import logger from "./utils/logger.js";
import { initRedisClient } from "./cache/redis.client.js";
import { startJobs } from "./jobs/index.jobs.js";


const startServer = async () => {
    try {
        initRedisClient();
        startJobs();
        app.listen(env.PORT, () => {
            console.log(`🚀 Server running on port http://localhost:${env.PORT}`);
        });
    } catch (error) {
        logger.error("Server startup failed", error);
        process.exit(1);
    }
};

startServer();