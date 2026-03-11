import supabase from "../config/supabase.config.js";
import logger from "../utils/logger.js";

export const getDatabase = () => {
  try {
    logger.info("Database ready");
    return supabase;
  } catch (error) {
    logger.error("Database initialization failed", error);
    throw error;
  }
};