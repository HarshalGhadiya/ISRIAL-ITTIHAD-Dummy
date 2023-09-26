// ** React Imports
import { useSkin } from "@hooks/useSkin";
import { Link, useNavigate } from "react-router-dom";

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from "react-feather";

import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

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
} from "reactstrap";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/login-v2.svg";
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg";
import combinelogo from "@src/assets/images/logo/combine-logo.png"

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { EmailhandleKeyDown, handleKeyDown } from "../utility/common/InputValidation";
import { useDispatch, useSelector } from "react-redux";
import { forgotpasswordEmailapiCall } from "../redux/authSlice";
import LoaderComponent from "../utility/common/LoaderComponent";
import jsonData from "../../src/locales/en/translation.json"


//validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email(jsonData?.error_msg?.email?.invalid)
    .required(jsonData?.error_msg?.email?.required).trim(),

});

const ForgotPassword = () => {
  const { skin } = useSkin();
  const source = skin === "dark" ? illustrationsDark : illustrationsLight;
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const loading = useSelector((state) => state?.root?.auth?.loading)
  // console.log(loading, 'loading')


  //Initial Value Schema
  const initialValues = {
    email: ""
  };


  // form onSubmit Function 
  const handleSubmit = (values, onSubmitProps) => {
    // Handle form submission logic here
    // console.log(values);
    dispatch(forgotpasswordEmailapiCall(values, navigate))

  };


  return (
    <>
      <head>
        <title>
          {jsonData?.forgot_password_card?.title}
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
                    <h1 className="text-center text-bold">{jsonData?.forgot_password_card?.title}</h1>
                    <div className="mb-1">
                      <p>{jsonData?.forgot_password_card?.des}</p>
                      <Field name="email">
                        {({ field }) => (
                          <Input
                            onKeyPress={EmailhandleKeyDown}
                            type="email"
                            {...field}
                            placeholder={jsonData?.forgot_password_card?.forms?.email_placeholder}
                          />
                        )}
                      </Field>
                      <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>
                    <Button type="submit" color="primary" block disabled={loading}>
                      { jsonData?.forgot_password_card?.forms?.send_button}
                      {loading && (
                        <Spinner
                          className="ms-1 text-light spinner-border-sm"
                          size='sm'
                        />
                      )}
                    </Button>
                    <Link to={`/login`}> {jsonData?.forgot_password_card?.forms?.back_buton}</Link>
                  </Form>
                )}
              </Formik>

            </Col>
          </Col>
        </Row>
      </div>
      {/* //  } */}
    </>

  );
};

export default ForgotPassword;
