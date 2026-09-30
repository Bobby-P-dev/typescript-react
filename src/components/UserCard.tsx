import { type User, type UserList } from "../types/user"

interface UserCardProps {
  user: User
  userList?: UserList[]
  onDelete: (id: number) => void
  onToggle: (id: number) => void
}

function UserCard({ user, userList, onDelete, onToggle }: UserCardProps) {
  return (
    <div>
      <p>{user.id}</p>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.isActive ? "Active" : "Inactive"}</p>
      <p>{user.role?.toUpperCase() ?? "No role assigned"}</p>
      <select name="userList" id="userList">
        {userList?.map((userList) => (
          <option key={userList.id} value={userList.id}>
            {userList.name}
          </option>
        ))}
      </select>

      <button onClick={() => onDelete(user.id)}>Delete</button>
      <button onClick={() => onToggle(user.id)}>Toggle</button>
    </div>
  )
}

export default UserCard
