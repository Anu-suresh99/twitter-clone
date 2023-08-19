"use server"


import { Database } from "@/lib/supabase.types";
import { supabaseServer } from ".";

const supabaseUrl= process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey= process.env.SUPABASE_SECRET_KEY;

export type Tweettype = Database ["public"]["Tables"]["tweet"]["Row"] & {
  Profile : Pick <Database ["public"]["Tables"]["profiles"]["Row"], 'full_name'|'username'>; 
};

export const getTweet= async () => {
 return await supabaseServer
    .from('tweet')
    .select(`
      *,
      profiles (
        full_name,
        username
      )
    `
    )
    .returns < Tweettype[] >();
      };

    export const getLikeCount = async (tweetId:string)=> {
      const res= await supabaseServer
      .from ('like')
      .select("id",{
        count:"exact",
      })
      .eq('tweetid',tweetId)

      return res;
    };

    export const isLiked = async ({tweetId,userId}:{
      tweetId:string,
      userId:string
    }) => {
      return await supabaseServer
      .from ('like')
      .select("id")
      .eq('tweetid',tweetId)
      .eq("userid",userId)
    }