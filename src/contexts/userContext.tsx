'use client';
import { getProfile } from '@/services/clients/user.client.service';
import { User } from '@/types/common';
import { UserContextType } from '@/types/contexts';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const refresh = async () => {
    try {
      const res = await getProfile();
      setUser(res.data.data.user);
    } catch (error) {
      if (error.status === 401) return router.replace('/login');
      throw Error(error.data.message);
    }
  };

  useEffect(() => {
    const res = refresh();
  }, []);
  return <UserContext.Provider value={{ user, refresh }}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
