"use client"

import React,{useState,useTransition} from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { likeTweet } from '@/app/lib/supabase/mutation';
import { toast } from 'sonner';
import { AiOutlineHeart } from 'react-icons/ai';


type LikeButtonProps = {
    tweetId:string; 
    likecount:number | null;
};


const LikeButton = ({tweetId,likecount}:LikeButtonProps) => {

    let [isLikePending, startTransition] = useTransition()
    const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <button 
    disabled={isLikePending}
    onClick={() =>{
    supabase.auth.getUser().then((res)=>{
     if (res.data && res.data.user){
       const user= res.data.user
       startTransition(() => likeTweet({
        tweetId,
        userId:user.id
       }))
     }
     else {
      toast('please log-in in oreder to like')
     }
    }).catch(()=>{
     toast.error('authentication failed')
    });
    
  }} className="rounded-full flex items-center space-x-2 hover:bg-black/20 p-3 transition duration-200 cursor-pointer"> 
          <AiOutlineHeart className="w-5 h-5"/> 
         <span>{likecount?? 0}</span>
   </button>
  )
}

export default LikeButton