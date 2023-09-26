import { lazy } from "react"

const HarmFulWords = lazy(() => import("../../views/HarmfulWord/HarmfulWord"))
const HarmFulWordsEdit = lazy(() =>
  import("../../views/HarmfulWord/EditharmfulWord")
)
const BadWords = [
  {
    id: "harmfulWords",
    element: <HarmFulWords />,
    path: "/harmful-words",
    meta: {
      // appLayout: true,
      className: "harmful-word-application",
    },

  },
  {
    id: "harmfulWords",
    element: <HarmFulWordsEdit />,
    path: "/harmful-words/add",
    meta: {
      // appLayout: true,
      className: "harmful-word-application",
    },

  },
  {
    id: "harmfulWords",
    element: <HarmFulWordsEdit />,
    path: "/harmful-words/edit/:id",
    meta: {
      // appLayout: true,
      className: "harmful-word-application",
    },

  },
]
export default BadWords
