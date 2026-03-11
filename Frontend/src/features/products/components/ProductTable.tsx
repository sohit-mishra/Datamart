import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "../../../components/ui/table"
import { Button } from "../../../components/ui/button"
import gsap from "gsap"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { useNavigate } from "react-router-dom"
import type { Product } from "../../../types"
gsap.registerPlugin(useGSAP)
interface Props {
  products: Product[]
  onDelete?: (id: string) => void
}

export default function ProductTable({ products, onDelete }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  useGSAP(() => {
    gsap.from(".product-row", {
      opacity: 0,
      y: 20,
      duration: 0.4,
      stagger: 0.06
    })
  }, { scope: ref })

  const handleUpdate = (id: string) => {
    navigate(`/products/update/${id}`)
  }

  console.log(products)

  return (
    <div ref={ref} className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6">
                No products found
              </TableCell>
            </TableRow>
          )}
          {products.map((p) => (
            <TableRow key={p.id} className="product-row">
              <TableCell className="flex items-center gap-3">
                <img
                  src={p.images?.[0] || "https://placehold.co/40"}
                  className="w-10 h-10 rounded-md object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-medium">
                    {p.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    #{p.id}
                  </span>
                </div>
              </TableCell>
              <TableCell>{p.brand}</TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell>
                {p.currency}{p.price}
              </TableCell>
              <TableCell>
                {p.stock}
              </TableCell>
              <TableCell>
                ⭐ {p.rating}
              </TableCell>
              <TableCell>
                {p.created_at
                  ? new Date(p.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                  })
                  : "-"}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUpdate(p.id!)}
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete?.(p.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}