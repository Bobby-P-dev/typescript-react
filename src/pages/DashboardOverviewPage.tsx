import { useEffect, useState } from "react"
import type { Device } from "../types/device"
import { fetchDevices } from "../services/deviceService"

function DashboardOverviewPage() {
  const [devices, setDevices] = useState<Device[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadDevices() {
      try {
        const response = await fetchDevices()
        setDevices(response.data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("Failed to fetch devices")
        }
      } finally {
        setLoading(false)
      }
    }
    loadDevices()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>Dashboard Overview</h1>
      <ul>
        {devices.map((device) => (
          <li key={device.id}>
            {device.name} - {device.type} - {device.state} -
            {device.connected ? "Online" : "Offline"}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DashboardOverviewPage
