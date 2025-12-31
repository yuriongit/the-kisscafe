import "dotenv/config"; 
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.SUPABASE_URL as string;
const supabaseKey: string = process.env.SUPABASE_ANON_KEY as string;

if (!supabaseKey || !supabaseKey) {
    throw new Error("Missing Supabase env variables");
};

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;