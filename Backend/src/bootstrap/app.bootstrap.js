import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';

import routes from '../routes/index.routes.js';
import errorMiddleware from '../middlewares/error.middleware.js';
import securityMiddleware from "../middlewares/security.middleware.js";


export const createApp = () => {
    const app = express();

    app.use(helmet());
    app.use(cors());
    app.use(express.json({ limit: "10kb" }));
    app.use(express.urlencoded({ extended: true }));
    app.use(compression());
    app.use(morgan('combined'));
    app.use(securityMiddleware);
    app.use('/api/v1', routes);
    app.use(errorMiddleware);
    return app;
}