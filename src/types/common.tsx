export interface User {
  id?: string;
  name?: string;
  email: string;
  avatar?: string;
  avatar_url?: string;
  role?: Role;
}

export type Role = "ADMIN" | "USER";
export type AlertVariant = "success" | "error" | "warning" | "info";
export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  duration?: number;
}
