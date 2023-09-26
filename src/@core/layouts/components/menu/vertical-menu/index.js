// ** React Imports
import { Fragment, useState, useRef } from "react"

// ** Third Party Components
import classnames from "classnames"
import PerfectScrollbar from "react-perfect-scrollbar"

// ** Vertical Menu Components
import VerticalMenuHeader from "./VerticalMenuHeader"
import VerticalNavMenuItems from "./VerticalNavMenuItems"

import avatarimage from "@src/assets/images/icons/avatarimage.svg"
import avatarlogout from "@src/assets/images/icons/logout.svg"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import LoaderComponent from "../../../../../utility/common/LoaderComponent"

const Sidebar = (props) => {
  // ** Props
  const { menuCollapsed, menu, skin, menuData } = props
  const navigate = useNavigate()

  const loading = useSelector((state) => state?.root?.auth?.loading)
  const userProgileData = useSelector(
    (state) => state?.root?.auth?.tokendata?.data?.data
  )
  console.log(menuCollapsed, "menuCollapsed")

  // ** States
  const [groupOpen, setGroupOpen] = useState([])
  const [groupActive, setGroupActive] = useState([])
  const [currentActiveGroup, setCurrentActiveGroup] = useState([])
  const [activeItem, setActiveItem] = useState(null)

  // ** Menu Hover State
  const [menuHover, setMenuHover] = useState(false)

  // ** Ref
  const shadowRef = useRef(null)

  // ** Function to handle Mouse Enter
  const onMouseEnter = () => {
    setMenuHover(true)
  }

  // ** Scroll Menu
  const scrollMenu = (container) => {
    if (shadowRef && container.scrollTop > 0) {
      if (!shadowRef.current.classList.contains("d-block")) {
        shadowRef.current.classList.add("d-block")
      }
    } else {
      if (shadowRef.current.classList.contains("d-block")) {
        shadowRef.current.classList.remove("d-block")
      }
    }
  }
  console.log(menuCollapsed, "menuCollapsed")
  return (
    <Fragment>
      {loading && <LoaderComponent />}

      <div
        className={classnames(
          "main-menu menu-fixed menu-accordion menu-shadow",
          {
            expanded: menuHover || menuCollapsed === false,
            "menu-light": skin !== "semi-dark" && skin !== "dark",
            "menu-dark": skin === "semi-dark" || skin === "dark",
          }
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setMenuHover(false)}
      >
        {menu ? (
          menu({ ...props })
        ) : (
          <Fragment>
            {/* Vertical Menu Header */}
            <VerticalMenuHeader
              setGroupOpen={setGroupOpen}
              menuHover={menuHover}
              {...props}
            />
            {/* Vertical Menu Header Shadow */}
            <div className="shadow-bottom" ref={shadowRef}></div>
            {/* Perfect Scrollbar */}
            <PerfectScrollbar
              className="main-menu-content"
              options={{ wheelPropagation: false }}
              onScrollY={(container) => scrollMenu(container)}
            >
              <ul className="navigation navigation-main">
                <VerticalNavMenuItems
                  items={menuData}
                  menuData={menuData}
                  menuHover={menuHover}
                  groupOpen={groupOpen}
                  activeItem={activeItem}
                  groupActive={groupActive}
                  setGroupOpen={setGroupOpen}
                  menuCollapsed={menuCollapsed}
                  setActiveItem={setActiveItem}
                  setGroupActive={setGroupActive}
                  currentActiveGroup={currentActiveGroup}
                  setCurrentActiveGroup={setCurrentActiveGroup}
                />
              </ul>
              <div className="bottom-avatar-detail">
                <div className="avatar-detail-wrap">
                  <div className="avatar-img">
                    <img className="img-fluid" src={avatarimage} alt="" />
                  </div>
                  {menuCollapsed ? (
                    menuHover ? (
                      <div className="avatar-detail">
                        <div className="avatar-name">
                          {userProgileData?.firstname +
                            " " +
                            userProgileData?.lastname}
                          <br />
                          <strong>{userProgileData?.user_type?.role}</strong>
                        </div>
                        <div className="avatar-email-detail">
                          {userProgileData?.email}
                        </div>
                      </div>
                    ) : null
                  ) : (
                    <div className="avatar-detail">
                      <div className="avatar-name text-capitalize">
                        {userProgileData?.firstname +
                          " " +
                          userProgileData?.lastname}
                        <br />
                        <strong>{userProgileData?.user_type?.role}</strong>
                      </div>
                      <div className="avatar-email-detail">
                        {userProgileData?.email}
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className="avatar-logout cursor-pointer"
                  onClick={() => {
                    localStorage.clear()
                    navigate("/login")
                  }}
                >
                  <img className="img-fluid" src={avatarlogout} alt="" />
                </div>
              </div>
            </PerfectScrollbar>
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

export default Sidebar
