'use client';

import { useUser } from '@/contexts/userContext';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { logout as logoutHandle } from '@/services/clients/auth.service';
import { useRouter } from 'next/navigation';

export default function UserDropDown() {
  const { user, refresh } = useUser();
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  const menuRef = useRef(null);
  const logout = async () => {
    await logoutHandle();
    refresh();
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
        <img className="size-11 rounded-full" src={user?.avatar || 'default_avatar.jpg'} />
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
