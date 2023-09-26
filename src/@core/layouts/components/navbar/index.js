// ** React Imports
import { Fragment } from "react"

// ** Custom Components
import NavbarUser from "./NavbarUser"

// ** Third Party Components
import { Sun, Moon, Menu } from "react-feather"

// ** Reactstrap Imports
import { NavItem, NavLink } from "reactstrap"

const ThemeNavbar = (props) => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props

  return (
    <Fragment>
      <div className="bookmark-wrapper d-flex align-items-center">
        <ul className="navbar-nav d-xl-none">
          <NavItem className="mobile-menu me-auto">
            <NavLink
              className="nav-menu-main menu-toggle hidden-xs is-active"
              onClick={() => setMenuVisibility(true)}
            >
              <Menu className="ficon" />
            </NavLink>
          </NavItem>
        </ul>
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar
