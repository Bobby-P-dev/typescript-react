import type { ApiResponse } from "../types/api"
import type { Device } from "../types/device"

const API_URL = import.meta.env.VITE_CONFIG

export async function fetchDevices(): Promise<ApiResponse<Device[]>> {
  const res = await fetch(`${API_URL}api/v1/devices`)

  const data: ApiResponse<Device[]> = await res.json()

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch devices")
  }

  return data
}
