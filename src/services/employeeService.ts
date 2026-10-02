import type { ApiResponse } from "../types/api"
import type { CreateEmployee, Employee } from "../types/employee"

const API_URL = import.meta.env.VITE_CONFIG

export async function fetchEmployee(): Promise<ApiResponse<Employee[]>> {
  const res = await fetch(`${API_URL}api/v1/users`)

  const data: ApiResponse<Employee[]> = await res.json()

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch employees")
  }

  return data
}

export async function storeEmployee(
  payload: CreateEmployee,
): Promise<ApiResponse<Employee>> {
  const res = await fetch(`${API_URL}api/v1/users/store`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  })

  const data: ApiResponse<Employee> = await res.json()

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to create employee")
  }

  return data
}
