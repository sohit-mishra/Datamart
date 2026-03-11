import axios from "axios"
import { env } from "../config/env"

import type {
  ApiResponse,
  Product,
  ProductListResponse
} from "../types"

const api = axios.create({
  baseURL: env.API_URL
})

const getToken = () => {
  return localStorage.getItem("token")
}

export const getAllProducts = async () => {
  const res = await api.get<ProductListResponse>(
    `/products`
  )
  return res.data
}

export const getProduct = async (id: string) => {
  const res = await api.get<ApiResponse<Product>>(`/products/${id}`)
  return res.data
}

export const createProduct = async (product: Product) => {
  const res = await api.post<ApiResponse<Product>>(
    "/products",
    product,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  )

  return res.data
}

export const updateProduct = async (
  id: string,
  product: Partial<Product>
) => {
  const res = await api.put<ApiResponse<Product>>(
    `/products/${id}`,
    product,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  )

  return res.data
}

export const deleteProduct = async (id: string) => {
  const res = await api.delete<ApiResponse<Product>>(
    `/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  )

  return res.data
}