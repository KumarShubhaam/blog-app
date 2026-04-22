import type { User, UserInput } from "@blog-app/shared";
import { api_call, BASE_USER_URL, GET_REQUEST_OBJECT, myHeader, POST_REQUEST_OBJECT } from "./config";

// signin
export async function loginUser(form: { username: string; password: string }) {
  const url = `${BASE_USER_URL}/signin`;

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: myHeader,
    body: JSON.stringify({
      "username": form.username,
      "password": form.password
    })
  });

  if (!response.ok) {
    throw new Error('Invalid username or password');
  }
  return true;
}

// checkstatus
// export async function checkUserStatus() {
//   const url = `${BASE_USER_URL}/status`;

//   const response = await fetch(url, {
//     method: 'GET',
//     credentials: 'include',
//     headers: myHeader
//   });

//   if (response.status === 403){
//     console.log('user not authenticated');
//     return false;
//   }
//   return await response.json();
// }
export async function checkUserStatus() {
  const url = `${BASE_USER_URL}/status`;

  const request = new Request(url, GET_REQUEST_OBJECT);
  const response = await api_call(request);

  if (response?.ok) {
    const data = await response.json();
    // return data.authenticated as boolean;
    return data;
  }

  return {authenticated: false, payload: null};
}

// signout
export async function signout() {
  const url = `${BASE_USER_URL}/signout`;

  const request = new Request(url, POST_REQUEST_OBJECT);
  const response = await api_call(request);
  if (response == null) {
    return false;
  }
  if (response.status === 403) {
    console.log('user could not logout');
    return false;
  }
  return await response.json();
}

// signup
export async function signup(userDetails: UserInput): Promise<User | null> {
  const url = `${BASE_USER_URL}/signup`;

  const request = new Request(url, { ...POST_REQUEST_OBJECT, body: JSON.stringify(userDetails) });
  const response = await api_call(request);

  if (response) {
    return await response.json();
  } else {
    return null;
  }
}

// get user blogs
export async function getUserBlogs(id: string) {
  const url = `${BASE_USER_URL}/${id}/blogs`;
  const request = new Request(url, GET_REQUEST_OBJECT);
  const response = await api_call(request);

  if (response) {
    return await response.json();
  } else {
    return null;
  }
}

// check if username exists already
export async function userNameExists(username: string): Promise<boolean> {
  const url = `${BASE_USER_URL}/check?username=${username}`;
  const request = new Request(url, {
    method: 'GET',
    headers: myHeader
  });
  const response = await api_call(request);

  if(response?.ok){
    const data = await response.json(); 
    // console.log(data);
    return !data.available;
  }else{
    return false;
  }
  
}