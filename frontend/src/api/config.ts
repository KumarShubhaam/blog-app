
const BACKEND_SERVER = import.meta.env.VITE_BACKEND_SERVER
const BACKEND_SERVER_PORT = import.meta.env.VITE_BACKEND_SERVER_PORT

export const BASE_USER_URL = `http://${BACKEND_SERVER}:${BACKEND_SERVER_PORT}/api/users`
export const BASE_BLOGS_URL = `http://${BACKEND_SERVER}:${BACKEND_SERVER_PORT}/api/blogs`

export const myHeader = new Headers()
myHeader.append("Content-Type", "application/json")


export let POST_REQUEST_OBJECT: RequestInit = {  
  method: 'POST',
  credentials: 'include',
  headers: myHeader
}
export let GET_REQUEST_OBJECT: RequestInit = {
  method: 'GET',
  credentials: 'include',
  headers: myHeader
}
export let PUT_REQUEST_OBJECT: RequestInit = {
  method: 'PUT',
  credentials: 'include',
  headers: myHeader
}
export let DELETE_REQUEST_OBJECT: RequestInit = {
  method: 'DELETE',
  credentials: 'include',
  headers: myHeader
}


export async function api_call(request: Request): Promise<Response | null> {
  try {
    const response = await fetch(request);
    if(response.ok){
      console.log("Success:", response);
      return response;
    }
    throw new Error(`Error occured: ${response.status}, ${response}`);
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
  
}

