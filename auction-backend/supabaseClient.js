// supabaseClient.js
import dotenv from 'dotenv';
dotenv.config(); // Ensure this is at the very top

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Supabase URL or Key is missing in the environment variables.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export { supabase };
