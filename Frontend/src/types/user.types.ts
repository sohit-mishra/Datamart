export type UserRole = "owner" | "user"

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
  profile: string
  createdAt: string
}