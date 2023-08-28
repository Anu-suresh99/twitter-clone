import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

import { revalidatePath } from "next/cache";
import ComposeTweetForm from "../../../src/components/client-components/compose-tweet-form";
import { db } from "../../lib/db";
import { tweet as dbTweet } from "../../lib/db/schema";

const ComposeTweet = () => {
  async function submitTweet(formData: FormData) {
    "use server";

    const tweet = formData.get("tweet");

    if (!tweet) return;

    const supabaseClient = createServerComponentClient({
      cookies,
    });

    const { data: userData, error: userError } =
      await supabaseClient.auth.getUser();

    if (userError) return;

    let err = "";
    console.log('userData', userData)
    const res = await db
      .insert(dbTweet)
      .values({
        text: tweet.toString(),
        id: randomUUID(),
        profileId: userData.user.id,
      })
      .returning()
      .catch((error) => {
        console.log(error);
        err = "something wrong with server";
      });

    revalidatePath("/");

    return { data: res, error: err };
  }

  return <ComposeTweetForm serverAction={submitTweet} />;
};

export default ComposeTweet;
