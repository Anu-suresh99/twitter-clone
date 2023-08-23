
import { replies, tweet } from '@/app/lib/db/schema'; 
import React from 'react'
import { db } from '@/app/lib/db'
import Tweet from '@/app/components/client-components/tweet'
import {createServerComponentSupabaseClient} from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { profiles} from '@/app/lib/db/schema';
import { exists, param } from 'drizzle-orm';
import { like } from '@/app/lib/db/schema';
import { tweetsReplies } from '@/app/lib/db/schema';
import { eq } from 'drizzle-orm';
import { tweets } from '../../../../migrations/schema';
import { getTweets } from '@/app/lib/supabase/queries';
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs";
import { AiOutlineRetweet } from "react-icons/ai";
import { IoShareOutline, IoStatsChart } from "react-icons/io5";
import LikeButton from '@/app/components/client-components/like-button';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ReplyDialog from '@/app/components/client-components/reply-dialog';
import { useRouter } from "next/navigation";
import { TweetType,getLikesCount, isLiked } from "@/app/lib/supabase/queries";

const TweetPage = ({Params}:{Params:{id:string}}) => {

const supabaseClient = createServerComponentSupabaseClient({
cookies,
headers,
});
const { data: userData, error: userError } = await supabaseClient.auth.getUser();

const tweet= await getTweets(userData.user?.id,params.id)

const repliesRes = await db.query.replies.findMany({
with:{
profile:true,
},
where: eq(replies.tweetId,Params.id)
});

return (
<main className="flex w-full h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
{tweet?<Tweet
hasLiked={Boolean(tweet[0].hasLiked)}
likesCount={tweet[0].likes.length??0}
tweet={{
tweetDetails: tweet[0].tweet,
userProfile: tweet[0].profile
}}
currentUserId={userData.user?.id}
/>:<div>no tweet found</div>}
{
repliesRes.map((reply)=>(
<div key={reply.id} className="border-b-[0.5px] border-gray-600 p-2 flex space-x-4 w-full">
<div className="flex flex-col w-full">
<div className="flex items-center w-full justify-between">
<div className="flex items-center space-x-1 w-full">
<div className="font-bold">
{reply.profile.fullName ?? ""}
</div>
<div className="text-gray-500">
<BsDot />
</div>
</div>
<div>
<BsThreeDots />
</div>
</div>
<div
className="text-white text-base w-full cursor-pointer hover:bg-white/5 transition-all"
>
{reply.text}
</div>
</div>
</div>
))
}
</main>
)
}

export default TweetPage