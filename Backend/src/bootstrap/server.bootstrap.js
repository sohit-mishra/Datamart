import http from 'http';
import {createApp} from './app.bootstrap.js';
import env from '../config/env.config.js';
import logger from '../utlis/logger.js';

export const startServer = ()=>{
    const app = createApp();

    const server = http.createServer(app);
    server.listen(env.PORT,()=>{
        logger.info(`Server Running on port http://localhost:${env.PORT}`);
    });

    process.on('unhandledRejection',(err)=>{
        logger.error('Unhandled Rejection',err);
    })

    process.on('uncaughtException',(err)=>{
        logger.error("Uncaught Exception", err);
        process.exit(1);
    });
}