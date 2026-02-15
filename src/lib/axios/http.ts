import axios from "axios";
// lib/http.ts
export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const get = async (endPoint: string, options?: any) => {
  return http.get(endPoint, { ...options });
};

export const post = (endPoint: string, data: object, options?: any) => {
  return http.post(endPoint, data);
};

export const put = (endPoint: string, data: object, options?: any) => {
  return http.put(endPoint, data, { ...options });
};

export const del = (endPoint: string, options?: any) => {
  return http.delete(endPoint, ...options);
};
