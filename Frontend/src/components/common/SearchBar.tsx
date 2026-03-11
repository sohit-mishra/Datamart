import { Input } from "../../components/ui/input"
import { Search } from "lucide-react"

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative w-[320px]">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

      <Input
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
      />
    </div>
  )
}