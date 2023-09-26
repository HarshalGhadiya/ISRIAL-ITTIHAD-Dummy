// ** Reactstrap Imports
import { Button, Form, Input, Row, Col } from "reactstrap"

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin"

// ** Illustrations Imports
import illustrationsLight from "../../src/assets/images/pages/coming-soon.svg"
import illustrationsDark from "@src/assets/images/pages/coming-soon-dark.svg"
import Ittihadlogo from "@src/assets/images/logo/ittihad-logo.png"
import Israellogo from "@src/assets/images/logo/Israel-logo.png"
import CombineLogo from "@src/assets/images/logo/combinelogo2.png"

// ** Styles
import "@styles/base/pages/page-misc.scss"
import { Profiler } from "react"

const Profile = () => {
  // ** Hooks
  const { skin } = useSkin()
  const userSite = localStorage.getItem("usersite")

  const source = skin === "dark" ? illustrationsDark : illustrationsLight

  return (
    <div className="misc-wrapper">
      <a className="brand-logo" href="/"></a>
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">We are launching soon 🚀</h2>
          <p className="mb-3">
            We're creating something awesome. Please subscribe to get notified
            when it's ready!
          </p>

          <img className="img-fluid" src={source} alt="Coming soon page" />
        </div>
      </div>
    </div>
  )
}
export default Profile
