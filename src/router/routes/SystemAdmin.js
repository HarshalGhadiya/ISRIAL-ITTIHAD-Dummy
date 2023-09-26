import { lazy } from "react"
const SystemAdminTable = lazy(() => import("../../views/SystemAdmin"))
const SystemAdminRoleType = lazy(() =>
  import("../../views/systemAdmin/SystemAdminTypeForm")
)
const SystemAdminEdit = lazy(() =>
  import("../../views/SystemAdmin/SystemAdmineditForm")
)
const SystemAdminaddForm = lazy(() =>
  import("../../views/SystemAdmin/SystemAdminaddForm")
)

const SystemAdmin = [
  {
    id: "systemAdmins",
    path: "/system-admins",
    element: <SystemAdminTable />,
    meta: {
      className: "system-application",
    },
  },
  {
    id: "systemAdmins",
    path: "/system-admins/:id",
    element: <SystemAdminEdit />,
    meta: {
      className: "system-application",
    },
  },
  {
    id: "systemAdmins",
    path: "/system-admins/new",
    element: <SystemAdminaddForm />,
    meta: {
      className: "system-application",
    },
  },
  {
    id: "systemAdmins",
    path: "/system-admins/type/:id",
    element: <SystemAdminRoleType />,
    meta: {
      className: "system-application",
    },
  },
  {
    id: "systemAdmins",
    path: "/system-admins/new-type",
    element: <SystemAdminRoleType />,
    meta: {
      className: "system-application",
    },
  },
]
export default SystemAdmin
