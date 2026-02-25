import { get } from '@/lib/axios/api';
export const getAllUser = (page = 1) => {
  return get(`/admin/users?page=${page}`);
};
