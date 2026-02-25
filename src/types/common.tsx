export interface User {
  id?: string;
  name?: string;
  email: string;
  avatar?: string;
  avatar_url?: string;
  role: Role;
  user_logging?: UserLogging[];
}

export interface UserLogging {
  ip: string;
  user_agent: string;
  login_at: Date;
}

export interface ImportLogType {
  id: string;
  row: number;
  file_name: string;
  errors: Array<object>;
  total_row: number;
  row_fail: number;
  row_success: number;
  job_name: string;
  status: string;
  created_at: Date;
}

export type Role = 'ADMIN' | 'USER';
export type AlertVariant = 'success' | 'error' | 'warning' | 'info';
export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  duration?: number;
}
