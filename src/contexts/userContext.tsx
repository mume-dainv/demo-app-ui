"use client";

import { getMe } from "@/services/auth";
import { DataRespone } from "@/services/base";
import { UserContext as UserContextType } from "@/types/contexts";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
  
const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshUser = async () => {
    try {
      setLoading(true);
      const res = await getMe();
      setUser(res.user)  
    } catch {
      setUser(null);
      router.replace('/login')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {refreshUser()},[])
  return (
    <UserContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return context;
}
