import { useEffect, useState, useRef, useMemo } from "react"
import FilterPanel from "../components/common/FilterPanel"
import SearchBar from "../components/common/SearchBar"
import ProductCard from "../features/products/components/ProductCard"
import { getAllProducts } from "../api/productApi"
import type { Product } from "../types"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "../components/ui/select"

export default function Home() {

  const [products, setProducts] = useState<Product[]>([])
  const [visibleCount, setVisibleCount] = useState(8)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [brand, setBrand] = useState("all")
  const [sort, setSort] = useState("")
  const loaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts()
        setProducts(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchProducts()
  }, [])


  const handleSearch = (value: string) => {
    setSearch(value)
    setVisibleCount(8)
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    setVisibleCount(8)
  }

  const handleBrandChange = (value: string) => {
    setBrand(value)
    setVisibleCount(8)
  }

  const handleSortChange = (value: string) => {
    setSort(value)
    setVisibleCount(8)
  }


  const uniqueBrands = useMemo(() => {
    return [...new Set(products.map(p => p.brand))]
  }, [products])

  const uniqueCategories = useMemo(() => {
    return [...new Set(products.map(p => p.category))]
  }, [products])


  const filteredProducts = useMemo(() => {
    let filtered = [...products]
    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category)
    }
    if (brand !== "all") {
      filtered = filtered.filter((p) => p.brand === brand)
    }
    if (sort === "price-asc") {
      filtered.sort((a, b) => a.price - b.price)
    }
    if (sort === "price-desc") {
      filtered.sort((a, b) => b.price - a.price)
    }
    if (sort === "rating-desc") {
      filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    }
    return filtered
  }, [products, search, category, brand, sort])


  useEffect(() => {
    const loader = loaderRef.current
    if (!loader) return
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setVisibleCount((prev) => {
            if (prev >= filteredProducts.length) return prev
            return prev + 8
          })
        }
      },
      {
        rootMargin: "200px"
      }
    )

    observer.observe(loader)
    return () => observer.disconnect()
  }, [filteredProducts])

  const visibleProducts = filteredProducts.slice(0, visibleCount)


  return (
    <div className="space-y-8 p-6 mt-16">
      <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
        <SearchBar
          value={search}
          onChange={handleSearch}
        />

        <div className="flex flex-wrap gap-4">
          <FilterPanel
            category={category}
            brand={brand}
            categories={uniqueCategories}
            brands={uniqueBrands}
            onCategoryChange={handleCategoryChange}
            onBrandChange={handleBrandChange}
          />

          <Select value={sort} onValueChange={handleSortChange}>
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
        </div>
      </div>

      <ProductCard products={visibleProducts} />
      {visibleCount < filteredProducts.length && (
        <div
          ref={loaderRef}
          className="text-center py-10 text-gray-400"
        >
          Loading more products...
        </div>
      )}
    </div>
  )
}