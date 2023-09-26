// ** React Imports
import { Link, useNavigate } from "react-router-dom"
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'
import Register from './Components/Register'
import Login from './Components/Login'
import ResetPassword from './Components/ResetPassword'

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  // Form,
  Label,
  Input,
  Button,
  Spinner,
} from "reactstrap"

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/login-v2.svg"
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg"
import commentlogo from "@src/assets/images/comment-logo.png"
import commenttopbanner from "@src/assets/images/comment-topbanner.jpg"
import userimg from "@src/assets/images/ei_user.png"
import logoone from "@src/assets/images/logo-one.png"
import logotwo from "@src/assets/images/logo-two.png"
import commenticon from "@src/assets/images/icons/comment.svg"
import likeicon from "@src/assets/images/icons/like.svg"


// ** Styles
import "@styles/react/pages/page-authentication.scss"
import { useDispatch, useSelector } from "react-redux";
import { handleKeyDown } from "../../utility/common/InputValidation"
import { useState } from "react"
import { Direction } from "react-data-table-component"
import NewPassword from "./Components/NewPassword"
import Otpcode from "./Components/Otpcode"


const validationSchema = Yup.object().shape({
  comment: Yup.string().required("Comment is required")
})
const validationSchemaforreply = Yup.object().shape({
  comment_reply: Yup.string().required("Comment is required")
})

