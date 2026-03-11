import app from "./app.js";
import env from "./config/env.config.js";
import logger from "./utils/logger.js";


const startServer = async () => {
    try {
        app.listen(env.PORT, () => {
            console.log(`🚀 Server running on port http://localhost:${env.PORT}`);
        });
    } catch (error) {
        logger.error("Server startup failed", error);
        process.exit(1);
    }
};

startServer();