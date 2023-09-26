import { lazy } from "react"
import Edituser from "../../views/users/Edituser"

const Users = lazy(() => import("../../views/users"))
const Pages = [
  {
    id: "users",
    element: <Users />,
    path: "/users",
    meta: {
      //appLayout: true,
      className: "users-application",
    },
  },
  {
    id: "users",
    element: <Edituser />,
    path: "/edit-users/:id",
    meta: {
      //appLayout: true,
      className: "users-application",
    },
  },
]
export default Pages
