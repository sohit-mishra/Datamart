import type { User, UserRole } from "./user.types"

export interface Auth {
  token: string
  user: User
}

export interface Login{
  email: string
  password: string
}


export interface Singup{
    name: string
    email: string
    role: UserRole
    profile: string
    password: string
}

export interface UpdateProfilePayload {
  name: string
  email: string
  profile?: string
}