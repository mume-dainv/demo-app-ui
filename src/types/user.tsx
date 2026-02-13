export interface User  {
    id?: string;
    name: string;
    email: string;
    avatar?: string;
    avatar_url?: string;
    role?: ROLES;
    ip?: string;
    user_agent?: string;
    last_login_at?: Date;
}

export type ROLES = 'USER' | 'ADMIN';
