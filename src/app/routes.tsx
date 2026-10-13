import { createBrowserRouter, type RouteObject } from "react-router-dom"
import RootLayout from "../layouts/RootLayout"
import App from "../App"
import DashboardOverviewPage from "../pages/DashboardOverviewPage"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "dashboard",
        element: <DashboardOverviewPage />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
