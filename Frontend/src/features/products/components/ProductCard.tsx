import type { Product } from "../../../types"
import { Card } from "../../../components/ui/card"
import { Link } from "react-router-dom"

type Props = {
  products: Product[]
}

export default function ProductCard({ products }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/products/${product.id}`}
        >
          <Card className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
            <img
              src={product.images?.[0] || "https://placehold.co/400"}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg line-clamp-1">
                {product.name}
              </h3>
              <div
                className="text-sm text-gray-500 line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: product.description || ""
                }}
              />
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">
                  {product.currency}{product.price}
                </span>
                <span className="text-yellow-500 text-sm">
                  ⭐ {product.rating ?? 0}
                </span>
              </div>
              <div className="text-xs text-gray-400">
                {product.brand} • {product.category}
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}