const Articalpage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loading = useSelector((state) => state?.root?.auth?.loading)
  // // console.log(data, 'data')


  const [centeredModal, setCenteredModal] = useState(true)
  const [currentModal, setCurrentModal] = useState("login");
  // console.log(centeredModal, 'centeredModal')


  //formik initial values
  const initialValues = {
    comment: "",
  }


  //formik initial values
  const initialValuesforreply = {
    comment_reply: "",
  }

  const handleSubmit = (values, onSubmitProps) => {
    console.log(values, 'values')
    // dispatch(loginapiCall(values, navigate))
  }

  const handleSubmitforReply = (values, onSubmitProps) => {
    console.log(values, 'values')
    // dispatch(loginapiCall(values, navigate))
  }


  return (
    <>

      {/* Model Component  */}
      <div>
        {currentModal === 'login' && <Login centeredModal={centeredModal} setCenteredModal={setCenteredModal} setCurrentModal={setCurrentModal} />}
        {currentModal === 'forgotPassword' && <ResetPassword centeredModal={centeredModal} setCenteredModal={setCenteredModal} setCurrentModal={setCurrentModal} />}
        {currentModal === 'register' && <Register centeredModal={centeredModal} setCenteredModal={setCenteredModal} setCurrentModal={setCurrentModal} />}
        {currentModal === 'resetPassword' && <NewPassword centeredModal={centeredModal} setCenteredModal={setCenteredModal} setCurrentModal={setCurrentModal} />}
        {currentModal === 'otpcode' && <Otpcode centeredModal={centeredModal} setCenteredModal={setCenteredModal} setCurrentModal={setCurrentModal} />}
      </div>

      {/* {loading ?
        <LoaderComponent /> : */}

      <div className="commentwrap" style={{ direction: "rtl" }}>
        <div className="row">
          <div className="col-12">
            <div className="comment-topbanner">
              <img className="img-fluid" src={commenttopbanner} alt="" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="comment-logo mt-2">
              <span><img className="img-fluid" src={commentlogo} alt="" /></span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="title mb-2">
              <h1>Title</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="sub-title">
              <h3>Sub Title</h3>
            </div>
          </div>
        </div>



        <Row className="align-items-center mb-3">
          <Col>
            <span className="comments-number">15 Comments</span>
          </Col>
          <Col className="text-start">
            <Button type="button" color="primary">Register</Button>
            <Button type="button" color="primary" className="me-1" >Login</Button>
          </Col>
        </Row>
        {/* Comment form  */}
        <Row>

          <Col>
            <div className="d-flex comment-sec">

              <div className="userimage">
                <img className="img-fluid" src={userimg} alt="" />
                <img className="userimage-logo" src={logoone} alt="" />
              </div>
              <div className="w-100">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values, errors }) => (
                    console.log(values, errors, 84),
                    <Form>
                      <Row>
                        <Col sm="12" md="12" lg="12"><h2 className="form-label">Anonymous Users</h2></Col>
                        <Col className="d-flex">
                          <div className="w-100">
                            <Field name="comment">
                              {({ field }) => (
                                <Input
                                  onKeyPress={handleKeyDown}
                                  type="text"
                                  {...field}
                                  placeholder="Add your comment"
                                />
                              )}
                            </Field>
                            <ErrorMessage
                              name="comment"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div>
                            <Button type="submit" color="primary" className="me-2" disabled={loading} >
                              Send
                              {loading && (
                                <Spinner
                                  className="ms-1 text-light spinner-border-sm"
                                  size='sm'
                                />
                              )}
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </div>


            </div>
          </Col>

        </Row>
        <div className="divider"></div>

        {/* Comment reply form with content  */}
        <Row>
          <Col>
            <div className="d-flex comment-sec">
              <div className="userimage">
                <img className="img-fluid" src={userimg} alt="" />
                <img className="userimage-logo" src={logoone} alt="" />
              </div>
              <div className="w-100">
                <Formik
                  initialValues={initialValuesforreply}
                  validationSchema={validationSchemaforreply}
                  onSubmit={handleSubmitforReply}
                >
                  {({ values, errors }) => (
                    console.log(values, errors, 84),
                    <Form>

                      <Row>
                        <Col sm="12" md="12" lg="12">
                          <h2 className="form-label">Anonymous Users</h2>
                        </Col>

                        <Col className="d-flex">
                          <div className="w-100">
                            <Field name="comment">
                              {({ field }) => (
                                <Input
                                  onKeyPress={handleKeyDown}
                                  type="text"
                                  {...field}
                                  placeholder="Add your comment"
                                />
                              )}
                            </Field>
                            <ErrorMessage
                              name="comment"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div>
                            <Button type="submit" color="primary" className="me-2" disabled={loading} >
                              Send
                              {loading && (
                                <Spinner
                                  className="ms-1 text-light spinner-border-sm"
                                  size='sm'
                                />
                              )}
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </div>

            </div>
          </Col>
        </Row>

        {/* } */}


        <Row>
          <Col>
            <div className="d-flex comment-sec">
              <div className="userimage">
                <img className="img-fluid" src={userimg} alt="" />
                <img className="userimage-logo" src={logoone} alt="" />
              </div>
              <div className="w-100">
                <Row>
                  <Col className="d-flex">
                    <div className="w-100">
                      <h2 className="form-label">Anonymous Users</h2>
                      <div className="comment-text">
                        שמח שיש ערוץ כזה
                        שיתוף פעולה כלכלי מפריח את המזרח התיכון ... לחיים !
                      </div>
                      <div className="comment-bottom">
                        <span className="comment-like">25 <img className="img-fluid" src={likeicon} alt="" /></span>
                        <span className="comment-count">15 <img className="img-fluid" src={commenticon} alt="" /></span>
                        <Button type="submit" color="primary" className="me-2">See original comment</Button>
                      </div>
                    </div>
                    <div className="post-time">
                      Posted 8 min ago
                    </div>
                  </Col>
                </Row>
              </div>

            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="d-flex comment-sec sub-comment">
              <div className="userimage">
                <img className="img-fluid" src={userimg} alt="" />
                <img className="userimage-logo" src={logoone} alt="" />
              </div>
              <div className="w-100">
                <Row>
                  <Col className="d-flex">
                    <div className="w-100">
                      <h2 className="form-label">Anonymous Users</h2>
                      <div className="comment-text">
                        שמח שיש ערוץ כזה
                        שיתוף פעולה כלכלי מפריח את המזרח התיכון ... לחיים !
                      </div>
                      <div className="comment-bottom">
                        <span className="comment-like">25 <img className="img-fluid" src={likeicon} alt="" /></span>
                        <span className="comment-count">15 <img className="img-fluid" src={commenticon} alt="" /></span>
                        <Button type="submit" color="primary" className="me-2">See original comment</Button>
                      </div>
                    </div>
                    <div className="post-time">
                      Posted 8 min ago
                    </div>
                  </Col>
                </Row>
              </div>

            </div>
          </Col>
        </Row>


      </div>

    </>
  )
}

export default Articalpage
