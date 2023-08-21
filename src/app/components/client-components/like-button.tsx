"use client"

import React,{useState,useTransition} from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { likeTweet, unlikeTweet } from '@/app/lib/supabase/mutation';
import { toast } from 'sonner';
import { AiOutlineHeart,AiFillHeart } from 'react-icons/ai';
import { cn } from '@/app/lib/utils';


type LikeButtonProps = {
    tweetId:string; 
    likecount:number | null;
    isUserHasLiked : Boolean
};


const LikeButton = ({tweetId,likecount,isUserHasLiked}:LikeButtonProps) => {

    let [isLikePending, startTransition] = useTransition()
    const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <button 
    disabled={isLikePending}
    onClick={() =>{
    supabase.auth.getUser().then((res)=>{
     if (res.data && res.data.user){
       const user= res.data.user;
       startTransition(() => 
       isUserHasLiked ? unlikeTweet({
        tweetId,
        userId : user.id,
       })
       :likeTweet{{
        tweetId,
        userId :user.id,
       }}
       );
     } else {
      toast('please log-in in oreder to like');
     }
    }).catch(()=>{
     toast.error('authentication failed');
    });
    
  }} 
   <className="rounded-full flex items-center space-x-2 hover:bg-black/20 p-3 transition duration-200 cursor-pointer"> 
         {isUserHasLiked?  (<AiFillHeart className="w-5 h-5, text-red-600"/>): (<AiOutlineHeart className="w-5 h-5"/>)}
         <span>{likecount?? 0}</span>
   </button>
  );
};
export default LikeButton