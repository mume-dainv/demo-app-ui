import { User } from './common';

export interface UserContextType {
  user: User | null;
  refresh: Function;
}

export interface AlertContextType {
  addAlert: Function;
}
