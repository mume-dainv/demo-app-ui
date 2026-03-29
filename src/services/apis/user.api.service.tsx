import { get, post } from '@/lib/axios/api';
export const getAllUser = (searchParams: string) => {
  return get(`/admin/users?${searchParams}`);
};

export const getExportUsers = (queries = '') => {
  return get('admin/users/export?' + queries);
};
