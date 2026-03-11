import { useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
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
import { Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { login as loginApi } from "../api/userApi"
import { toast } from "sonner"
import { useAuth } from "../context/useAuth"

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const formRef = useRef<HTMLDivElement>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  useGSAP(() => {
    gsap.from(formRef.current, {
      y: 70,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out"
    })
  }, { scope: formRef })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await loginApi(formData)
      console.log("Login success:", res)
      const { token, user } = res
      login(token, user.role, user)
      toast.success("Login successful!")
      setFormData({
        email: "",
        password: ""
      })
      navigate("/")
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Login failed"
      console.error("Login failed:", message)
      toast.error(message)
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div ref={formRef}>
        <Card className="w-[420px] shadow-2xl border-0">
          <CardHeader className="text-center space-y-2 pt-8">
            <CardTitle className="text-2xl font-bold">
              Login to Datamart
            </CardTitle>
            <CardDescription>
              Enter your email and password to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="h-11"
                required
              />
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-11 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <Button
                type="submit"
                className="w-full h-11 text-base font-medium"
                disabled={!formData.email || !formData.password}
              >
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-gray-500">
            <span>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign Up
              </Link>
            </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}