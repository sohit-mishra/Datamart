import axios from "axios";
import type { UploadResponse } from "../types/upload.types";
import { env } from "../config/env";

const api = axios.create({
    baseURL: `${env.API_URL}upload`,
})

export const profileImage = async (file: File) => {
    const formData = new FormData()
    formData.append('image', file);
    const res = await api.post<UploadResponse>('/me', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return res
}
