// ** React Imports
import { Link, useNavigate } from "react-router-dom"
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"

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
import { EmailhandleKeyDown, NumberhandleKeyPress, handleKeyDown } from "../../../utility/common/InputValidation"
import { forgotpasswordEmailapiCall } from "../../../redux/authSlice"
import jsonData from "../../../locales/en/translation.json"

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

const Otpcode = ({ centeredModal, setCenteredModal, setCurrentModal }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loading = useSelector((state) => state?.root?.auth?.loading)
    // // console.log(data, 'data')


    //formik initial values
    const initialValues = {
        otp_code: "",
    }

    const handleSubmit = (values, onSubmitProps) => {
        console.log(values, 'values')
        // dispatch(forgotpasswordEmailapiCall(values, navigate))
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
                                    <Col className="top-sec">
                                        <Row>
                                            <Col className="title mb-2">
                                                <h2>{jsonData?.otp_code_card?.title}</h2>
                                                <p className="text-center text-bold">
                                                    {jsonData?.otp_code_card?.des_otp}
                                                </p>
                                                <p className="text-center text-bold">
                                                    {jsonData?.otp_code_card?.des_otp2} <span className="fw-bolder">{obfuscateEmail("admin@yopmail.com")}</span>
                                                </p>
                                            </Col>
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
                                                                <Field name="otp_code">
                                                                    {({ field }) => (
                                                                        <Input
                                                                            onKeyDown={(e) => NumberhandleKeyPress(e, field)}
                                                                            maxLength={6}
                                                                            type="text"
                                                                            {...field}
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

                                                            <Button type="submit" color="primary" block disabled={loading} >
                                                                    Verify
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
                                    </Col>
                                </Row>
                                <Row>
                                    {/* <Col lg="12" className="r-link">
                                        <span>Don't have an account? </span> <span className="link" onClick={() => { setCurrentModal("register") }}>Register</span>
                                    </Col> */}
                                    <Col lg="12" className="f-logo">
                                        <img src={combinelogo} alt="logo" />
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="d-none d-lg-flex" lg="6" sm="12">
                                <img className="img-fluid object-fit-cover" src={authenticationimage} alt="" />
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
            </div>
            {/* } */}

        </>
    )
}

export default Otpcode
