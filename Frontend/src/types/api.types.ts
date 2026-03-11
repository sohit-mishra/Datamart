export interface ApiResponse<T>{
    success:boolean
    message: string;
    data: T
}

export interface PaginationQuery {
  page?: number
  limit?: number
  category?: string
  search?: string
  sortBy?: "price" | "created" | "rating"
  order?: "asc" | "desc"
}