import LeftSidebar from "./components/LeftSidebar";
import MainComponent from "./components/MainComponent";
import RightSection from "./components/RightSection ";


const Home= () => {
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