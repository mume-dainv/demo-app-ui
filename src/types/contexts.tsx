import { User } from "./user";

export interface UserContext  {
    user: User | null;
    loading: boolean;
    refreshUser: Function;
}

export interface RoleContext  {
    isAdmin: boolean; 
}
