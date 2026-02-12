import { DataRespone, get, P, post } from "./base"

export const login = async (authData = {},options: RequestInit = {})  => {
    return await post('/login', authData,'POST', options);
} 

export const getMe = async (options: RequestInit = {})  => {
    const res: {data: object} = await get('/me',options);
    
    return res.data;
} 

export const logout = async (options: RequestInit = {})  => {
    return await post('/logout','POST');
} 
