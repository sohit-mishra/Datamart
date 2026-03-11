import { useState, useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { profileImage } from "../api/uploadApi"
import { createProduct } from "../api/productApi"
import { toast } from "sonner"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import RichTextEditor from "../features/products/components/RichTextEditor"
import type { Product } from "../types"
import { useNavigate } from "react-router-dom"

export default function CreateProduct() {
    const naviagte = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null)
  const [imagesPreview, setImagesPreview] = useState<string[]>([])
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Omit<Product, "id" | "rating" | "created">>({
    name: "",
    description: "<p></p>",
    category: "",
    brand: "",
    stock: 0,
    images: [],
    price: 0,
    currency: ""
  })

  useGSAP(() => {
    gsap.from(".create-card", {
      y: 80,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
  }, { scope: containerRef })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value
    }))
  }

  const handleImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const fileArray = Array.from(files)
    try {
      const uploadedUrls: string[] = []
      for (const file of fileArray) {
        const preview = URL.createObjectURL(file)
        setImagesPreview(prev => [...prev, preview])
        if (!activeImage) setActiveImage(preview)
        const res = await profileImage(file)
        uploadedUrls.push(res.data.image)
      }
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }))
    } catch {
      toast.error("Image upload failed")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      await createProduct(formData)
      toast.success("Product created successfully")
      setFormData({
        name: "",
        description: "<p></p>",
        category: "",
        brand: "",
        stock: 0,
        images: [],
        price: 0,
        currency: ""
      })
      setImagesPreview([])
      setActiveImage(null)
      naviagte('/products');
    } catch {
      toast.error("Product creation failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center"
    >
      <div className="create-card max-w-6xl w-full bg-white rounded-2xl p-8 shadow">
        <h1 className="text-3xl font-bold mb-8">
          Create Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-10"
        >
          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium">
              Product Images
            </label>
            <div className="w-full h-[350px] border rounded-xl overflow-hidden flex items-center justify-center bg-gray-100">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt="Product"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-400">
                  Upload product images
                </span>
              )}
            </div>

            <div className="flex gap-3 flex-wrap">
              {imagesPreview.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="preview"
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-md object-cover border cursor-pointer ${activeImage === img ? "border-black" : ""}`}
                />
              ))}

              <label className="w-20 h-20 border-dashed border flex items-center justify-center rounded-md cursor-pointer text-sm text-gray-500">
                +
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImages}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <label className="text-sm font-medium">
                Product Name
              </label>
              <Input
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">
                  Brand
                </label>
                <Input
                  name="brand"
                  placeholder="Brand"
                  value={formData.brand}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Category
                </label>
                <Input
                  name="category"
                  placeholder="Category"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">
                  Price
                </label>
                <Input
                  name="price"
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Stock
                </label>
                <Input
                  name="stock"
                  type="number"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div>
              <label className="text-sm font-medium">
                Currency
              </label>
              <Input
                name="currency"
                placeholder="Currency ($, ₹, €)"
                value={formData.currency}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                Product Description
              </label>
              <RichTextEditor
                value={formData.description}
                onChange={(value) =>
                  setFormData(prev => ({
                    ...prev,
                    description: value
                  }))
                }
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-4 h-11 text-base"
            >
              {loading ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}