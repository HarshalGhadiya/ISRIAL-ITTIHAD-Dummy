// ** Router imports
import { lazy } from "react"

// ** Router imports
import { useRoutes, Navigate } from "react-router-dom"

// ** Layouts
import BlankLayout from "@layouts/BlankLayout"

// ** Hooks Imports
import { useLayout } from "@hooks/useLayout"

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from "../utility/Utils"

// ** GetRoutes
import { getRoutes } from "./routes"

// ** Components
const Error = lazy(() => import("../views/Error"))
const Login = lazy(() => import("../views/Login"))
const NotAuthorized = lazy(() => import("../views/NotAuthorized"))
const Register = lazy(() => import("../views/Register"))
const ForgotPassword = lazy(() => import("../views/ForgotPassword"))
const Otpcode = lazy(() => import("../views/Otpcode"))
const ResetPassword = lazy(() => import("../views/ResetPassword"))
const Articalpage = lazy(() => import("../views/Articalpage/Articalpage"))

const Router = () => {
  // ** Hooks
  const { layout } = useLayout()

  const allRoutes = getRoutes(layout)

  const getHomeRoute = () => {
    const user = getUserData()
    if (user) {
      return getHomeRouteForLoggedInUser(user.role)
    } else {
      return "/login"
    }
  }

  const routes = useRoutes([
    {
      path: "/",
      index: true,
      element: <Navigate replace to={getHomeRoute()} />,
    },
    {
      path: "/artical",
      element: <BlankLayout />,
      children: [{ path: "/artical", element: <Articalpage /> }],
    },
    {
      path: "/login",
      element: <BlankLayout />,
      children: [{ path: "/login", element: <Login /> }],
    },

    {
      path: "/otp-code",
      element: <BlankLayout />,
      children: [{ path: "/otp-code", element: <Otpcode /> }],
    },
    {
      path: "/register",
      element: <BlankLayout />,
      children: [{ path: "/register", element: <Register /> }],
    },

    {
      path: "/forgot-password",
      element: <BlankLayout />,
      children: [{ path: "/forgot-password", element: <ForgotPassword /> }],
    },
    {
      path: "/reset-password",
      element: <BlankLayout />,
      children: [{ path: "/reset-password", element: <ResetPassword /> }],
    },
    {
      path: "/auth/not-auth",
      element: <BlankLayout />,
      children: [{ path: "/auth/not-auth", element: <NotAuthorized /> }],
    },
    {
      path: "*",
      element: <BlankLayout />,
      children: [{ path: "*", element: <Error /> }],
    },
    ...allRoutes,
  ])

  return routes
}

export default Router
