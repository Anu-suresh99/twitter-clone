"use server"


import { Database } from "@/lib/supabase.types";
import { supabaseServer } from ".";
import pool from "pg-pool";
import { db } from "../db";
import { profiles, tweet } from "../db/schema";
import { likes } from "../../../../migrations/schema";
import { equal } from "assert";
import { profile } from "console";
import { desc, eq } from "drizzle-orm";

const supabaseUrl= process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey= process.env.SUPABASE_SECRET_KEY;

export type Tweettype = Database ["public"]["Tables"]["tweet"]["Row"] & {
  Profile : Pick <Database ["public"]["Tables"]["profiles"]["Row"], 'full_name'|'username'>; 
};


//const querywithCurentUserId=
//`SELECT tweet.*,profile.username , profile.full_name , COUNT(likeid) AS likecount
//EXISTS (
 //SELECT 1
 //FROM like
 //WHERE like.tweetid = tweet.id
 //AND like.userid = $1
//)AS userhasliked
//FROM tweet
//LEFT JOIN like ON tweet.id = like.tweetid
//JOIN profile ON tweet.profileid = profile.id
//GROUP BY  tweet.id
//ORDER BY tweet.created_at DESC;
//`;

//const querywithoutCurrentUserID= 
//'SELECT tweet.*,profile.username , profile.full_name , COUNT(likeid) AS likecount
  //FROM tweet
  //LEFT JOIN like ON tweet.id = like.tweetid
  //JOIN profile ON tweet.profileid = profile.id
 // GROUP BY  tweet.id
 // ORDER BY tweet.created_at DESC;
//';

export const getTweet= async (currentUserId?:string) => {

try{

//const res= await db.query.tweet.findMany({
 // with:{
   // profile: {
   //   columns:{
    //    username:true,
    //    fullName:true
   //   },
   // },
 // },
//});


let err
console.log(currentUserId);
const res= (await db
  .select()
  .from (tweet)
  .leftJoin(likes,eq(tweet.id,likes.tweetId)))
  .innerJoin(profiles,eq(tweet.profileId,profile.id))
  .orderBy(desc(tweet.createdAt))
  .limit(1)
  .catch(()=>{
    err="something went wrong while fethching all the tweet"
  })

   return {data:res,error:err};
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