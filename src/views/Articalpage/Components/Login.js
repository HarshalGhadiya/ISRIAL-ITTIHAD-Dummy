// ** React Imports
import { Link, useNavigate } from "react-router-dom"
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { GoogleLogin } from "@react-oauth/google";


// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Label, Input, Button, Spinner, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/login-v2.svg"
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg"
import combinelogo from "@src/assets/images/comment-logo.png"
import authenticationimage from "@src/assets/images/authentication-image.jpg"


// ** Styles
import "@styles/react/pages/page-authentication.scss"
import { useDispatch, useSelector } from "react-redux";
import { EmailhandleKeyDown, handleKeyDown } from "../../../utility/common/InputValidation"
import { articalloginapiCall } from "../../../redux/articalauthSlice";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required").trim(),
    password: Yup.string().required("Password is required").trim(),
})

const Login = ({ centeredModal, setCenteredModal, setCurrentModal }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loading = useSelector((state) => state?.root?.auth?.loading)
    // // console.log(data, 'data')


    //formik initial values
    const initialValues = {
        email: "",
        password: "",
    }

    const handleSubmit = (values, onSubmitProps) => {

        const logindata = {
            email: values?.email,
            password: values?.password,
            ip: "127.0.0.1",
            device: "web"

        }

        dispatch(articalloginapiCall(logindata, navigate))
        console.log(values, 'values')
        // dispatch(loginapiCall(values, navigate))
    }


    return (
        <>
            {/* {loading ?
        <LoaderComponent /> : */}
            <div className='vertically-centered-modal'>
                {/* <Modal isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-dialog-centered'></Modal> */}
                <Modal isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-dialog-centered modal-lg authentication'>
                    <ModalHeader toggle={() => setCenteredModal(!centeredModal)} />
                    <ModalBody className="p-0">
                        <Row className="g-0">
                            <Col className="px-5 py-3 text-center" lg="6" sm="12">
                                <Row>
                                    <Col className="title mb-2"><h2>Login</h2><span>To comment you need to login</span></Col>
                                </Row>
                                <Row>
                                    <Col lg="12" style={{ direction: "rtl" }}>
                                        <Formik
                                            initialValues={initialValues}
                                            validationSchema={validationSchema}
                                            onSubmit={handleSubmit}
                                        >
                                            {({ values, errors }) => (
                                                console.log(values, errors, 84),
                                                <Form>
                                                    <div className="mb-1">
                                                        <Field name="email">
                                                            {({ field }) => (
                                                                <Input
                                                                    onKeyPress={EmailhandleKeyDown}
                                                                    type="email"
                                                                    {...field}
                                                                    placeholder="Email"
                                                                />
                                                            )}
                                                        </Field>
                                                        <ErrorMessage
                                                            name="email"
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </div>
                                                    <div className="mb-1 password-input">
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

                                                    <Button type="submit" color="primary" block disabled={loading} >
                                                        Login
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
                                </Row>
                                <Row>
                                    <Col className="o-option">
                                        <div><span>Other Options</span></div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="f-password">
                                        <span onClick={() => { setCurrentModal("forgotPassword") }}>Forgot password ?</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="g-login">
                                        <GoogleLogin
                                            onSuccess={(credentialResponse) => {
                                                // let decoded = jwt_decode(credentialResponse?.credential);
                                                console.log(credentialResponse?.credential, "38");

                                            }}
                                            onError={() => {
                                                console.log("Login Failed");
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="r-link">
                                        <span>Don't have an account? </span> <span className="link" onClick={() => { setCurrentModal("register") }}>Register</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="f-logo">
                                        <img src={combinelogo} alt="logo" />
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="d-none d-lg-flex" lg="6" sm="12">
                                <img className="img-fluid" src={authenticationimage} alt="" />
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
            </div>
            {/* } */}

        </>
    )
}

export default Login
