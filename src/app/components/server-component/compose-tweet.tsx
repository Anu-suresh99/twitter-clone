import React from 'react'
import { createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import { Database } from 'lucide-react';
import { cookies,headers} from 'next/headers';
import { randomUUID } from 'crypto';

const ComposeTweet = () => {

    async function submitTweet(formData:FormData) {
        'use server'
   
 const tweet = formData.get("tweet");       
   if(!tweet) return;
   const supabase = createServerComponentClient <Database>({cookies,headers})

   const{data:userData,error:userError}= await supabase.auth.getUser()

   if(userError) return;

   await supabase.from("tweets").insert({
    profiles_id: userData.user.id,
    text: tweet.toString(),
    id: randomUUID()
  });
  

   const {data,error}= supabase.from('tweets').insert({profiles_id: supabase
   })    
}  
  return (
       // temporary fix
        <form action={submitTweet as any} className="flex flex-col w-full h-full">
                
                <input type="text" 
                  className="w-full h-full text-2xl placeholder:text-gray-500 bg-transparent border-b-[0.5px] border-gray-600 outline-none border-none p-4" 
                  placeholder="What is Happening?!" />
             
             <div className="w-full justify-between items-center flex">
                <div></div>
                <div className="w-full max-w-[100px]">
                  <button type= "submit" className="rounded-full  bg-primary px-4 py-2 w-full text-lg text-center hover:bg-opacity-70 transition duration-200 font-bold">
                    Post 
                  </button>
                </div> 
             </div>
           </form>
  )
}

export default ComposeTweet