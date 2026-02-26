import { get, post, postForm, put, del } from '@/lib/axios/http';
import { UserType as any } from '@/lib/validations/user';

export const getProfile = () => {
  return get('/me');
};

export const updateProfile = (data: any) => {
  return postForm('/me', data);
};

export const getUser = (id: string) => {
  return get('/admin/users/' + id);
};

export const updateUser = (id: string, data: any) => {
  return put('/admin/users/' + id, data);
};

export const createUser = (data: any) => {
  return post('/admin/users', data);
};

export const importUser = (data: any) => {
  return post('/admin/users/import', data);
};

export const deleteUser = (id: string) => {
  return del('/admin/users/' + id);
};

export const getLogImportUser = () => {
  return get('/admin/users/log_import');
};

export const deleteLogImportUser = (id: string) => {
  return del('/admin/users/log_import/' + id);
};
