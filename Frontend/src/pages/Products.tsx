import { useState, useMemo, useEffect } from "react"
import { Link } from "react-router-dom"
import FilterPanel from "../components/common/FilterPanel"
import Pagination from "../components/common/Pagination"
import SearchBar from "../components/common/SearchBar"
import ProductTable from "../features/products/components/ProductTable"
import { getAllProducts, deleteProduct } from "../api/productApi"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "../components/ui/select"
import { toast } from "sonner"

import type { Product } from "../types"

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [brand, setBrand] = useState("all")
  const [sort, setSort] = useState("")
  const [page, setPage] = useState(1)

  const limit = 7


  const fetchProducts = async () => {
    try {
      const data = await getAllProducts()
      setProducts(data.data)
    } catch (error) {
      console.error("Failed to fetch products", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])


const handleDelete = async (id: string) => {
  try {
    await deleteProduct(id)
    setProducts(prev => prev.filter(p => p.id !== id))
    toast.success("Product deleted successfully")
  } catch (error) {
    console.error(error)
    toast.error("Failed to delete product")
  }
}


  const uniqueBrands = useMemo(() => {
    return [...new Set(products.map(p => p.brand))]
  }, [products])

  const uniqueCategories = useMemo(() => {
    return [...new Set(products.map(p => p.category))]
  }, [products])


  const filteredProducts = useMemo(() => {

    let result = products.filter((p) => {

      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase())

      const matchesCategory =
        category !== "all" ? p.category === category : true

      const matchesBrand =
        brand !== "all" ? p.brand === brand : true

      return matchesSearch && matchesCategory && matchesBrand

    })


    if (sort === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price)
    }
    if (sort === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price)
    }
    if (sort === "rating-desc") {
      result = [...result].sort(
        (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
      )
    }
    return result
  }, [products, search, category, brand, sort])
  const totalPages = Math.ceil(filteredProducts.length / limit)
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * limit,
    page * limit
  )

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
      
      </div>
    )
  }

  return (
    <div className="space-y-8 p-6 mt-15">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <SearchBar
          value={search}
          onChange={setSearch}
        />
        <div className="flex gap-4 items-center">
          <FilterPanel
            category={category}
            brand={brand}
            categories={uniqueCategories}
            brands={uniqueBrands}
            onCategoryChange={setCategory}
            onBrandChange={setBrand}
          />
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">
                Price: Low → High
              </SelectItem>
              <SelectItem value="price-desc">
                Price: High → Low
              </SelectItem>
              <SelectItem value="rating-desc">
                Rating
              </SelectItem>
            </SelectContent>
          </Select>
          <Link
            to="/products/create"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            + Add Product
          </Link>
        </div>
      </div>


      <ProductTable
        products={paginatedProducts}
        onDelete={handleDelete}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

    </div>
  )
}