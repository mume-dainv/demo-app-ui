import { User } from "@/types/user";
import { DataRespone, get, P, post, put } from "./base"
import { Profile } from "@/lib/validations/profile.schema";
 
export const getMe = async (options: RequestInit = {})  => {
    const res: {data: object} = await get('/me',options);
    
    return res.data;
}  

export const updateProfile = async (data: FormData,options: RequestInit = {})  => {
    const res: {data: object} = await put('/me',data);
    
    return res.data;
}  
