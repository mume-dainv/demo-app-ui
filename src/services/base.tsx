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
  method = 'POST',
  options?: RequestInit
): Promise<DataRespone>
{
        const res = await fetch(API_URL + endpoint, {
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
            credentials: 'include',
            method: method,
            body: JSON.stringify(data)
        }); 
    const dataRes: DataRespone = await res.json();
    // if (res.statusText == '401') {
    //     await refresh();
    // }
    if (!res.ok) throw new Error(dataRes?.message || errMsg);

    return dataRes;
}

// const refresh = async () => {
       
//             const res = await fetch(API_URL + '/refresh', {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             credentials: 'include',
//             method: 'POST',
//         }); 

//         if (!res.ok) {
//             window.location.href = "/login"
//         }
// }
 

export type P = {
    endpoint?: string,
    method?: string,
    options?: RequestInit
}

export interface DataRespone {
    data: object;
    message: string;
}
