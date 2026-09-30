export interface Employee {
  id: number
  name: string
  email: string
}

export interface Developer extends Employee {
  programmingLanguages?: string[]
}

export type Manager = Employee & {
  teamSize?: number
}
