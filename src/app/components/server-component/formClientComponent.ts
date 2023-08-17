'use client'

import { createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import React from 'react'
import { PostgrestError } from '@supabase/supabase-js';
import { input} from "@node_modules/input";
import {toast} from "sonner";


type FormClientComponentProps={
serverAction:{
  formdata:FormData
} => Promise<
  |{error:{message:string};data?:undefined} 
  |{data:null;error:PostgrestError|null}
  |undefined
>;
};

const FormClientComponent = ({ serverAction }: FormClientComponentProps) => {
  const handleSubmitTweet = async (data: any) => {
    const res = await serverAction(data);

    if (res && res.error) {
      toast.error(res.error.message);
    } else {
      toast.success("Tweet sent successfully");
    }
  };
  return (
    // temporary fix
  <form 
    action= {handleSubmitTweet as any}
    className="flex flex-col w-full h-full">
            
            <input 
             type="text" className="w-full h-full text-2xl placeholder:text-gray-500 bg-transparent border-b-[0.5px] border-gray-600 outline-none border-none p-4" 
            placeholder="What is Happening?!" />
         
         <div className="w-full justify-between items-center flex">
            <div></div>
            <div className="w-full max-w-[100px]">
              <button type= "submit" className="rounded-full  bg-primary px-4 py-2 w-full text-lg text-center hover:bg-opacity-70 transition duration-200 font-bold">
                Tweet 
              </button>
            </div> 
         </div>
  </form>
  )


export default FormClientComponent