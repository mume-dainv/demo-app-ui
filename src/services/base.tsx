import { API_URL } from "@/consts/common"; 
import { redirect, useRouter } from "next/navigation";
import { ca } from "zod/locales";
const errMsg = "Something wrong...";
// Can't ref
export async function get<P>(
  endpoint = '',
  options?: RequestInit
): Promise<DataRespone>
{
    try{
        const res = await fetch(API_URL + endpoint, {
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
        credentials: 'include'
    });
    
    const data: DataRespone = await res.json()
    
    // if (res.status == 401) {
    //     await refresh();
    // }
    if (!res.ok) throw new Error(data.message || errMsg)
    
    return data;
    } catch (error) {
        throw error;
    }
    
}

export async function post<P>(
  endpoint: string = '',
  data: {} = {},
  options?: RequestInit
): Promise<DataRespone>
{
        const res = await fetch(API_URL + endpoint, {
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
            credentials: 'include',
            method: 'POST',
            body: data instanceof FormData ? data : JSON.stringify(data)
        }); 
    const dataRes: DataRespone = await res.json(); 
    if (!res.ok) throw new Error(dataRes?.message || errMsg);

    return dataRes;
}
 
export async function put<P>(
  endpoint: string = '',
  data: {} = {},
  options?: RequestInit
): Promise<DataRespone>
{
        const res = await fetch(API_URL + endpoint, {
            headers: {
                ...options?.headers,
            },
            credentials: 'include',
            method: 'PUT',
            body: data instanceof FormData ? data : JSON.stringify(data)
        }); 
    const dataRes: DataRespone = await res.json(); 
    if (!res.ok) throw new Error(dataRes?.message || errMsg);

    return dataRes;
}

export async function base<P>( endpoint = '',method='GET',
  options?: RequestInit): Promise<void> {
    const res = await fetch(API_URL + endpoint, {
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
        method: method,
        credentials: 'include'
    });

    if (res.status === 401) {
        await refresh(options);
        await base(endpoint, method, options);
    }

    if (!res.ok) {
        const data: DataRespone = await res.json()
        throw new Error(data?.message || errMsg)
    }
}

async function refresh(options: RequestInit = {}) {
    const res = await fetch(API_URL + '/refresh', {
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
        method: 'POST',
        credentials: 'include'
    });

    if (res.status === 401) window.location.href = '/login';
}

export type P = {
    endpoint?: string,
    method?: string,
    options?: RequestInit
}

export interface DataRespone {
    data: object;
    message?: string;
}
