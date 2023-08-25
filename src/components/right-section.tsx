import {BsSearch} from "react-icons/bs"


const RightSection  = () => {
  return (
    <div>
    <section className=" mt-2 w-[25%] sticky top2   xl:flex flex-col items-stretch h-[90vh] px-6 hidden">
            <div>
              <div className="sticky top-2 w-full h-full ">
              
              <input
              id="searchBox"
              type="text" 
              placeholder="Search" 
              className="outline-none bg-slate-300 peer focus:border-primary focus:border  w-full h-full rounded-xl py-4 pl-14 pr-4" />
              <label htmlFor="searchBox" className="absolute top-0 left-0 h-full flex items-center justify-center p-4 peer-focus:text-primary">
              <BsSearch className="w-5 h-5" />
              </label>
              </div>
            </div>
            <div className="flex flex-col rounded-xl bg-slate-300 my-4">
                <h3 className="font-bold text-xl my-2 px-4">What’s happening</h3>
                <div>
                  {
                    Array.from({length:5}).map((_,i)=>(
                      <div key={i} className="hover:bg-white/20 p-4 last:rounded-b-xl transition duration-200">
                        <div className="font-bold text-lg">#trending ${i+1}</div>
                        <div className="text-xs text-neutral-500">85.5k</div>
                      </div>
                    ))
                  }
                </div>
            </div>
            <div className="flex flex-col rounded-xl bg-slate-300 my-4">
                <h3 className="font-bold text-xl my-2 px-4">Who to Follow</h3>
              <div>
                {
                  Array.from({length:4}).map((_,i)=>(
                    <div key={i} className="hover:bg-white/20 p-4 space-x-3 flex items-center justify-between last:rounded-b-xl transition duration-200">
                       <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-neutral-600 rounded-full flex-none"></div>
                        <div className="flex flex-col">
                          <div className="font-bold">Users</div>
                          <div className="text-gray-500 text-xs">@users1234</div>
                        </div>
                       </div>
                        <button className="rounded-full px-6 py-2 bg-black text-white">
                           Follow
                        </button>
                    </div>
                  ))
                }
              </div>
            </div>
         </section>
   </div>
  )
}

export default RightSection 