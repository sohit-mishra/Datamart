import { useEffect, useState, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { getProduct } from "../api/productApi"

gsap.registerPlugin(useGSAP)

interface Product {
  id?: string
  name: string
  description: string
  brand: string
  category: string
  price: number
  currency: string
  stock: number
  images: string[]
}

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState("")

  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await getProduct(id as string)
        const productData: Product = data.data
        setProduct(productData)
        setSelectedImage(productData.images?.[0] || "")
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    console.log("Fd")

    if (id) fetchProduct()

  }, [id])


  useGSAP(() => {
    if (loading) return
    gsap.from(".fade-item", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    })

  }, { scope: container, dependencies: [loading] })


  const decodeHTML = (str: string) => {
    return str
      .replace(/\\u003C/g, "<")
      .replace(/\\u003E/g, ">")
  }

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading product...
      </div>
    )
  }

  if (!product) {
    return (
      <div className="p-10 text-center text-red-500">
        Product not found
      </div>
    )
  }

  return (
    <div ref={container} className="max-w-7xl mx-auto p-6 mt-16">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="fade-item">
          {selectedImage && (
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full rounded-xl border"
            />
          )}
          <div className="flex gap-3 mt-4 flex-wrap">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="product"
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover border rounded-lg cursor-pointer transition
                ${selectedImage === img ? "border-black" : "border-gray-200"}`}
              />
            ))}
          </div>
        </div>

        <div className="fade-item">
          <h1 className="text-3xl font-bold mb-2">
            {product.name}
          </h1>

          <div className="mt-14 fade-item">
            <h2 className="text-2xl font-semibold mb-4">
              Product Description
            </h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: decodeHTML(product.description)
              }}
            />
          </div>
          <p className="text-gray-500 mb-4">
            Brand: {product.brand} • Category: {product.category}
          </p>
          <p className="text-3xl font-semibold mb-6">
            {product.currency}{product.price}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Stock: {product.stock}
          </p>
          <div className="flex gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
              Add to Cart
            </button>
            <button className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition">
              Buy Now
            </button>
          </div>
          <Link
            to="/"
            className="text-blue-500 mt-6 block"
          >
            ← Back to Products
          </Link>
        </div>
      </div>

    </div>
  )
}