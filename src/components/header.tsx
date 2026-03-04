'use client';

import { useState } from 'react';
import Link from 'next/link';
import UserDropDown from './userDropDown';
import { useUser } from '@/hooks/users';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useUser();
  const navItems = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Users',
      href: '/admin/users',
      role: ['ADMIN'],
    },
    {
      name: 'Dashboard',
      href: '/dashboard',
    },
  ];

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-800">
          MyApp
        </Link>
        {user &&
          navItems.map((item) => {
            if (item.role && !item.role.includes(user.role)) {
              return null;
            }
            return (
              <Link key={item.name} href={item.href} className="text-xl font-bold text-gray-800">
                {item.name}
              </Link>
            );
          })}
        {user ? (
          <UserDropDown />
        ) : (
          <Link
            href="/login"
            className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
