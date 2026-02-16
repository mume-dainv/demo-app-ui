"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/contexts/userContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useUser();

  const navItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Users",
      href: "/users",
      role: "ADMIN",
    },
    {
      name: "Dashboard",
      href: "/dashboard",
    },
  ];

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-800">
          MyApp
        </Link>
        {user ? (
          <div>{user.name}</div>
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
