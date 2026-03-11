export interface Product {
  id?:string
  name: string
  description: string
  category: string
  brand: string
  stock: number
  rating?: number
  images: string[]
  created_at?: string
  price: number
  currency: string
}

export interface ProductListResponse {
  success: boolean
  message: string
  data:  Product[]
}

export interface ProductResponse {
  data: Product
}