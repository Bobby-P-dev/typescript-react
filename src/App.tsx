import { useEffect, useState } from "react"
import UserList from "./components/users/UserList"
import UserForm from "./components/users/UserForm"
import type { CreateEmployee, Employee } from "./types/employee"
import { fetchEmployee } from "./services/employeeService"

function App() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadEmployees() {
      try {
        const response = await fetchEmployee()
        console.log("response", response)

        setEmployees(response.data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("Failed to fetch users")
        }
      } finally {
        setLoading(false)
      }
    }
    loadEmployees()
  }, [])

  function handleAddUser(data: CreateEmployee) {
    setEmployees((currentEmployees) => {
      const nextId = Math.max(0, ...currentEmployees.map((user) => user.id)) + 1

      const newEmployee: Employee = {
        id: nextId,
        nik: data.nik,
        name: data.name,
        departemen: data.departemen,
        position: data.position,
      }

      return [...currentEmployees, newEmployee]
    })
  }

  function handleDelete(id: number): void {
    setEmployees((currentEmployees) =>
      currentEmployees.filter((user) => user.id !== id),
    )
  }

  return (
    <div>
      <h1>ERP DASHBOARD</h1>

      {loading && <div>Loading...</div>}
      {!loading && error && <div>Error: {error}</div>}
      {!loading && !error && (
        <>
          <UserList employees={employees} onDelete={handleDelete} />
          <UserForm onAddEmployee={handleAddUser} />
        </>
      )}
    </div>
  )
}

export default App
