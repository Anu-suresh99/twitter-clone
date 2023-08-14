import {BiHomeCircle} from 'react-icons/bi'
import {AiOutlineSearch} from 'react-icons/ai'
import {PiBellLight} from 'react-icons/pi'
import {CiMail} from 'react-icons/ci'
import {RiFileListLine} from 'react-icons/ri'
import {BsBookmark, BsTwitter,BsThreeDots} from 'react-icons/bs'
import {RiGroupLine} from 'react-icons/ri'
import {GoVerified} from 'react-icons/go'
import {BsPerson} from 'react-icons/bs'
import {CgMoreO} from 'react-icons/cg'
import Link from 'next/link'

const NAVIGATION_ITEMS=[
    {
      title:'Twitter',
      icon: BsTwitter
    },
    {
      title: 'Home',
      icon: BiHomeCircle
    },
    {
      title: 'Explore',
      icon: AiOutlineSearch
    },
    {
      title: 'Notification',
      icon: PiBellLight
    },
    {
      title: 'Message',
      icon: CiMail
    },
    {
      title: 'Lists',
      icon: RiFileListLine
    },
    {
      title: 'Bookmarks',
      icon: BsBookmark
    },
    {
      title: 'Communities',
      icon: RiGroupLine
    },
    {
      title: 'Verified',
      icon: GoVerified
    },
    {
      title: 'Profile',
      icon: BsPerson
    },
    {
      title: 'More',
      icon: CgMoreO
    }
]

const leftsidebar = () => {
  return (
    <section className="sticky top-0 w-[25%] flex flex-col items-stretch h-screen px-4">
              <div className="flex flex-col items-stretch h-full space-y-4 mt-4">
              {NAVIGATION_ITEMS.map ((item)=>(
                  <Link className="hover:bg-white/30 text-2xl transition duration-200 flex items-center justify-start w-fit space-x-4 rounded-3xl py-2 px-6" 
                   href= {`/${item.title.toLowerCase()}`}key={item.title}>
                     <div>
                       <item.icon />
                     </div>
                     {item.title !== "Twitter" &&<div>{item.title}</div>}
                  </Link>
                  )
                )
              } 
              <button className="rounded-full  bg-primary p-4 text-2xl text-center hover:bg-opacity-70 transition duration-200">
                Post
              </button> 
              </div> 
              <button className="rounded-full flex items-center space-x-2 m-4 bg-transparent p-4 text-center hover:bg-white/20 transition duration-200 w-full justify-between">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full bg-slate-400 w-12 h-12"></div>
                  <div className="text-left text-sm">
                  <div className="font-semibold">ANU SURESH</div>
                  <div className="">@Anu_Suresh_99</div>
                   </div>
                </div>
                <div> 
                  <BsThreeDots/>
                </div>
              </button> 
         </section>
  )
}

export default leftsidebar