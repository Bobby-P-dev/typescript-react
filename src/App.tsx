import { useState } from "react"
import UserCard from "./components/UserCard"
import { ROLES, type CreateUser, type Role, type UpdateUser, type User } from "./types/user"
import type { Developer, Manager } from "./types/employee"
import DeveloperCard from "./components/developerCard"
import type { ApiResponse } from "./types/api"
import { employeeResponse, multipleUserResponse, userResponse } from "./data/mockResponse"

function App() {
//   const users: User[] = [{
//     id: 1,
//     name: "Bobby Pratama",
//     email: "bobbypratama772@gmail.com",
//     isActive: true,
//     role: "Admin"
//   },
//   {
//     id: 2,
//     name: "Bobby Pratama",
//     email: "bobbypratama772@gmail.com",
//     isActive: true,
//     role: "User"
//   }
// ]
const userWithoutRole: User = {
  id: 99,
  name: "Test User",
  email: "test@example.com",
  isActive: true,
}


function logRole(role: Role | undefined){
  if(role){
    console.log(role.toUpperCase())
  }
}


logRole("Admin")
logRole(userWithoutRole.role)

console.log(userWithoutRole.role)

const [users, setUsers] = useState<User[]>(
[{
    id: 1,
    name: "Bobby Pratama",
    email: "bobbypratama772@gmail.com",
    isActive: true,
    role: "Admin"
  },
  {
    id: 2,
    name: "Bobby Pratama",
    email: "bobbypratama772@gmail.com",
    isActive: true,
    // role: "User"
  }

])

const INITIAL_DEVELOPER : (Developer | Manager)[] = [
  {
    id: 1,
    name: "Bobby Pratama",
    email: "bobbypratama772@gmail.com",
    programmingLanguages: ["JavaScript", "Python", "Java", "penambahan dikit"]
  },
    {
    id: 2,
    name: "Bobby Pratama",
    email: "bobbypratama772@gmail.com",
    teamSize: 10
  }
]

// const CREATE_USER : CreateUser = {
//   // id: 1,
//   name: "Bobby Pratama",
//   email: "bobbypratama772@gmail.com",
//   isActive: true,
//   role: "Admin"
// }

// console.log(CREATE_USER)

// const UPDATE_USER: UpdateUser[]= [{
//   name: "Bobby Pratama",
// },{
//   role: "Admin"
// }]


// const UPDATE_USERV2: UpdateUser= {
//   name: "Bobby PratamO",
// }

// console.log(UPDATE_USERV2)

// console.log(UPDATE_USER)

const [name, setName] = useState<string>("")
const [email, setEmail] = useState<string>("")
const [role, setRole] = useState<Role | null>(null)
// const [isActive, setIsActive] = useState<boolean>(false)



const nextId = Math.max(0, ...users.map(user => user.id)) + 1

function getResponse<T>(response: ApiResponse<T>): T{
return response.data
}

const user = getResponse(userResponse)

console.log("user: ", user)

const getMultipleResponse = getResponse(multipleUserResponse)

console.log("getMultipleResponse: ", getMultipleResponse)

const employeeResponses = getResponse(employeeResponse) 

console.log("employeeResponses: ", employeeResponses)



function handleDelete(id:number): void{
  setUsers((currentUsers) => currentUsers.filter((user) => user.id !== id))  
}

function handleToggle(id:number): void{
  setUsers((currentUsers) => currentUsers.map((user) => user.id === id ? {...user, isActive: !user.isActive} : user))
}

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()

  if(!name || !email){
    alert("Please fill all the fields")
    return
  }

  const newUser: User ={
    id: nextId,
    name,
    email,
    isActive: true,
    role
  }

  setUsers((currentUsers) => [...currentUsers, newUser])

  setName("")
  setEmail("")
  setRole(null)
}

  return (
    <div>
      <h1>ERP DASHBOARD</h1>
      {users.map((user) =>(
          <UserCard
          key={user.id}
          user={user}
          userList={users}
          onDelete={handleDelete}
          onToggle={handleToggle}
          />  
    )
    )}
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        
        <label htmlFor="email">Email</label>
        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        
        <label htmlFor="role">Role</label>
         <select name="role" id="role" value={role ?? ""} onChange={(e) => setRole(e.target.value === "" ? null : e.target.value as Role)}>
                     <option value="">no role</option>
               {
                 ROLES.map((role) => (
                    <option key={role} value={role}>{role}</option>
                ))
               }
            </select>
        <button>Add</button>
      </form>
    </div>
 <br />
    <div>
      {INITIAL_DEVELOPER.map((developer) => (
        <DeveloperCard key={developer.id} developer={developer} />
      ))}
    </div>

    </div>
  )
}

export default App