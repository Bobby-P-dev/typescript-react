import { useState } from "react"
import { type CreateUser, type User } from "./types/user"
import UserList from "./components/users/UserList"
import UserForm from "./components/users/UserForm"

function App() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Bobby Pratama",
      email: "bobbypratama772@gmail.com",
      isActive: true,
      role: "Admin",
    },
    {
      id: 2,
      name: "Bobby Pratama",
      email: "bobbypratama772@gmail.com",
      isActive: true,
      role: null,
    },
  ])

  function handleAddUser(data: CreateUser) {
    setUsers((currentUsers) => {
      const nextId = Math.max(0, ...currentUsers.map((user) => user.id)) + 1

      const newUser: User = {
        id: nextId,
        isActive: true,
        ...data,
      }

      return [...currentUsers, newUser]
    })
  }

  function handleDelete(id: number): void {
    setUsers((currentUsers) => currentUsers.filter((user) => user.id !== id))
  }

  function handleToggle(id: number): void {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive } : user,
      ),
    )
  }

  return (
    <div>
      <h1>ERP DASHBOARD</h1>
      <UserList users={users} onDelete={handleDelete} onToggle={handleToggle} />
      <UserForm onAddUser={handleAddUser} />
    </div>
  )
}

export default App
