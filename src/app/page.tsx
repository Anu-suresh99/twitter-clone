
import LeftSidebar from "./components/left-sidebar";
import MainComponent from "./components/main-component";
import RightSection from "./components/right-section";

export const revalidate= 0;

const Home= async() => {
  return (
    <div className="w-full h-full flex justify-center items -center relative" >
     <div className="xl:max-w-[70vm] w-full h-full flex relative ">
         <LeftSidebar />
         <MainComponent />
         <RightSection />
      </div>
   </div>
  )
}

export default Home