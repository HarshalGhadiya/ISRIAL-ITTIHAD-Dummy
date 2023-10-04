import { lazy } from "react"

const Profile = lazy(() => import("../../views/Profile/Profile"))
const ProfileArr = [
  {
    id: "Profile",
    element: <Profile />,
    path: "/profile",
    meta: {
      className: "profile-application",
    },
  },
]
export default ProfileArr
