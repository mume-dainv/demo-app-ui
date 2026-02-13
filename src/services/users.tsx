import {  get } from "./base"
 
export const all = async (options: RequestInit = {})  => {
    const res: {data: object} = await get('/admin/users',options);
    
    return res.data;
}  

export const getUser = async (id:string,options: RequestInit = {})  => {
    const res: {data: object} = await get('/admin/users/'+id,options);
    
    return res.data;
}  
