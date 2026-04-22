import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import LeftSidebar from "../components/sidebar";
import { useQuery } from "@tanstack/react-query";
import { postsQueryOptions } from "../tanStack/query";
import LoadingComponent from "../components/loading";
import { useNavigate } from "@tanstack/react-router";

export default function HomePage() {
  const lgBreakpoint = window.matchMedia("(min-width: 1024px)");
  const [isSideBarOpen, setIsSideBarOpen] = useState(lgBreakpoint.matches);
  // const [] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => setIsSideBarOpen(e.matches);
    lgBreakpoint.addEventListener("change", handler);
    return () => lgBreakpoint.removeEventListener("change", handler);
  }, []);
  const { data: blogs, isPending, isError } = useQuery(postsQueryOptions());

  if (isPending) {
    return (
      <LoadingComponent />
    )
  }

  if (isError) {
    return (
      <div>Error loading posts. Check the backend is reachable.</div>
    )
  }


  return (
    <div className="border border-green-300 w-full h-screen relative">

      <nav className="sticky top-0 border-b border-t border-b-gray-300 border-t-gray-300 px-4 py-2 h-[8%] md:h-[7%] md:max-h-[9%] w-full flex justify-between z-10  backdrop-blur-md">
        <Navbar setIsSideBarOpen={setIsSideBarOpen} isSideBarOpen={isSideBarOpen} />
      </nav>

      <div className={` h-[92%] md:h-[93%] w-[85%] ${isSideBarOpen ? "md:w-[70%]" : "md:w-[80%]"}  mx-auto overflow-y-scroll overflow-hidden relative`}>

        <div className="sticky top-0 h-fit w-full p-2 z-5 bg-white">
          <span className="border-b mx-1 p-2 text-lg cursor-pointer">For you</span>
          <span className="border-b mx-1 p-2 text-lg cursor-pointer">Featured</span>
        </div>

        {
          blogs?.map((blog) => {
            return (
              <div className="group h-fit w-[90%] md:w-[85%] rounded-sm bg-gray-100 mx-auto my-1 p-7 md:py-10 cursor-pointer" key={blog._id} onClick={() => navigate({to: "/blogs/$blogId", params:{blogId: blog._id || ""}})}>
                <div className="flex items-center space-x-2 text-xs mb-2">
                  <div className="h-5 w-5 rounded-full bg-gray-200"></div>
                  <span className="font-medium">{blog.author}</span>
                  <span className="text-gray-400"> · {new Date(String(blog.createdAt)).toLocaleString()}</span>
                </div>
                <h2 className="mb-2 text-xl font-bold group-hover:underline gropup-hover:underline truncate">{blog.title}</h2>
                <p className="text-gray-500 line-clamp-2">{blog.content.slice(0, 200)}...</p>
              </div>
            )
          })
        }
      </div>

      <aside className={`absolute h-[92%] top-[7.5%] left-0 w-[15%] transition-transform duration-500 ease-in-out ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <LeftSidebar />
      </aside>

    </div>
  )
}





