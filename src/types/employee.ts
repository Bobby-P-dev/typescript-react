export interface Employee {
  id: number
  nik: string
  name: string
  departemen: string
  position: string
}

export type CreateEmployee = Omit<Employee, "id">
