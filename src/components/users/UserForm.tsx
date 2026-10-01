import { useState } from "react"
import type { CreateEmployee } from "../../types/employee"

interface UserFormProps {
  onAddEmployee: (data: CreateEmployee) => void
  isLoading?: boolean
}

type FormErrors = Partial<Record<keyof CreateEmployee, string>>

const initialFormState: CreateEmployee = {
  nik: "",
  name: "",
  departemen: "",
  position: "",
}

export default function UserForm({
  onAddEmployee,
  isLoading = false,
}: UserFormProps) {
  const [formData, setFormData] = useState<CreateEmployee>(initialFormState)
  const [error, setError] = useState<FormErrors>({})

  function validate(): boolean {
    const newErrors: FormErrors = {}

    if (!formData.nik.trim()) {
      newErrors.nik = "NIK is required"
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.departemen.trim()) {
      newErrors.departemen = "Departemen is required"
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position is required"
    }

    setError(newErrors)

    return Object.keys(newErrors).length === 0
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setFormData((prev) => ({ ...prev, [name]: value }))

    if (error[name as keyof CreateEmployee]) {
      setError((prevErrors) => ({ ...prevErrors, [name]: undefined }))
    }
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!validate()) {
      return
    }

    onAddEmployee({
      nik: formData.nik.trim(),
      name: formData.name.trim(),
      departemen: formData.departemen.trim(),
      position: formData.position.trim(),
    })

    setFormData(initialFormState)
    setError({})
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="nik">NIK</label>
          <input
            type="text"
            id="nik"
            name="nik"
            value={formData.nik}
            onChange={handleChange}
          />
          {error.nik && (
            <p style={{ color: "red", margin: "4px 0" }}>{error.nik}</p>
          )}
        </div>

        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {error.name && (
            <p style={{ color: "red", margin: "4px 0" }}>{error.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="departemen">Departemen</label>
          <input
            type="text"
            id="departemen"
            name="departemen"
            value={formData.departemen}
            onChange={handleChange}
          />
          {error.departemen && (
            <p style={{ color: "red", margin: "4px 0" }}>{error.departemen}</p>
          )}
        </div>

        <div>
          <label htmlFor="position">Position</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
          {error.position && (
            <p style={{ color: "red", margin: "4px 0" }}>{error.position}</p>
          )}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  )
}
