import React from 'react'
import { createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import { cookies,headers} from 'next/headers';
import { randomUUID } from 'crypto';
import { AnyARecord } from 'dns';
import {SupabaseClient} from "@supabase/supabase-js";
import { revalidatePath } from 'next/cache';
import ComposeTweetForm from '../client-components/compose-tweet-form';

const ComposeTweet = () => {

    async function submitTweet(formData:FormData) {
        'use server'
   
 const tweet = formData.get("tweet");       
   if(!tweet) return;

   const SupabaseClient = createServerComponentClient {{ cookies,headers}};

  const supabaseUrl= process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseSecretKey= process.env.SUPABASE_SECRET_KEY;

  if(!supabaseSecretKey|| !supabaseSecretKey)
      return{error:(message:"supabase credentials not provided")};

   const supabaseServer = new SupabaseClient(supabaseUrl,supabaseSecretKey)

   const{data:userData,error:userError}= await SupabaseClient.auth.getUser()

   if(userError) return;
    

   const {data,error} = await supabaseServer.from("tweets").insert({
    profiles_id: userData.user.id,
    text: tweet.toString(),
    id: randomUUID()
  });

  revalidatePath('/')

   return  {data,error};  
}  
  return ( <ComposeTweetForm serverAction={submitTweet} />);
};

export default ComposeTweet