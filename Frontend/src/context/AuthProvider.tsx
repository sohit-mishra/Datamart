import { useEffect, useState, type ReactNode } from "react"
import { AuthContext, type UserRole } from "./auth-context"
import axios from "axios"
import type { User } from "../types"



export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [loading, setLoading] = useState(true)

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  )

  const [user, setUser] = useState<User | null>(null)

  const [role, setRole] = useState<UserRole | null>(() =>
    localStorage.getItem("role") as UserRole | null
  )

  const login = (token: string, role: UserRole, user: User) => {

    localStorage.setItem("token", token)
    localStorage.setItem("role", role)
    setUser(user)
    setToken(token)
    setRole(role)

  }

  const logout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("role")

    setToken(null)
    setRole(null)
    setUser(null)

  }

  useEffect(() => {

    const fetchUser = async () => {

      const savedToken = localStorage.getItem("token")

      if (!savedToken) {
        setLoading(false)
        return
      }

      try {

        const url = `${import.meta.env.VITE_API_URL}auth/me`

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${savedToken}`
          }
        })

        const userData = res.data.data

        setToken(savedToken)
        setRole(userData.role)
        setUser(userData)

      } catch (error) {

        console.error("Auth check failed:", error)
        logout()

      } finally {

        setLoading(false)

      }

    }

    fetchUser()

  }, [])

  if (loading) return null

  return (
    <AuthContext.Provider value={{ token, role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}