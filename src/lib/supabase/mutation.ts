"use server";

import { supabaseServer } from ".";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { like, tweet } from "../db/schema";

export const likeTweet = async ({
  tweetId,
  userId
}: {
  tweetId: string,
  userId: string
}) => {
  const res = await db.insert(like).values({

    tweetId,
    userId
  }).catch((err) => {
    console.log(err)
  })
  revalidatePath('/')
};


export const unlikeTweet = async ({
  tweetId,
  userId
}: {
  tweetId: string,
  userId: string
}) => {
  const { data, error } = await supabaseServer
    .from('likes')
    .delete()
    .eq('tweetid', tweetId)
    .eq('userid', userId)
  revalidatePath('/')
  console.log({ data, error });
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

  await db.insert(tweet).values({
    text: replyText,
    profileId: userId,
    isReply: true,
    replyId: tweetId,
  });

  revalidatePath(`/tweet/[id]`);
};
