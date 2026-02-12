"use client"

import { useState } from "react"
import Link from "next/link"
import { useUser } from "@/contexts/userContext";
import UserDropDown from "./UserDropDown";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
        name: "home",
        href: "/",
    },
    {
        name: "About",
        href: "/ab",
    },
    {
        name: "Dashboard",
        href: "/dashboard",
    } 
  ];

  const {user} = useUser();
  

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-800">
          MyApp
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center space-x-6 md:flex">
            {navItems.map((item, index) => (<Link href={item.href} key={index} className="text-gray-600 hover:text-black">
            {item.name}
          </Link>))}
          { user ? <UserDropDown/> : <Link
            href="/login"
            className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Login
          </Link> }
          
        </nav>
 
      </div> 
    </header>
  )
}
