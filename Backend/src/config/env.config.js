import dotenv from "dotenv";
import { cleanEnv, str, port, url } from "envalid";

dotenv.config();

const env = cleanEnv(process.env, {
  NODE_ENV: str({ default: "development" }),

  PORT: port({ default: 5000 }),

  SUPABASE_URL: url(),
  SUPABASE_SERVICE_KEY: str(),

  JWT_SECRET: str(),
  JWT_EXPIRES: str({ default: "7d" })
});

export default env;