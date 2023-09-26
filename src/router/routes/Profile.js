import { lazy } from "react"

const Profile = lazy(() => import("../../views/Profile"))
const ProfileArr = [
  {
    id: "Profile",
    element: <Profile />,
    path: "/profile",
    meta: {
      appLayout: true,
      className: "profile-application",
    },
  },
]
export default ProfileArr
