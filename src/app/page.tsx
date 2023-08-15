import { Database } from "@/lib/supabase";
import LeftSidebar from "./components/LeftSidebar";
import MainComponent from "./components/MainComponent";
import RightSection from "./components/RightSection ";
import createServerComponentSupabaseClient from "@supabase/auth-helpers-nextjs";
import {headers,cookies} from "next/headers"

const Home= async() => {

  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })

  const {data,error} = await supabase.auth.getUser()

  console.log({data,error});

  return (
    <div className="w-full h-full flex justify-center items -center relative" >
      <div className="max-w-[70vm] w-full h-full flex relative ">
         <LeftSidebar />
         <MainComponent />
         <RightSection />
      </div>
   </div>
  )
}

export default Home