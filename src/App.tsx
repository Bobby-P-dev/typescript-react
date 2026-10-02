import { useEffect, useState } from "react"
import UserList from "./components/users/UserList"
import UserForm from "./components/users/UserForm"
import type { CreateEmployee, Employee } from "./types/employee"
import { fetchEmployee, storeEmployee } from "./services/employeeService"

function App() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)

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

  async function handleAddEmployee(data: CreateEmployee): Promise<void> {
    try {
      setIsAdding(true)
      setCreateError(null)

      const cleanData: CreateEmployee = {
        nik: data.nik,
        name: data.name,
        departemen: data.departemen,
        position: data.position,
      }

      const response = await storeEmployee(cleanData)

      setEmployees((currentEmployees) => [...currentEmployees, response.data])
    } catch (err) {
      if (err instanceof Error) {
        setCreateError(err.message)
      } else {
        setCreateError("Failed to create employee")
      }
    } finally {
      setIsAdding(false)
    }
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
          <UserForm onAddEmployee={handleAddEmployee} isLoading={isAdding} />
          {createError && (
            <p style={{ color: "red", margin: "4px 0" }}>{createError}</p>
          )}
        </>
      )}
    </div>
  )
}

export default App
