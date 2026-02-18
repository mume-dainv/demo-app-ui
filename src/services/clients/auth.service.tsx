import { post } from '@/lib/axios/http';
import { AuthValue } from '@/lib/validations/auth';

export const login = (auth: AuthValue) => {
  return post('/login', auth);
};

export const logout = () => {
  return post('/logout', []);
};
