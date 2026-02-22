export interface User {
  id?: string;
  name?: string;
  email: string;
  avatar?: string;
  avatar_url?: string;
  role?: Role;
  user_logging?: UserLogging[];
}

export interface UserLogging {
  ip: string;
  user_agent: string;
  login_at: Date;
}

export type Role = 'ADMIN' | 'USER';
export type AlertVariant = 'success' | 'error' | 'warning' | 'info';
export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  duration?: number;
}
