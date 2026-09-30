import type { ApiResponse } from "../types/api"
import type { User } from "../types/user"
import type { Developer } from "../types/employee"

export const userResponse: ApiResponse<User> = {
  success: true,
  message: "User fetched successfully",
  data: {
    id: 1,
    name: "Bobby Pratama",
    email: "[EMAIL_ADDRESS]",
    isActive: true,
    role: "Admin",
  },
}

export const multipleUserResponse: ApiResponse<User[]> = {
  success: true,
  message: "2 users fetched successfully",
  data: [
    {
      id: 0,
      name: "user 1",
      email: "user1@gmail.com",
      isActive: false,
      role: null,
    },
    {
      id: 1,
      name: "user 2",
      email: "user2@gmail.com",
      isActive: false,
      role: null,
    },
  ],
}

export const employeeResponse: ApiResponse<Developer> = {
  success: true,
  message: "Employee fetched successfully",
  data: {
    id: 1,
    name: "Bobby Pratama",
    email: "[EMAIL_ADDRESS]",
    programmingLanguages: ["JavaScript", "Python", "Java"],
  },
}
