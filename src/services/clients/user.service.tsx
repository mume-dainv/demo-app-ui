import { get } from "@/lib/axios/http";

export const getProfile = () => {
  return get("/me");
};
