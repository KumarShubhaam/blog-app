
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function SearchBox(){
  const [searchText, setSearchText] = useState("");

  return(
    <div className=" h-full max-h-10 flex items-center rounded-3xl bg-gray-100 px-2 ">
      <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
      <input className="p-2 outline-none" 
        placeholder="Search" 
        onChange={(e) => setSearchText(e.target.value)} 
      />
    </div>
  )
}

export default SearchBox;