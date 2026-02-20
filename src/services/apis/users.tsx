import { get } from '@/lib/axios/api';
export const getAllUser = () => {
  return get('/admin/users');
};
