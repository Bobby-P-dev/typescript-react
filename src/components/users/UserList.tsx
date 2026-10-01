import type { Employee } from "../../types/employee"
import UserCard from "../UserCard"

interface UserListProps {
  employees: Employee[]
  onDelete: (id: number) => void
}

export default function UserList({ employees, onDelete }: UserListProps) {
  return (
    <div>
      {employees.map((employee) => (
        <UserCard key={employee.id} employee={employee} onDelete={onDelete} />
      ))}
    </div>
  )
}
