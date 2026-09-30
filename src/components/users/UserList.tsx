import type { User } from "../../types/user"
import UserCard from "../UserCard"

interface UserListProps {
  users: User[]
  onDelete: (id: number) => void
  onToggle: (id: number) => void
}

export default function UserList({ users, onDelete, onToggle }: UserListProps) {
  return (
    <div>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}
