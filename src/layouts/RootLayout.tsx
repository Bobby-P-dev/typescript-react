import { NavLink, Outlet } from "react-router-dom"

export default function RootLayout() {
  return (
    <div>
      <nav
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
          borderBottom: "1px solid #ccc",
        }}
      >
        <NavLink to="/" end>
          Welcome
        </NavLink>
        <NavLink to="/dashboard">Device Dashboard</NavLink>
      </nav>

      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  )
}
