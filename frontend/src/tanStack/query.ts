import { queryOptions } from '@tanstack/react-query';
import { getAllBlogs } from '../api/blogs';
import { checkUserStatus } from '../api/auth';

// const BACKEND_SERVER = import.meta.env.VITE_BACKEND_SERVER
// const BACKEND_SERVER_PORT = import.meta.env.VITE_BACKEND_SERVER_PORT

// const myHeader = new Headers()
// myHeader.append("Content-Type", "application/json")

export function postsQueryOptions() {
  return queryOptions({
    queryKey: ["posts"],
    queryFn: getAllBlogs,
    staleTime: 1000 * 60 * 5
  });
}

export function authQueryOptions() {
  return queryOptions({
    queryKey: ["authStatus"],
    queryFn: checkUserStatus,
    retry: false,
    staleTime: 1000 * 60 * 1,
  });
}

// export function currentBlogOptions() {
//   return queryOptions({
//     queryKey: ["currentBlog"],
//     queryFn: 
//   })
// }