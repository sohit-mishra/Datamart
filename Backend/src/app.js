import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import routes from "./routes/index.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import { apiRateLimiter } from "./middlewares/rateLimit.middleware.js";
import { requestLogger } from "./middlewares/requestLogger.middleware.js";
import appConfig from "./config/app.config.js";
import dotenv from "dotenv"

dotenv.config()

const app = express();
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
)
app.use(helmet());
app.use(compression());
app.use(requestLogger);
app.use(apiRateLimiter);
app.use(appConfig.apiPrefix, routes);
app.use(errorMiddleware);

app.get('/',(req,res)=>{
  res.send("hello world")
})

export default app;