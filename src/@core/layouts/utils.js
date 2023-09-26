/* eslint-disable implicit-arrow-linebreak */
// ** React Imports
import { useContext } from "react"
import { AbilityContext } from "@src/utility/context/Can"

/**
 * Return which component to render based on it's data/context
 * @param {Object} item nav menu item
 */
export const resolveVerticalNavMenuItemComponent = (item) => {
  if (item.header) return "VerticalNavMenuSectionHeader"
  if (item.children) return "VerticalNavMenuGroup"
  return "VerticalNavMenuLink"
}

/**
 * Return which component to render based on it's data/context
 * @param {Object} item nav menu item
 */
export const resolveHorizontalNavMenuItemComponent = (item) => {
  if (item.children) return "HorizontalNavMenuGroup"
  return "HorizontalNavMenuLink"
}

/**
 * Check if nav-link is active
 * @param {Object} link nav-link object
 */
export const isNavLinkActive = (link, currentURL, routerProps) => {
  return (
    currentURL === link ||
    (routerProps &&
      routerProps.meta &&
      routerProps.meta.navLink &&
      routerProps.meta.navLink === link)
  )
  // return currentURL === link
}

/**
 * Check if the given item has the given url
 * in one of its children
 *
 * @param item
 * @param activeItem
 */
export const hasActiveChild = (item, currentUrl) => {
  const { children } = item

  if (!children) {
    return false
  }

  for (const child of children) {
    if (child.children) {
      if (hasActiveChild(child, currentUrl)) {
        return true
      }
    }

    // Check if the child has a link and is active
    if (
      child &&
      child.navLink &&
      currentUrl &&
      (child.navLink === currentUrl || currentUrl.includes(child.navLink))
    ) {
      return true
    }
  }

  return false
}

/**
 * Check if this is a children
 * of the given item
 *
 * @param children
 * @param openGroup
 * @param currentActiveGroup
 */
export const removeChildren = (children, openGroup, currentActiveGroup) => {
  children.forEach((child) => {
    if (!currentActiveGroup.includes(child.id)) {
      const index = openGroup.indexOf(child.id)
      if (index > -1) openGroup.splice(index, 1)
      if (child.children)
        removeChildren(child.children, openGroup, currentActiveGroup)
    }
  })
}

const checkForVisibleChild = (arr, ability) => {
  return arr.some((i) => {
    if (i.children) {
      return checkForVisibleChild(i.children, ability)
    } else {
      return ability.can(i.action, i.resource)
    }
  })
}

export const canViewMenuGroup = (item) => {
  const ShowHide = false
  let userRole = "all"

  const groupPermission = item?.Permissions

  if (groupPermission) {
    if (groupPermission.indexOf("all") >= 0) {
      return !ShowHide
    } else if (groupPermission.indexOf(userRole) >= 0) {
      return !ShowHide
    } else {
      return ShowHide
    }
  } else {
    if (item.children.some((i) => i.Permissions?.indexOf(userRole) >= 0)) {
      return ShowHide
    }
    if (item.children.some((i) => i.Permissions?.indexOf("all") >= 0)) {
      return ShowHide
    }
  }
}
export const canViewMenuItem = (item) => {
  const ShowHide = false
  let Role = JSON.parse(localStorage.getItem("userData"))

  // ** filter sidebar access based on role-access
  const Permit = Role.permissions.find((i) => i.section === item.id)
  const itemPermission = Permit?.permissions
  if (itemPermission) {
    if (itemPermission?.read && itemPermission?.write) {
      return !ShowHide
    } else if (itemPermission?.read) {
      return !ShowHide
    } else {
      ShowHide
    }
  } else {
    !ShowHide
  }
}
