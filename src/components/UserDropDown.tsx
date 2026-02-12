"use client"

import { useUser } from "@/contexts/userContext"
import Link from "next/link";
import { useState } from "react";
import {logout as logoutHandle} from '@/services/auth'
import { useRouter } from "next/navigation";

export default function UserDropDown () {
    const {user, refreshUser} = useUser();
    const [menu, setMenu] = useState(false);
    const router = useRouter();
    const logout = async () => {
        await logoutHandle()
        refreshUser()
    }
    return (
        <main>
             <button className="relative" onClick={() => setMenu(!menu)}>
                <img className="size-11 rounded-full" src={user?.avatar || 'default_avatar.jpg'}></img>
            </button>
            <div className={`absolute bg-white flex flex-col space-y-3 shadow-lg text-slate-700 w-auto p-3 ${menu?'block':'hidden'}`} >
                <Link className="hover:text-black" href='/profile'>Profile</Link>
                <button className="hover:text-black" onClick={logout}>Logout</button>
            </div> 
        </main> 
    )
}