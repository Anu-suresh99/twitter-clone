"use server"


import { Database } from "@/lib/supabase.types";
import { supabaseServer } from ".";
import pool from "pg-pool";

const supabaseUrl= process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey= process.env.SUPABASE_SECRET_KEY;

export type Tweettype = Database ["public"]["Tables"]["tweet"]["Row"] & {
  Profile : Pick <Database ["public"]["Tables"]["profiles"]["Row"], 'full_name'|'username'>; 
};


const querywithCurentUserId=
`SELECT tweet.*,profile.username , profile.full_name , COUNT(likeid) AS likecount
EXISTS (
 SELECT 1
 FROM like
 WHERE like.tweetid = tweet.id
 AND like.userid = $1
)AS userhasliked
FROM tweet
LEFT JOIN like ON tweet.id = like.tweetid
JOIN profile ON tweet.profileid = profile.id
GROUP BY  tweet.id
ORDER BY tweet.created_at DESC;
`;

const querywithoutCurrentUserID= 
'SELECT tweet.*,profile.username , profile.full_name , COUNT(likeid) AS likecount
  FROM tweet
  LEFT JOIN like ON tweet.id = like.tweetid
  JOIN profile ON tweet.profileid = profile.id
  GROUP BY  tweet.id
  ORDER BY tweet.created_at DESC;
';

export const getTweet= async (currentUserId?:string) => {

let query= pool.query(querywithoutCurrentUserID);

if(currentUserId){
  query=pool.query(querywithCurentUserId,[currentUserId]);
}

try{

const res= await query; 
return {data:res.rows}
}catch (error) {
  return {error:'something wrong with quering the db'}
}
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
      userId?:string
    }) => {

      if(!userId)  return false;
      const{data,error}=await supabaseServer
      .from ('like')
      .select("id")
      .eq('tweetid',tweetId)
      .eq("userid",userId)
      .single()


     return Boolean(data?.id)
    };