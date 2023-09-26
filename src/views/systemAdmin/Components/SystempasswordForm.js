import React from 'react'
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Button, Label, Spinner } from 'reactstrap'
import { handleKeyDown } from '../../../utility/common/InputValidation';
import { useDispatch, useSelector } from 'react-redux';
import { SystemAdminupdatePassword } from '../../../redux/systemAdminSlice'
import { useNavigate, useParams } from 'react-router-dom';
import InputPasswordToggle from "@components/input-password-toggle";
import jsonData from "../../../locales/en/translation.json"
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


const SystempasswordForm = () => {
    const loading = useSelector((state) => state?.root?.systemadmin?.loading)

    //Initial Value Schema
    const initialValues = {
        password: "",
        repeat_password: ""
    };
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {id}=useParams();


    // form onSubmit Function 
    const handleSubmit = (values, { setSubmitting }) => {
        // console.log(values);
        dispatch(SystemAdminupdatePassword(values, navigate,id))
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
                            // console.log(values, 'values'),
                            <Form>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <h4 className='mb-0'>Password</h4>
                                    <Button
                          type="submit"
                          color="primary"
                          disabled={loading}
                        >
                          Update password
                          {loading && (
                            <Spinner
                              className="ms-1 text-light spinner-border-sm"
                              size="sm"
                            />
                          )}
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

                                                    <InputPasswordToggle placeholder="Password" {...field} onKeyPress={handleKeyDown} className='input-group-merge'  />
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

                                                    <InputPasswordToggle placeholder="Repeat Password" {...field} onKeyPress={handleKeyDown} className='input-group-merge'  />
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

export default SystempasswordForm