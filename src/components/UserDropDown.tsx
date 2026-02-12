"use client"

import { useUser } from "@/contexts/userContext"
import Link from "next/link";
import { useState } from "react";

export default function UserDropDown () {
    const {user} = useUser();
    const [menu, setMenu] = useState(false);
    return (
        <main>
             <button className="relative" onClick={() => setMenu(!menu)}>
                <img className="size-11 rounded-full" src={user?.avatar || 'default_avatar.jpg'}></img>
            </button>
            <div className={`absolute bg-white shadow-lg text-slate-800 w-auto p-3 ${menu?'block':'hidden'}`} >
                <Link href='/profile'>Profile</Link>
            </div>
        </main> 
    )
}