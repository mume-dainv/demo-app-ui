'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { logout as logoutHandle } from '@/services/clients/auth.client.service';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/users';
import { QueryClient } from '@tanstack/react-query';

export default function UserDropDown() {
  const { user, clearUser } = useUser();
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);
  const queryClient = new QueryClient();

  const router = useRouter();

  const logout = async () => {
    await logoutHandle();
    clearUser();
    queryClient.clear();
    router.push('/login');
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <main>
      <button className="relative" onClick={() => setMenu(!menu)}>
        <img className="size-11 rounded-full" src={user?.avatar_url || 'default_avatar.jpg'} />
      </button>
      <div
        ref={menuRef}
        className={`absolute right-2 flex w-auto flex-col space-y-3 bg-white p-3 text-slate-700 shadow-lg  ${menu ? 'block' : 'hidden'}`}
      >
        <Link className="hover:text-black" href="/profile">
          Profile
        </Link>
        <button className="hover:text-black" onClick={logout}>
          Logout
        </button>
      </div>
    </main>
  );
}
