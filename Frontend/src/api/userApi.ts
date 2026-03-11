import axios from 'axios'
import { env } from '../config/env';
import type { ApiResponse, Singup, User, Auth, UpdateProfilePayload } from '../types';
import type { Login } from '../types';


const api = axios.create({
    baseURL: `${env.API_URL}auth`
})

const setToken = (token: string) => {
    return localStorage.setItem("token", token)
}


const getToken = () => {
    return localStorage.getItem('token');
}

export const login = async (login: Login) => {
    const res = await api.post<Auth>('/login', login);
    setToken(res.data.token);
    return res.data
}


export const signup = async(signup : Singup) => {
    const res = await api.post<ApiResponse<Singup>>('/signup', signup);
    return res.data
}


export const getProfile = async () => {
    const res = await api.post<ApiResponse<User>>(
        "/me",
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    )
    return res.data
}


export const updateProfile = async (update : UpdateProfilePayload) => {
    const res = await api.put<ApiResponse<User>>(
        "/update",update,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    )
    return res.data
}