import { get, post, postForm, put, del } from '@/lib/axios/http';
import { UserType as any } from '@/lib/validations/user';
import { headers } from 'next/headers';

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

export const exportUsers = (searchParams: string) => {
  return post(`/admin/users/export?${searchParams}`, {});
};

export const downloadExportUsers = (path: string) => {
  return post(
    'admin/users/download_export',
    { path },
    {
      responseType: 'blob',
    },
  );
};

export const deleteExportUsers = (id: string) => {
  return del('admin/users/export/' + id);
};
