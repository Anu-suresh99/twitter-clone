
import ComposeTweet from "./server-components/compose-tweet";
import { getTweet } from "../lib/supabase/getTweet";
import { dayjs } from "dayjs";
import {relativeTime} from dayjs/plugin/relativeTime;
import {Tweet} from "./components/client-components/tweet.tsx";

dayjs.extend (relativeTime)
   

const MainComponent = async() => {
  const res = await getTweet();
return (
    <main className="sticky top-0 flex   xl:w [50%] max-w-[600px] h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-400">
            <h1 className="text-xl font-bold p-6 backdrop-blur bg-white/10 sticky top-0">Home</h1>
            <div className="border-t-[0.5px] px-4 border-b-[0.5px] flex items-stretch py-4 space-x-2 border-gray-600  relative">
              <div className="w-10 h-10 bg-slate-400 rounded-full flex-none"></div>
              <ComposeTweet />
             </div> 
               <div className="flex flex-col ">
                  {
                    res?.error && <div> Something went wrong with the server </div>
                  }
                  {
                    res?.data && res.data.map((_tweet)=>(
                      <Tweet key={_tweet.id} tweet= {tweet}/>
                   ))
                  }
               </div>
            
         </main>
  )
};
 
export default MainComponent