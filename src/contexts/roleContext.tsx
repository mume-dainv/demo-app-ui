"use client"
import { RoleContext as RoleContextType } from "@/types/contexts";
import { use, useEffect, useState, createContext, useContext } from "react";
import { useUser } from "./userContext";
import { usePathname, useRouter } from "next/navigation";


const RoleContext = createContext< RoleContextType | null >(null);
const adminRoutes = ['/users'];
export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const {user} = useUser();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if(user?.role === 'ADMIN'){
      setIsAdmin(true);
    }
  }, [user])

  useEffect(() => {
    //check role
    if(adminRoutes.includes(pathname) && !isAdmin){
      router.replace('/');
    }
  }, [pathname])
  return (
    <RoleContext.Provider value={{ isAdmin }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used inside RoleProvider");
  }
  return context;
}
