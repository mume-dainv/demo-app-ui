import { get, postForm } from '@/lib/axios/http';

export const getProfile = () => {
  return get('/me');
};

export const updateProfile = (data: any) => {
  return postForm('/me', data);
};
