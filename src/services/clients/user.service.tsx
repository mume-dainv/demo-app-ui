import { get, post, postForm, put } from '@/lib/axios/http';
import { UserType } from '@/lib/validations/user';

export const getProfile = () => {
  return get('/me');
};

export const updateProfile = (data: any) => {
  return postForm('/me', data);
};

export const getUser = (id: string) => {
  return get('/admin/users/' + id);
};

export const updateUser = (id: string, data: UserType) => {
  return put('/admin/users' + id, data);
};

export const createUser = (data: UserType) => {
  return post('/admin/users', data);
};
