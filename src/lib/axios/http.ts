import axios from 'axios';
// lib/http.ts
const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const refreshHttp = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

http.interceptors.response.use(
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
        await refreshHttp.post('/refresh');
        return http(originalRequest);
      } catch (err) {
        console.error('Refresh token failed', err);
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  },
);

export const get = (endPoint: string, options?: any) => {
  return http.get(endPoint, { ...options });
};

export const post = (endPoint: string, data: object, options?: any) => {
  return http.post(endPoint, data);
};

export const postForm = (endPoint: string, data: object, options?: any) => {
  return http.postForm(endPoint, data);
};

export const put = (endPoint: string, data: object, options?: any) => {
  return http.put(endPoint, data, { ...options });
};

export const del = (endPoint: string, options?: any) => {
  return http.delete(endPoint, { ...options });
};
