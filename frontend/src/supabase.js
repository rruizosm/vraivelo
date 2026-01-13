
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("Supabase URL:", supabaseUrl ? "Loaded" : "Missing");
console.log("Supabase Key:", supabaseAnonKey ? "Loaded" : "Missing");

if (!supabaseUrl) console.error("FATAL: VITE_SUPABASE_URL is missing!");


export const supabase = createClient(supabaseUrl, supabaseAnonKey);
