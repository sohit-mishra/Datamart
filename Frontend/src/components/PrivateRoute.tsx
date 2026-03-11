import { Navigate } from "react-router-dom"
import type{ ReactNode } from "react"
import { useAuth } from "../context/useAuth"
import type { UserRole } from "../types"

interface Props {
  children: ReactNode
  roles?: UserRole[]
}

export default function PrivateRoute({ children, roles }: Props) {
  const { token, role } = useAuth()
  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (roles && !roles.includes(role!)) {
    return <Navigate to="/" replace />
  }
  return <>{children}</>
}