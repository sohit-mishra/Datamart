import { useState, useRef } from "react"
import { useAuth } from "../context/useAuth"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { profileImage } from "../api/uploadApi"
import { updateProfile } from "../api/userApi"
import { toast } from "sonner"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useNavigate } from "react-router-dom"

export default function Profile() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(user?.profile || null)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    profile: user?.profile || ""
  })
  const [loading, setLoading] = useState(false)

  useGSAP(() => {
    gsap.from(containerRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out"
    })
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      await updateProfile(formData)
      toast.success("Profile updated")
      setTimeout(() => {
        navigate(0)
      }, 1000)
    } catch (error) {
      console.error(error)
      toast.error("Profile update failed")
    } finally {
      setLoading(false)
    }
  }

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const previewUrl = URL.createObjectURL(file)
    setPreview(previewUrl)
    try {
      const res = await profileImage(file)
      const imageUrl = res.data.image
      setPreview(imageUrl)
      const updatedData = {
        ...formData,
        profile: imageUrl
      }
      setFormData(updatedData)
      await updateProfile(updatedData)
      toast.success("Profile image updated")
            setTimeout(() => {
        navigate(0)
      }, 1000)
    } catch {
      toast.error("Upload failed")
    }
  }

  if (!user) return null

  return (
    <div className="p-8 mt-16 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        Profile Update
      </h1>
      <div
        ref={containerRef}
        className="grid md:grid-cols-3 gap-8"
      >
        <Card className="p-8 flex flex-col items-center gap-6 shadow-lg">
          <div
            onClick={() => fileRef.current?.click()}
            className="w-36 h-36 rounded-full border-4 border-gray-200 overflow-hidden cursor-pointer hover:scale-105 transition"
          >
            {preview ? (
              <img
                src={preview}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-400">
                Upload
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />
          <div className="text-center">
            <p className="font-semibold text-lg">{user.name}</p>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => fileRef.current?.click()}
          >
            Change Photo
          </Button>
        </Card>
        <Card className="p-8 shadow-lg md:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Name
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Email
              </label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto"
              >
                {loading ? "Updating..." : "Update Details"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}