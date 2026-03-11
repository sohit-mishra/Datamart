import { useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Link } from "react-router-dom"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import type { Singup, UserRole } from "../types"
import { signup } from "../api/userApi"
import { profileImage } from "../api/uploadApi"
import { toast } from "sonner"

export default function SignupPage() {
  const formRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState<Singup>({
    name: "",
    email: "",
    role: "user",
    profile: "",
    password: ""
  })

  useGSAP(() => {
    gsap.from(formRef.current, {
      y: 80,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
  }, { scope: formRef })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleRoleChange = (value: UserRole) => {
    setFormData({
      ...formData,
      role: value
    })
  }

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const localPreview = URL.createObjectURL(file)
    setPreview(localPreview)
    try {
      setUploading(true)
      const res = await profileImage(file)
      const uploadedImage = res.data.image
      setFormData((prev) => ({
        ...prev,
        profile: uploadedImage
      }))
      setPreview(uploadedImage)
      toast.success("Image uploaded successfully")
    } catch (error) {
      console.error("Image upload failed", error)
      toast.error("Image upload failed")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await signup(formData)
      console.log("Signup success:", res)
      toast.success("Account created successfully!")
      setFormData({
        name: "",
        email: "",
        role: "user",
        profile: "",
        password: ""
      })
      setPreview(null)
      if (fileRef.current) {
        fileRef.current.value = ""
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Signup failed"
      console.error("Signup failed:", message)
      toast.error(message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div ref={formRef}>
        <Card className="w-[420px] shadow-2xl border-0">
          <CardHeader className="text-center space-y-3 pt-8">
            <div className="flex justify-center">
              <div
                onClick={() => fileRef.current?.click()}
                className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden hover:border-blue-500 transition"
              >
                {preview ? (
                  <img
                    src={preview}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-gray-500">
                    {uploading ? "Uploading..." : "Upload"}
                  </span>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </div>
            <CardTitle className="text-2xl font-bold">
              Create Account
            </CardTitle>
            <CardDescription>
              Fill the details to create account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Select
                value={formData.role}
                onValueChange={(value: UserRole) => handleRoleChange(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="owner">Owner</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Button
                type="submit"
                className="w-full h-11 text-base"
                disabled={
                  formData.name === "" ||
                  formData.email === "" ||
                  formData.password.length < 8 ||
                  formData.profile === ""
                }
              >
                Sign Up
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-gray-500">
            <span>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </Link>
            </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}