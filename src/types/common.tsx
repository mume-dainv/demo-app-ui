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
  total_rows: number;
  fail_count: number;
  success_count: number;
  status: string;
  created_at: string;
}

export type Role = 'ADMIN' | 'USER';
export type AlertVariant = 'success' | 'error' | 'warning' | 'info';
export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  duration?: number;
}

export type JobStatus = 'Complete' | 'Running' | 'Fail';

export interface JobExportUser {
  id: string;
  file_path: string;
  created_at: string;
  status: JobStatus;
}

export type SearchParams = {
  name_like?: string;
  limit: number;
  page: number;
};
