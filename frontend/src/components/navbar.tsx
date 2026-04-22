import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "./logo";
import ProfileLogo from "./profileLogo";
import SearchBox from "./searchBox";
import { faBars, faBell, faPenToSquare, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@tanstack/react-router";

function Navbar2() {

  return (
    <div className=" flex justify-between w-screen p-2">
      <div className=" flex justify-around items-center w-2/7">
        <FontAwesomeIcon icon={faBars} className="text-2xl" />
        <Logo />
        <SearchBox />
      </div>

      <div className="flex justify-around items-center w-1/7 text-[1.5rem]">
        <FontAwesomeIcon icon={faPenToSquare} className="text-gray-700 text-[1.5rem] cursor-pointer" />
        <FontAwesomeIcon icon={faBell} className="cursor-pointer" />
        <ProfileLogo />
      </div>
    </div>
  )
}

type NavbarProps = {
  isSideBarOpen: boolean;
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Navbar({isSideBarOpen, setIsSideBarOpen}: NavbarProps) {
  
  return (
    // <div className=" flex justify-between w-screen p-2">
    <>
      <div className=" min-w-fit h-full flex justify-start items-center w-2/7 relative">
        <FontAwesomeIcon icon={faBars} className="mx-2 text-2xl cursor-pointer"  onClick={() => setIsSideBarOpen(!isSideBarOpen)} />
        <div className={`bg-green-700 rounded-full w-[9px] aspect-square absolute left-[7%] top-[12%] ${isSideBarOpen ? "hidden" : "block"}`}></div>
        <div className="mx-1">
          <Logo />
        </div>
        <div className="hidden lg:block ml-9 h-full">
          <SearchBox />
        </div>
      </div>

      <div className=" flex justify-around items-center w-[15%] md:w-[20%] xl:w-[13%] text-[1.7rem]">
        <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-[1.3rem] lg:hidden!" />
        <Link to={'/write'}>
          <FontAwesomeIcon icon={faPenToSquare} className="hidden! md:block! text-gray-700 text-[1.3rem] cursor-pointer " />
        </Link>
        <FontAwesomeIcon icon={faBell} className="hidden! md:block! text-[1.3rem] cursor-pointer" />
        <ProfileLogo />
      </div>

    </>
    // </div>
  )
}




export default Navbar;