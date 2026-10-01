import type { ApiResponse } from "../types/api"
import type { Employee } from "../types/employee"

export async function fetchEmployee(): Promise<ApiResponse<Employee[]>> {
  const res = await fetch(`${import.meta.env.VITE_CONFIG}/api/user`)

  const data: ApiResponse<Employee[]> = await res.json()

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch employees")
  }

  return data
}
