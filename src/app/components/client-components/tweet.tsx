import React from 'react'
import { BiChat, BiMessageRounded } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import {IoMdStats} from 'react-icons/io';
import {FiShare} from 'react-icons/fi';
import { BsDot, BsThreeDots } from "react-icons/bs";
import { dayjs } from "dayjs";
import { TweetType } from '@/app/lib/supabase/queries';

type TweetProps= {
    tweet:TweetType
}
const Tweet = ({tweet}:TweetProps) => {
  return (
    <div key={tweet.id} className="border-b-[0.5px] p-4 border-gray-600 flex space-x-4 w-full overflow-hidden">
                         <div>
                          <div className="w-10 h-10 bg-slate-500 rounded-full"/>
                         </div>
                         <div>
                         <div className="flex flex-col space-y-2">
                           <div className="flex items-center w-full justify-between">
                            <div className="flex items-center space-x-1 w-full">
                             <div className="font-bold">{tweet.Profile.full_name ??""}</div>
                             <div className="text-gray-500">@{tweet.Profile.username }</div>
                             <div className="text-gray-500">
                               < BsDot />
                             </div>
                             <div className="text-gray-500">
                              {dayjs(tweet.created_at).fromNow()}
                             </div>
                             </div>
                             <div>
                               <BsThreeDots />
                             </div>
                           </div>
                           </div>
                           <div className="text-black text-base">
                               {tweet.text}
                           </div>
                           <div className="bg-slate-300 aspect-square w-full h-80 rounded-xl"></div>
                           <div className="flex items-center justify-around w-full">
                             <div className="rounded-full hover:bg-black/20 p-3 transition duration-200 cursor-pointer"> 
                                    <BiMessageRounded /> 
                             </div>
                             <div className="rounded-full hover:bg-black/20 p-3 transition duration-200 cursor-pointer"> 
                                    <AiOutlineRetweet /> 
                             </div>
                             <div className="rounded-full hover:bg-black/20 p-3 transition duration-200 cursor-pointer"> 
                                    <AiOutlineHeart /> 
                             </div>
                             <div className="rounded-full hover:bg-black/20 p-3 transition duration-200 cursor-pointer"> 
                                    <IoMdStats /> 
                             </div>
                             <div className="rounded-full hover:bg-black/20 p-3 transition duration-200 cursor-pointer"> 
                                    <FiShare /> 
                             </div>
                           </div>
                         </div> 
                      </div>
  )
}

export default Tweet