import { createContext } from "react"
import type { User } from "../types"

export type UserRole = "user" | "owner"

export interface AuthContextType {
    token: string | null
    role: UserRole | null
    user: User | null
    login: (token: string, role: UserRole, user: User) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)