// ** React Imports
import { Link, useNavigate } from "react-router-dom"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
} from "react-feather"

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap"

// ** Default Avatar Image
import defaultAvatar from "../../../../assets/images/logo/user-icon.svg"
import { useSelector } from "react-redux"

const UserDropdown = () => {
  const userProgileData = useSelector(
    (state) => state?.root?.auth?.tokendata?.data?.data
  )
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name text-capitalize fw-bold">
            {userProgileData?.firstname + " " + userProgileData?.lastname}
          </span>
          <span className="user-status">
            {userProgileData?.user_type?.role}
          </span>
        </div>
        <img
          className="img-fluid"
          height="40"
          width="40"
          src={defaultAvatar}
          alt=""
        />
        {/* <Avatar
          img={defaultAvatar}
          imgHeight="40"
          imgWidth="40"
          status="online"
        /> */}
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/profile">
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>

        <DropdownItem
          tag={Link}
          onClick={() => localStorage.clear()}
          to="/login"
        >
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
