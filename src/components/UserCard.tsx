import { type Employee } from "../types/employee"

interface UserCardProps {
  employee: Employee
  onDelete: (id: number) => void
}

function UserCard({ employee, onDelete }: UserCardProps) {
  return (
    <div>
      <p>{employee.id}</p>
      <p>{employee.nik}</p>
      <h2>{employee.name}</h2>
      <p>{employee.departemen}</p>
      <p>{employee.position}</p>
      <button onClick={() => onDelete(employee.id)}>Delete</button>
    </div>
  )
}

export default UserCard
