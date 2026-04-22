import { useQuery } from "@tanstack/react-query";
import { postsQueryOptions } from "../tanStack/query";
import LoadingComponent from "../components/loading";
import Navbar from "../components/navbar";
import { useState } from "react";
import LeftSidebar from "../components/sidebar";
import { useUserStatus } from "../tanStack/userStatusHook";

type BlogPagePropType = {
  id: string
}

const BlogPage: React.FC<BlogPagePropType> = ({ id }) => {
  const { data: blogs, isPending, isError } = useQuery(postsQueryOptions());
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  // const navigate = useNavigate();

  const { isPending: userStatusPending } = useUserStatus();

  if (isPending || userStatusPending) {
    return <LoadingComponent />
  }

  const currentBlog = blogs?.find((blog) => blog._id === id);

  const date = new Date(String(currentBlog?.createdAt));

  const output = currentBlog?.content || '';


  if (isError) {
    return (
      <div>Error loading posts. Check the backend is reachable.</div>
    )
  }


  return (
    <div className="w-screen h-screen">
      <nav className=" flex justify-between w-screen h-[8%] p-2 shadow" >
        <Navbar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />
      </nav>
      <div className="flex flex-row-reverse justify-around h-[92%]">
        <main className=" [&>section]:w-[60%] w-[85%] h-full  py-2 flex flex-col items-center font-lora overflow-scroll ">

          <section className=" flex justify-center items-center py-3">
            <h1 className="text-3xl font-bold max-w-fit text-wrap">{currentBlog?.title}</h1>
          </section>

          <section className=" rounded border-b-gray-400 border-t-gray-400 flex justify-start items-center gap-3 h-10 py-1 px-4 my-4 shadow-md/20">
            <div className={`border w-8 rounded-full h-full bg-[url(vite.svg)] cursor-pointer`}></div>
            <div className="flex items-center w-fit h-full text-gray-500 italic cursor-pointer">{currentBlog?.author}</div>
            <div className="flex items-center w-fit h-full mx-4 text-gray-600 italic">{date.toLocaleString()}</div>
          </section>

          <section className="text-justify text-sm md:text-lg/9 py-2 px-4 mt-2">
            <div>{output}</div>
          </section>

        </main>

        <aside className={` h-full top-[7.5%]  w-[15%] transition-transform duration-500 ease-in-out ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <LeftSidebar />
        </aside>
      </div>
    </div>
  )
}




export default BlogPage;