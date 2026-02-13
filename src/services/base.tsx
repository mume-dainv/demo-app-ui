import { API_URL } from "@/consts/common"; 
import { useRouter } from "next/navigation";
const errMsg = "Something wrong...";
export async function get<P>(
  endpoint = '',
  options?: RequestInit
): Promise<DataRespone>
{
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
            method: 'POST',
            body: data instanceof FormData ? data : JSON.stringify(data)
        }); 
    const dataRes: DataRespone = await res.json(); 
    if (!res.ok) throw new Error(dataRes?.message || errMsg);

    return dataRes;
}

export type P = {
    endpoint?: string,
    method?: string,
    options?: RequestInit
}

export interface DataRespone {
    data: object;
    message: string;
}
