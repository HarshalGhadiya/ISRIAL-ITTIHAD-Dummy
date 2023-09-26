// ** React Imports
import { useEffect } from "react"
import { NavLink } from "react-router-dom"
import Ittihadlogo from "../../../../../assets/images/logo/ittihad-logo.png"
import IttihadlogoSmall from "../../../../../assets/images/logo/ittihad-small-logo.png"

import IsraellogoSmall from "../../../../../assets/images/logo/israel-small-logo.png"

import Israellogo from "../../../../../assets/images/logo/Israel-logo.png"
import CombineLogo from "../../../../../assets/images/logo/combinelogo2.png"
import CombineLogoSmall from "../../../../../assets/images/logo/combine-small-logo.png"

// ** Icons Imports
import { Disc, X, Circle } from "react-feather"

// ** Config
import themeConfig from "@configs/themeConfig"

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from "@utils"

const VerticalMenuHeader = (props) => {
  const userSite = localStorage.getItem("usersite")

  // ** Props
  const {
    menuCollapsed,
    setMenuCollapsed,
    setMenuVisibility,
    setGroupOpen,
    menuHover,
  } = props

  // ** Vars
  const user = getUserData()

  // ** Reset open group
  useEffect(() => {
    if (!menuHover && menuCollapsed) setGroupOpen([])
  }, [menuHover, menuCollapsed])
  // ** Menu toggler component
  const Toggler = () => {
    if (!menuCollapsed) {
      return (
        <Disc
          size={20}
          data-tour="toggle-icon"
          className="text-primary toggle-icon d-none d-xl-block"
          onClick={() => setMenuCollapsed(true)}
        />
      )
    } else {
      return (
        <Circle
          size={20}
          data-tour="toggle-icon"
          className="text-primary toggle-icon d-none d-xl-block"
          onClick={() => setMenuCollapsed(false)}
        />
      )
    }
  }

  return (
    <div className="navbar-header">
      <ul className="nav navbar-nav flex-row">
        <li className="nav-item me-auto">
          <NavLink
            to={user ? getHomeRouteForLoggedInUser(user.role) : "/"}
            className="navbar-brand"
          >
            <span
              className={
                userSite == "ittihadBackOffice"
                  ? !menuHover && menuCollapsed
                    ? "brand-logo"
                    : "brand-logo-ittihad-main"
                  : "brand-logo"
              }
            >
              <img
                src={
                  userSite == "israelBackOffice"
                    ? !menuHover && menuCollapsed
                      ? IsraellogoSmall
                      : Israellogo
                    : userSite == "ittihadBackOffice"
                    ? !menuHover && menuCollapsed
                      ? IttihadlogoSmall
                      : Ittihadlogo
                    : !menuHover && menuCollapsed
                    ? CombineLogoSmall
                    : CombineLogo
                }
                alt="logo"
              />
            </span>
            {/* <h2 className="brand-text mb-0">{themeConfig.app.appName}</h2> */}
          </NavLink>
        </li>
        <li className="nav-item nav-toggle">
          <div className="nav-link modern-nav-toggle cursor-pointer">
            <Toggler />
            <X
              onClick={() => setMenuVisibility(false)}
              className="toggle-icon icon-x d-block d-xl-none"
              size={20}
            />
          </div>
        </li>
      </ul>
    </div>
  )
}

export default VerticalMenuHeader
