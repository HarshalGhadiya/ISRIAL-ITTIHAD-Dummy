// ** React Imports
import { useSkin } from "@hooks/useSkin";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from "react-feather";
import EyeIcon from '../../src/assets/images/icons/eye-icon.png'
import EyecloseIcon from '../../src/assets/images/icons/eye-icon-hide.png'

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
import { handleKeyDown } from "../utility/common/InputValidation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetpasswordapiCall } from "../redux/authSlice";
import LoaderComponent from "../utility/common/LoaderComponent";
import jsonData from "../../src/locales/en/translation.json"


//validation schema
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

const ResetPassword = () => {
    const { skin } = useSkin();
    const [queryString,setQueryString] = useState(null);
    const [parmsToken,setParmsToken]=useState('')
    const source = skin === "dark" ? illustrationsDark : illustrationsLight;
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);

    // // Access individual query parameters
    // const token = queryParams.get("token");
    // console.log(token,'token')

    const loading = useSelector((state) => state?.root?.auth?.loading)
    // console.log(data, 'data')
    !queryString && setQueryString(document.URL);

    useEffect(()=>{
        let params = queryString.split("token")[1].replace("=", "")
        setParmsToken(params)
    },[queryString])


    //Initial Value Schema
    const initialValues = {
        new_password: "",
        repeat_password: ""
    };


    // form onSubmit Function 
    const handleSubmit = (values, { setSubmitting }) => {
        // Handle form submission logic here
        // console.log(values);
        const resertdata = {
            token:parmsToken,
            password: values?.new_password
        }
        dispatch(resetpasswordapiCall(resertdata, navigate))
        // navigate('/login')
        setSubmitting(false);
    };

    return (
        <>
            <head>
                <title>
                {jsonData?.reset_password_card?.title}
                </title>
            </head>

            {/* {loading ? <LoaderComponent /> :  */}
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
                                        <h1 className="text-center text-bold">{jsonData?.reset_password_card?.title}</h1>
                                        <div className="mb-1">
                                            <Field name="new_password">
                                                {({ field }) => (

                                                    <InputPasswordToggle placeholder={jsonData?.reset_password_card?.forms?.new_password_label} {...field} onKeyPress={handleKeyDown} className='input-group-merge'  />
                                                )}
                                            </Field>
                                            <ErrorMessage name="new_password" component="div" className="text-danger" />
                                        </div>
                                        <div className="mb-1">

                                            <Field name="repeat_password">
                                                {({ field }) => (

                                                    <InputPasswordToggle placeholder={jsonData?.reset_password_card?.forms?.repeat_password} {...field} onKeyPress={handleKeyDown} className='input-group-merge'  />
                                                )}
                                            </Field>
                                            <ErrorMessage name="repeat_password" component="div" className="text-danger" />
                                        </div>
                                        <Button type="submit" color="primary" block disabled={loading}>
                                            {jsonData?.reset_password_card?.forms?.reset_button}
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

    );
};

export default ResetPassword;
