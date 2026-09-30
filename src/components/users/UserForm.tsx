import { useState } from "react"
import { isRole, ROLES, type CreateUser, type Role } from "../../types/user"

interface UserFormProps {
  onAddUser: (data: CreateUser) => void
}

type FormErrors = { [key: string]: string }

export default function UserForm({ onAddUser }: UserFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<Role | null>(null)
  const [error, setError] = useState<{ name?: string; email?: string }>({})

  function validate(): boolean {
    const newErrors: FormErrors = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!name.trim()) {
      newErrors.name = "Name is required"
    }
    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailPattern.test(email.trim())) {
      newErrors.email = "Email is invalid"
    }
    setError(newErrors)

    return Object.keys(newErrors).length === 0
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!validate()) {
      return
    }

    onAddUser({ name: name.trim(), email: email.trim(), role })

    setName("")
    setEmail("")
    setRole(null)
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            if (error.name) {
              setError((prevErrors) => ({ ...prevErrors, name: undefined }))
            }
          }}
        />
        {error.name && (
          <p style={{ color: "red", margin: "4px 0" }}>{error.name}</p>
        )}

        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error.email) {
              setError((prevErrors) => ({ ...prevErrors, email: undefined }))
            }
          }}
        />
        {error.email && (
          <p style={{ color: "red", margin: "4px 0" }}>{error.email}</p>
        )}

        <label htmlFor="role">Role</label>
        <select
          name="role"
          id="role"
          value={role ?? ""}
          onChange={(e) => {
            const selectedValue = e.target.value
            if (selectedValue === "") {
              setRole(null)
            } else if (isRole(selectedValue)) {
              setRole(selectedValue)
            }
          }}
        >
          <option value="">no role</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
