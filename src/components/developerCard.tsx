import { type Developer, type Manager } from "../types/employee"

interface DeveloperCardProps {
  developer: Developer | Manager
}

function DeveloperCard({ developer }: DeveloperCardProps) {
  return (
    <div>
      <p>{developer.id}</p>
      <h2>{developer.name}</h2>
      <p>{developer.email}</p>
      {"programmingLanguages" in developer && (
        <p>{developer.programmingLanguages?.join(", ")}</p>
      )}
      {"teamSize" in developer && <p>{developer.teamSize}</p>}
    </div>
  )
}

export default DeveloperCard
