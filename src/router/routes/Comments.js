import { lazy } from "react"

const CommentsComponents = lazy(() => import("../../views/comments"))
const EditComment = lazy(() => import('../../views/comments/EditComment'))
const Comments = [
  {
    id: "comments",
    element: <CommentsComponents />,
    path: "/comments",
    meta: {
      //appLayout: true,
      className: "comments-application",
    },
    Permissions: [
      "all",
      "israel-admin",
      "ittihad-admin",
      "israel-comment-admin",
      "ittihad-comment-admin",
      "israel-user",
      "ittihad-user",
    ],
  },
  {
    id: "comments",
    element: <EditComment/>,
    path: "/comments/edit/:id",
    meta: {
      // appLayout: true,
      className: "comments-application",
    },
    Permissions: [
      "all",
      "israel-admin",
      "ittihad-admin",
      "israel-comment-admin",
      "ittihad-comment-admin",
      "israel-user",
      "ittihad-user",
    ],
  },
]
export default Comments
