import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    cookie: `token=${cookies().get('token')?.value}`,
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/refresh'
    ) {
      originalRequest._retry = true;
      try {
        await api.post('/refresh');
        return api(originalRequest);
      } catch (err) {
        console.error('Refresh token failed', err);
        redirect('/login');
      }
    }
    return Promise.reject(error);
  },
);

export const get = (endPoint: string, options?: AxiosRequestConfig) => {
  return api.get(endPoint, { ...options });
};

export const post = (endPoint: string, data = {}, options?: AxiosRequestConfig) => {
  return api.post(endPoint, data, { ...options });
};
