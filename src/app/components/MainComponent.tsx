import { BiChat, BiMessageRounded } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import {IoMdStats} from 'react-icons/io';
import {FiShare} from 'react-icons/fi';
import { BsDot, BsThreeDots } from "react-icons/bs";
import ComposeTweet from "./server-component/compose-tweet";

const MainComponent = () => {




  
  return (
    <main className="sticky top-0 flex   xl:w [50%] max-w-[600px] h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-400">
            <h1 className="text-xl font-bold p-6 backdrop-blur bg-white/10 sticky top-0">Home</h1>
            <div className="border-t-[0.5px] px-4 border-b-[0.5px] flex items-stretch py-4 space-x-2 border-gray-600  relative">
              <div className="w-10 h-10 bg-slate-400 rounded-full flex-none"></div>
              <ComposeTweet />
             </div> 
               <div className="flex flex-col ">
                  {
                    Array.from ({length:5}).map((_,i)=>(
                      <div key={i} className="border-b-[0.5px] p-4 border-gray-600 flex space-x-4 w-full overflow-hidden">
                         <div>
                          <div className="w-10 h-10 bg-slate-500 rounded-full"/>
                         </div>
                         <div>
                         <div className="flex flex-col space-y-2">
                           <div className="flex items-center w-full justify-between">
                            <div className="flex items-center space-x-1 w-full">
                             <div className="font-bold">Mathrubhumi News</div>
                             <div className="text-gray-500">@mathrubhuminews</div>
                             <div className="text-gray-500">
                               < BsDot />
                             </div>
                             <div className="text-gray-500">1hr ago</div>
                             </div>
                             <div>
                               <BsThreeDots />
                             </div>
                           </div>
                           </div>
                           <div className="text-black text-base">
                               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque minima ullam maxime harum, natus aliquam facere atque quod repellendus sint, qui architecto ea facilis officia reprehenderit consectetur. Hic, eveniet voluptatibus?
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
                    ))
                  }
               </div>
            
         </main>
  )
}

export default MainComponent