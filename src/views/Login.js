// ** React Imports
import { useSkin } from "@hooks/useSkin"
import { Link, useNavigate } from "react-router-dom"

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"

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
import combinelogo from "@src/assets/images/logo/combine-logo.png"


// ** Styles
import "@styles/react/pages/page-authentication.scss"
import { EmailhandleKeyDown, handleKeyDown } from "../utility/common/InputValidation"
import { useDispatch, useSelector } from "react-redux";
import { loginapiCall } from "../redux/authSlice";
import jsonData from "../../src/locales/en/translation.json"
import LoaderComponent from "../utility/common/LoaderComponent";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email(jsonData?.error_msg?.email?.invalid)
    .required(jsonData?.error_msg?.email?.required).trim(),
  password: Yup.string().required(jsonData?.error_msg?.password?.required).trim(),
})

const Login = () => {
  const { skin } = useSkin()
  const source = skin === "dark" ? illustrationsDark : illustrationsLight
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loading = useSelector((state) => state?.root?.auth?.loading)
  // console.log(data, 'data')


  //formik initial values
  const initialValues = {
    email: "",
    password: "",
  }

  const handleSubmit = (values, onSubmitProps) => {
    dispatch(loginapiCall(values, navigate))
  }


  return (
    <>
      <head>
        <title>
          {jsonData?.login_card?.title}
        </title>
      </head>
     
      {/* {loading ?
        <LoaderComponent /> : */}
      <div className="auth-wrapper auth-cover">
        <Row className="auth-inner m-0">
          <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
            <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
              <img className="img-fluid" src={combinelogo} alt="Login Cover" />
            </div>
          </Col>
          <Col
            className="d-flex align-items-center auth-bg px-2 p-lg-5"
            lg="4"
            sm="12"
          >
            <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <h1 className="text-center text-bold">{jsonData?.login_card?.title}</h1>
                    <div className="mb-1">
                      <Label className="form-label" htmlFor="login-email">
                        {jsonData?.login_card?.forms?.email_label}
                      </Label>
                      <Field name="email">
                        {({ field }) => (
                          <Input
                            onKeyPress={EmailhandleKeyDown}
                            type="email"
                            {...field}
                            placeholder={jsonData?.login_card?.forms?.email_placeholder}
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="mb-1">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label" htmlFor="login-password">
                          {jsonData?.login_card?.forms?.password_label}
                        </Label>
                      </div>
                      <div>
                        <Field name="password">
                          {({ field }) => (

                            <InputPasswordToggle {...field} onKeyPress={handleKeyDown} className='input-group-merge' id='register-password' />
                          )}
                        </Field>
                      </div>

                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <Link to="/forgot-password">
                      <small>{jsonData?.login_card?.forgot_password}</small>
                    </Link>

                    <Button type="submit" color="primary" block disabled={loading}>
                      {jsonData?.login_card?.title}
                      {loading && (
                        <Spinner
                          className="ms-1 text-light spinner-border-sm"
                          size='sm'
                        />
                      )}
                    </Button>

                  </Form>
                )}
              </Formik>
            </Col>
          </Col>
        </Row>
      </div>
      {/* } */}

    </>
  )
}

export default Login
