import { lazy } from "react"

const SettingsComponents = lazy(() => import("../../views/settings"))
const Settings = [
  {
    id: "settings",
    element: <SettingsComponents />,
    path: "/settings",
    meta: {
      // appLayout: true,
      className: "settings-application",
    },
  },
]
export default Settings
