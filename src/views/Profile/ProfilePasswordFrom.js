import React from 'react'
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card, CardBody, Row, Col, Button, Label, Spinner } from 'reactstrap'
import { handleKeyDown } from '../../utility/common/InputValidation';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputPasswordToggle from "@components/input-password-toggle";
import jsonData from "../../locales/en/translation.json"
import { editProfile } from '../../redux/profileSlice';
//validation schema
const validationSchema = Yup.object().shape({
    password: Yup.string()
        .required(jsonData?.error_msg?.password?.required)
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            jsonData?.error_msg?.new_password?.formate
        ),
    repeat_password: Yup.string()
        .required(jsonData?.error_msg?.repeat_password?.required)
        .oneOf([Yup.ref("password"), null], jsonData?.error_msg?.repeat_password?.formate),

});


const ProfilepasswordForm = () => {
    const buttonLoader = useSelector((state) => state?.root?.profile?.editLoader)

    //Initial Value Schema
    const initialValues = {
        password: "",
        repeat_password: ""
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();


    // form onSubmit Function 
    const handleSubmit = (values, { setSubmitting }) => {
        delete values.repeat_password
        console.log(values);
        dispatch(editProfile(navigate, values))
    };
    return (
        <div> <Card>
            <CardBody>
                <Row>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, isSubmitting, setFieldValue }) => (
                            <Form>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <h4 className='mb-0'>Password</h4>
                                    <Button
                                        type="submit"
                                        color="primary"
                                        disabled={buttonLoader}
                                    >
                                        {buttonLoader && (
                                            <Spinner
                                                className="me-1 text-light spinner-border-sm"
                                                size={10}
                                            />
                                        )}
                                        Update password
                                    </Button>
                                </div>
                                <hr />
                                <div className="mb-1">
                                    <Row>
                                        <Col md='3' sm='12' className='mb-1'>
                                            <Label className="form-label" >
                                                <em className="required-red">*</em>{jsonData?.system_admin?.forms?.password?.lable}
                                            </Label>
                                            <div className="mb-1">

                                                <Field name="password">
                                                    {({ field }) => (

                                                        <InputPasswordToggle placeholder="Password" {...field} onKeyPress={handleKeyDown} className='input-group-merge' />
                                                    )}
                                                </Field>
                                                <ErrorMessage name="password" component="div" className="text-danger" />
                                            </div>
                                        </Col>
                                        <Col md='3' sm='12' className='mb-1'>
                                            <Label className="form-label" >
                                                <em className="required-red">*</em>{jsonData?.system_admin?.forms?.repeat_password?.lable}
                                            </Label>
                                            <div className="mb-1">

                                                <Field name="repeat_password">
                                                    {({ field }) => (

                                                        <InputPasswordToggle placeholder="Repeat Password" {...field} onKeyPress={handleKeyDown} className='input-group-merge' />
                                                    )}
                                                </Field>
                                                <ErrorMessage name="repeat_password" component="div" className="text-danger" />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Row>
            </CardBody>
        </Card></div>
    )
}

export default ProfilepasswordForm