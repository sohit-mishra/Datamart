import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "../ui/select"

interface Props {
  category: string
  brand: string
  categories: string[]
  brands: string[]
  onCategoryChange: (value: string) => void
  onBrandChange: (value: string) => void
}

export default function FilterPanel({
  category,
  brand,
  categories,
  brands,
  onCategoryChange,
  onBrandChange
}: Props) {

  return (
    <div className="flex gap-3">

      <Select value={category} onValueChange={onCategoryChange}>

        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>

        <SelectContent>

          <SelectItem value="all">
            All Categories
          </SelectItem>

          {categories.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}

        </SelectContent>

      </Select>


      <Select value={brand} onValueChange={onBrandChange}>

        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Brand" />
        </SelectTrigger>

        <SelectContent>

          <SelectItem value="all">
            All Brands
          </SelectItem>

          {brands.map((b) => (
            <SelectItem key={b} value={b}>
              {b}
            </SelectItem>
          ))}

        </SelectContent>

      </Select>

    </div>
  )
}