import type { Blog, BlogInput } from "@blog-app/shared"
import { api_call, BASE_BLOGS_URL, GET_REQUEST_OBJECT, POST_REQUEST_OBJECT } from "./config";



export const getAllBlogs = async ():Promise<Blog[]> => {
  const url = `${BASE_BLOGS_URL}/all`;
  
  try{
    const request = new Request(url, GET_REQUEST_OBJECT);
    const response = await api_call(request);
    if(response){
      return await response.json();
    }        
    throw new Error(`Couldn't fetch blogs...${response}`);   
  }catch (error){
    throw new Error(`Couldn't fetch blogs...${error}`);
  }
  
}

export const getBlogById = async (id: string):Promise<Blog | null> => {
  const url = `${BASE_BLOGS_URL}/${id}`;
  const request = new Request(url, GET_REQUEST_OBJECT);
  const response = await api_call(request);
  if(response){
    return await response.json();
  }else{
    return null;
  }
}

export const getBlogByUser = async (userId: string):Promise<Blog | null> => {
  const url = `${BASE_BLOGS_URL}/${userId}`;
  const request = new Request(url, GET_REQUEST_OBJECT);
  const response = await api_call(request);
  if(response){
    return await response.json();
  }else{
    return null;
  }
}

export const postNewBlog = async (userId:string, payload: BlogInput): Promise<boolean> => {
  const url = `${BASE_BLOGS_URL}/${userId}/new-story`;
  const request = new Request(url, {...POST_REQUEST_OBJECT, body: JSON.stringify(payload)});
  const response = await api_call(request);
  if(response?.ok){
    return true;
  }
  throw new Error('Failed to create blog post');
}

