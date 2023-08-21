"use server";

import { randomUUID } from "crypto";
import { supabaseServer } from ".";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { likes, replies, tweets } from "../db/schema";
import { revalidate } from "@/app/page";

export const likeTweet = async({
  tweetId,
  userId
}:{
  tweetId:string,
  userId:string
}) => {

  
  const {data,error}= await supabaseServer.from('likes').insert({
       id:randomUUID,
       tweetid:tweetId,
       userid:userId
    })
    revalidatePath ('/')
    console.log({data,error});
  };


  export const unlikeTweet = async({
    tweetId,
    userId
  }:{
    tweetId:string,
    userId:string
  }) => {
    const {data,error}= await supabaseServer
    .from('likes')
    .delete()
    .eq('tweetid',tweetId)
    .eq('userid',userId)
    revalidatePath ('/')
    console.log({data,error});
    };

export const reply = async ({
  tweetId,
  userId,
  replyText,
}: {
  tweetId: string;
  userId: string;
  replyText: string;
}) => {
  // you can verify/check the replyText is truthy

  if (replyText === "") return;

  await db.insert(tweets).values({
    text: replyText,
    profileId: userId,
    isReply: true,
    replyId: tweetId,
  });

  revalidatePath(`/tweet/[id]`);
};
