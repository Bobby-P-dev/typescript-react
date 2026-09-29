export const ROLES = ["Admin", "User", "Editor"] as const

export type Role = (typeof ROLES)[number]

export interface User{
    id: number
    name: string
    email: string
    isActive: boolean
    role?: Role | null
}

export type CreateUser = Omit<User, "id">

export type UpdateUser = Partial<Omit<User, "id">>

export type UserList = Pick<User, "id" | "name">