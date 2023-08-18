import { Database } from "../lib/supabase.types";
import { SupabaseClient } from "@supabase/supabase-js";


const supabaseUrl= process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey= process.env.SUPABASE_SECRET_KEY;

export type Tweettype = Database ["public"]["Tables"]["tweet"]["Row"] & {
  Profile : Pick <Database ["public"]["Tables"]["profiles"]["Row"], 'full_name'|'username'>;

export const getTweet= async () => {
    if (supabaseUrl && supabaseSecretKey) {
    const supabaseServer = new SupabaseClient(supabaseUrl,supabaseSecretKey)
  
    return await supabaseServer
    .from('tweet')
    .select(`
      *,
      profiles (
        full_name,
        username
      )
    `)
    .returns < Tweettype[] >();
      }
    };