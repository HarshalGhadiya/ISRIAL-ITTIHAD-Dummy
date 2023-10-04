// ** React Imports
import { Fragment } from "react"

// route imports
import Users from "./User"
import Pages from "./Pages"
import Comments from "./Comments"
import BadWords from "./HarmfulWords"
import Settings from "./Settings"
import SystemAdminRoute from "./SystemAdmin"
import ProfileArr from "./Profile"

import { Navigate } from "react-router-dom"

// ** Layouts
import BlankLayout from "@layouts/BlankLayout"
import VerticalLayout from "@src/layouts/VerticalLayout"
import HorizontalLayout from "@src/layouts/HorizontalLayout"
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper"

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute"
import PrivateRoute from "@components/routes/PrivateRoute"

// ** Utils
import { isObjEmpty } from "@utils"

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
}

// ** Document title
const TemplateTitle = "System back office"

// ** Default Route

const findFirstExistingSection = () => {
  const PermissionArray =
    localStorage.getItem("userData") &&
    JSON.parse(localStorage.getItem("userData"))

  const sectionOrder = [
    "users",
    "pages",
    "comments",
    "systemAdmins",
    "harmfulWords",
    "settings",
  ]

  for (const sectionName of sectionOrder) {
    const foundSection = PermissionArray?.permissions?.find(
      (item) => item.section === sectionName
    )

    if (foundSection && foundSection?.permissions?.read) {
      switch (sectionName) {
        case "users":
          return "/users"
        case "pages":
          return "/pages"
        case "comments":
          return "/comments"
        case "systemAdmins":
          return "/system-admins"
        case "harmfulWords":
          return "/harmful-words"
        case "settings":
          return "/settings" // Replace with your custom value
        default:
          return "/login" // Replace with your default value
      }
    }
  }
}
const DefaultRoute = findFirstExistingSection()
console.log(DefaultRoute, "default")
// ** Merge Routes
const Routes = [
  ...SystemAdminRoute,
  ...Users,
  ...Pages,
  ...Comments,
  ...BadWords,
  ...Settings,
  ...ProfileArr,
]

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta }
    } else {
      return {}
    }
  }
}

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = []

  if (Routes) {
    Routes.filter((route) => {
      let Role = JSON.parse(localStorage.getItem("userData"))
      const sectionExists = Role?.permissions?.filter(
        (item) => item.section === route.id
      )
      let isBlank = false
      const RouteAdd = () => {
        let RouteTag = PrivateRoute
        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false)
          RouteTag = route.meta.publicRoute ? PublicRoute : PrivateRoute
        }
        if (route.element) {
          const Wrapper =
            isObjEmpty(route.element.props) && isBlank === false
              ? LayoutWrapper
              : Fragment

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          )
        }
        // Push route to LayoutRoutes
        LayoutRoutes.push(route)
      }

      if (sectionExists && sectionExists[0]?.permissions?.read) {
        if (
          (route.meta && route.meta.layout && route.meta.layout === layout) ||
          ((route.meta === undefined || route.meta.layout === undefined) &&
            defaultLayout === layout)
        ) {
          // const userRole = "all" //this is static for now, it will dynamic by api

          if (sectionExists?.length !== 0) {
            if (sectionExists[0]?.permissions?.read) {
              RouteAdd(route)
            }
          }
        }
        return LayoutRoutes
      } else {
        const routePermission = route?.id
        if (sectionExists?.length === 0 && routePermission === "Profile") {
          RouteAdd(route)
        }
      }
    })
  }
  return LayoutRoutes
}

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical"
  const layouts = ["vertical", "horizontal", "blank"]

  const AllRoutes = []

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    })
  })
  return AllRoutes
}

export {
  DefaultRoute,
  TemplateTitle,
  Routes,
  getRoutes,
  findFirstExistingSection,
}
