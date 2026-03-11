import type { Product } from "./types/product.types"

export const products: Product[] = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        description: "Latest Apple smartphone with A17 chip.",
        category: "Smartphone",
        brand: "Apple",
        stock: 15,
        rating: 4.8,
        images: [
            "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=800&q=80",
            "https://images.unsplash.com/photo-1628116709703-c1c9ad550d36?w=800&q=80",
            "https://images.unsplash.com/photo-1628329567705-f8f7150c3cff?w=800&q=80",
            "https://images.unsplash.com/photo-1655628143766-172ca2198096?w=800&q=80"
        ],
        created: "2025-02-10",
        price: 1199,
        currency: "$"
    },
    {
        id: 2,
        name: "MacBook Pro M3",
        description: "Powerful laptop for developers and designers.",
        category: "Laptop",
        brand: "Apple",
        stock: 8,
        rating: 4.9,
        images: [
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
        ],
        created: "2025-01-20",
        price: 2399,
        currency: "$"
    }
]