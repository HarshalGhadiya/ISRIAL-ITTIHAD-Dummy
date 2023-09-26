import { lazy } from "react"

const PagesComponents = lazy(() => import("../../views/pages"))
const EditPage = lazy(()=>  import("../../views/pages/addEditPages"))

const Pages = [
  {
    id: "pages",
    element: <PagesComponents />,
    path: "/pages",
    meta: {
      // appLayout: true,
      className: "pages-application",
    },
  },
  {
    id: "pages",
    element: <EditPage />,
    path: "/pages/add",
    meta: {
      // appLayout: true,
      className: "pages-application",
    },
  },
  {
    id: "pages",
    element: <EditPage />,
    path: "/pages/edit/:id",
    meta: {
      // appLayout: true,
      className: "pages-application",
    },
  },
]
export default Pages
