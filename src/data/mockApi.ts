import type { ApiResponse } from "../types/api"
import type { User } from "../types/user"

export async function fetchUsers(): Promise<ApiResponse<User[]>> {
  return new Promise<ApiResponse<User[]>>((resolve, reject) => {
    setTimeout(() => {
      const isError = Math.random() < 0.5
      if (isError) {
        reject(new Error("Failed to fetch users"))
        return
      }

      resolve({
        success: true,
        message: "User fetched successfully",
        data: [
          {
            id: 1,
            name: "Bobby Pratama",
            email: "[EMAIL_ADDRESS]",
            isActive: true,
            role: "Admin",
          },
          {
            id: 2,
            name: "Bobby Protomo",
            email: "[EMAIL_ADDRESS]",
            isActive: false,
            role: null,
          },
        ],
      })
    }, 2000)
  })
}
