import React from 'react'
import { createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import { cookies,headers} from 'next/headers';
import { randomUUID } from 'crypto';
import { AnyARecord } from 'dns';
import {SupabaseClient} from "@supabase/supabase-js";
import { revalidatePath } from 'next/cache';
import ComposeTweetForm from '../client-components/compose-tweet-form';
import { db } from '@/app/lib/db';
import { tweet } from '@/app/lib/db/schema';

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

   let err= ' '
    
const res= await db.insert(tweet).values({
    text:tweet.tostring(),
    id: randomUUID,
    profileId:userData.user.id
  }).returning().catch((error) =>{
    console.log(error)
    err=  "something wrong with server"
  })


  console.log(res)
  revalidatePath('/')

   return  {data:res,error:err};  
}  
  return ( <ComposeTweetForm serverAction={submitTweet} />);
};

export default ComposeTweet