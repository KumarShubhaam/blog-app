import { faBookmark, faChartSimple, faCircleUser, faHouse, faNewspaper } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useUserStatus } from "../tanStack/userStatusHook"
import { Link } from "@tanstack/react-router";
import LoadingComponent from "./loading";


function LeftSidebar({className=""}:{className?:string}) {

  return( 
    <div className={"border-r border-gray-300 h-full w-full overflow-x-hidden flex flex-col items-center" + `${className}`} >
      <div className=" h-[35%] max-h-1/2 p-2 overflow-y-auto">
        <SidebarMenu />
      </div>

      <hr className="w-[90%] py-1 text-gray-300" />

      <div className=" w-full h-[50%] my-1 p-2 ">
        <FollowingList />
      </div>
    </div>
  )
}



function SidebarMenu(){
  const { userDetails, isPending } = useUserStatus();

  if(isPending){
    return <LoadingComponent />
  }

  const menuList = [
    {
      text:"Home",
      path: "/",
      icon: faHouse
    }, 
    {
      text:"Library",
      path: "/",
      icon: faBookmark
    }, 
    {
      text:"Profile",
      path: `/profile/${userDetails.id}`,
      icon: faCircleUser
    }, 
    {
      text:"Stories",
      path: "/",
      icon: faNewspaper
    }, 
    {
      text:"Stats",
      path: "/",
      icon: faChartSimple
    }
  ]

  return(
    <>
      <ul className=" flex flex-col justify-start items-center w-full h-full">
        {
          menuList.map((menu, i) => {
            return (
              <Link to={menu.path} key={i} className=" m-2 w-4/5 h-9 flex justify-center items-center text-lg font-lora cursor-pointer">
                <span className="mx-1">
                  <FontAwesomeIcon icon={menu.icon} />
                </span>
                <span className="mx-1 text-gray-600">
                  {menu.text}
                </span>
                
              </Link>
            )
          })
        }
      </ul>
    </>
  )
}


interface FollowingListParamType {
  name: string,
  logo?: string
}

function FollowingList({followingList}: {followingList?:FollowingListParamType[]}){

  followingList = Array.from({length: 15}, (_, i) => {
    return ({
      "name": "Publisher",
      "logo": "vite.svg"
    })

  });

  
  return (
    <>
      <div className=" px-2 py-2 text-xl font-semibold font-lora">
        Following
      </div>
      <ul className=" h-[77%] w-full p-2 overflow-y-auto overflow-x-hidden scrollbar-hidden">
        {
          followingList.map((item, index) => {
            return (
              <li key={index} className=" flex my-1 cursor-pointer">
                <span className={` rounded-full mx-1 p-0.5 w-2/10 aspect-square bg-[url(${item.logo})] bg-cover bg-no-repeat overflow-hidden`}>
                </span>
                <span className=" mx-1 p-0.5 w-full text-gray-600">
                  {item.name + " " + (index + 1)}
                </span>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}


export default LeftSidebar;