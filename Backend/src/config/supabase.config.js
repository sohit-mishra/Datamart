import { createClient } from '@supabase/supabase-js';
import env from './env.config.js';

const supabase = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_KEY,
  {
    auth: {
      persistSession: false
    }
  }
);

export default supabase;