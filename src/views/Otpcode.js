// ** React Imports
import { useSkin } from "@hooks/useSkin"
import { Link, useNavigate } from "react-router-dom"

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from "react-feather"

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
import { NumberhandleKeyPress, handleKeyDown } from "../utility/common/InputValidation"
import { useDispatch, useSelector } from "react-redux"
import { tokenapiCall } from "../redux/authSlice"
import LoaderComponent from "../utility/common/LoaderComponent"
import jsonData from "../../src/locales/en/translation.json"

const validationSchema = Yup.object().shape({
  otp_code: Yup.string().required(jsonData?.error_msg?.otp_code?.required).trim(),
})

function obfuscateEmail(email) {
  // Split the email into the local part and domain part
  const [localPart, domainPart] = email.split('@');

  // Obfuscate the local part by showing only the first two characters followed by asterisks
  const obfuscatedLocalPart = localPart.slice(0, 2) + '*'.repeat(localPart.length - 2);

  // Combine the obfuscated local part and domain part to create the obfuscated email
  const obfuscatedEmail = `${obfuscatedLocalPart}@${domainPart}`;

  return obfuscatedEmail;
}

const Otpcode = () => {
  const { skin } = useSkin()
  const source = skin === "dark" ? illustrationsDark : illustrationsLight
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loading = useSelector((state) => state?.root?.auth?.loading)
  const loginData = useSelector((state) => state?.root?.auth?.logindata)
  // console.log(obfuscateEmail(loginData?.data?.email), 'email')


  //Initial Value Schema
  const initialValues = {
    otp_code: "",
  }

  const handleSubmit = (values, onSubmitProps) => {
    // console.log(values)
    const formdata = { otp: values?.otp_code, email: loginData?.data?.email }
    dispatch(tokenapiCall(formdata, navigate))

  }

  

  return (
    <>
      <head>
        <title>
          {jsonData?.otp_code_card?.title}
        </title>
      </head>
      {/* {loading ? <LoaderComponent /> : */}
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
                    <h1 className="text-center text-bold"> {jsonData?.otp_code_card?.title}</h1>
                    <p className="text-center text-bold">
                      {jsonData?.otp_code_card?.des_otp}
                    </p>
                    <p className="text-center text-bold">
                      {jsonData?.otp_code_card?.des_otp2} <span className="fw-bolder">{obfuscateEmail(loginData?.data?.email)}</span> 
                    </p>
                    <div className="mb-1">
                      <Field name="otp_code">
                        {({ field }) => (
                          <Input
                            onKeyDown={(e) => NumberhandleKeyPress(e, field)}
                            type="text"
                            {...field}
                            maxLength={6}
                            placeholder={jsonData?.otp_code_card?.forms?.otp_lable_placholder}
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="otp_code"
                        component="div"
                        className="text-danger"
                      />
                    </div>
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

export default Otpcode
