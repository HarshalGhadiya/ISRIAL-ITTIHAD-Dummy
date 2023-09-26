// ** React Imports
import { Link, useNavigate } from "react-router-dom"
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { GoogleLogin } from "@react-oauth/google";
import jsonData from '../../../locales/en/translation.json'


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
    new_password: Yup.string()
        .required(jsonData?.error_msg?.new_password?.required)
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            jsonData?.error_msg?.new_password?.formate
        ).trim(),
    repeat_password: Yup.string()
        .required(jsonData?.error_msg?.repeat_password?.required)
        .oneOf([Yup.ref('new_password'), null], jsonData?.error_msg?.repeat_password?.formate).trim(),
});

const NewPassword = ({ centeredModal, setCenteredModal, setCurrentModal }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loading = useSelector((state) => state?.root?.auth?.loading)
    // // console.log(data, 'data')


    //formik initial values
    const initialValues = {
        new_password: "",
        repeat_password: "",
    }

    const handleSubmit = (values, onSubmitProps) => {

        const logindata = {
            email: values?.email,
            password: values?.password,
            ip: "127.0.0.1",
            device: "web"

        }

        // dispatch(articalloginapiCall(logindata, navigate))
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
                                    <Col className="title mb-2"><h2>Reset Pasword</h2></Col>
                                </Row>
                                <Row>
                                    <Col lg="12">
                                        <Formik
                                            initialValues={initialValues}
                                            validationSchema={validationSchema}
                                            onSubmit={handleSubmit}
                                        >
                                            {({ values, errors }) => (
                                                console.log(values, errors, 84),
                                                <Form>

                                                    <div className="mb-1">
                                                        <div>
                                                            <Field name="new_password">
                                                                {({ field }) => (

                                                                        <InputPasswordToggle {...field} placeholder={jsonData?.reset_password_card?.forms?.new_password_label} onKeyPress={handleKeyDown} className='input-group-merge' id='register-password' />
                                                                )}
                                                            </Field>
                                                        </div>

                                                        <ErrorMessage
                                                            name="new_password"
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </div>
                                                    <div className="mb-1">
                                                        <div>
                                                            <Field name="repeat_password">
                                                                {({ field }) => (

                                                                        <InputPasswordToggle {...field} placeholder={jsonData?.reset_password_card?.forms?.repeat_password} onKeyPress={handleKeyDown} className='input-group-merge' id='register-password' />
                                                                )}
                                                            </Field>
                                                        </div>

                                                        <ErrorMessage
                                                            name="repeat_password"
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </div>

                                                    <Button type="submit" color="primary" block disabled={loading} >
                                                        Reset
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

export default NewPassword
