import { createClient } from "@supabase/supabase-js";
import env from '../config/env.config.js';
import logger from '../utlis/logger.js';

let supabase;

export const intiDatabase = ()=>{
    try {
        supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
        logger.info('Supabase database connected');
    } catch (error) {
        logger.error("Database connection failed", error);
        process.exit(1);
    }
}

export const getDB = ()=> supabase;