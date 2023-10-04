// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Input,
  Button,
  Label,
  Spinner,
} from "reactstrap"
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import {
  NumberhandleKeyPress,
  handleKeyDown,
} from "../../utility/common/InputValidation"

import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import jsonData from "../../locales/en/translation.json"
import { editProfile, getUserProfileData } from "../../redux/profileSlice"
import ProfilepasswordForm from "./ProfilePasswordFrom"
import LoaderComponent from "../../utility/common/LoaderComponent"


const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userSite = localStorage.getItem("usersite")

  //selector value from store
  const loading = useSelector((state) => state?.root?.profile?.loading)
  const buttonLoader = useSelector((state) => state?.root?.profile?.editLoader)

  const data = useSelector((state) => state?.root?.profile?.profileData)
  console.log(data)
  //formik validation schema
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required(jsonData?.error_msg?.firstname?.required).trim(),
    lastname: Yup.string().required(jsonData?.error_msg?.lastname?.required).trim(),
    phone: Yup.string().required(jsonData?.error_msg?.phone?.required).trim()
    // .min(6, jsonData?.error_msg?.phone?.min)
    //   .max(20, jsonData?.error_msg?.phone?.max),
  })

  useEffect(() => {
    dispatch(getUserProfileData())
  }, [])


  //formik initial values
  const initialValues = {
    firstname: data?.firstname,
    lastname: data?.lastname,
    phone: data?.phone,
  }


  //form submit Handler
  const handleSubmit = (values, onSubmitProps) => {
    dispatch(editProfile(navigate, values))
  }

  return (
    <>
      <head>
        <title>
          {jsonData?.profile?.header} - {userSite == "systemBackOffice"
            ? jsonData?.sitename?.sys_backoffice
            : userSite == "israelBackOffice"
              ? jsonData?.sitename?.israel
              : jsonData?.sitename?.ittihad}
        </title>
      </head>
      {loading ? <LoaderComponent></LoaderComponent> :<div>
        <CardHeader className=" mb-2 d-flex justify-content-between align-items-center">
          <CardTitle tag="h4">{jsonData?.profile?.header}</CardTitle>
          <Button
            className=""
            onClick={() => {
              navigate(-1)
            }}
            outline
            color="primary"
            type="button"
          >
            {jsonData?.back}
          </Button>
        </CardHeader>

        <Card>
          <CardBody>
            <Row>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ values, isSubmitting, setFieldValue, errors }) => (
                  <Form>
                    <div className="d-flex justify-content-end align-items-center">
                      <Button type="submit" color="primary" disabled={buttonLoader}>
                        {buttonLoader && (
                          <Spinner
                            className="me-1 text-light spinner-border-sm"
                            size={10}
                          />
                        )}
                        {jsonData?.save}
                      </Button>
                    </div>
                    <hr />
                    <div className="mb-1">
                      <Row>
                        <Col md="3" sm="12" className="mb-1">
                          <Label className="form-label"><em className="required-red">*</em>{jsonData?.profile?.forms?.firstname?.lable}</Label>
                          <Field name="firstname">
                            {({ field }) => (
                              <Input
                                onKeyPress={handleKeyDown}
                                type="text"
                                {...field}
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name="firstname"
                            component="div"
                            className="text-danger"
                          />
                        </Col>
                        <Col md="3" sm="12" className="mb-1">
                          <Label className="form-label"> <em className="required-red">*</em>{jsonData?.profile?.forms?.lastname?.lable}</Label>
                          <Field name="lastname">
                            {({ field }) => (
                              <Input
                                onKeyPress={handleKeyDown}
                                type="text"
                                {...field}
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name="lastname"
                            component="div"
                            className="text-danger"
                          />
                        </Col>
                        <Col md="3" sm="12" className="mb-1">
                          <Label className="form-label">{jsonData?.profile?.forms?.email?.lable}</Label>
                          <Input
                            type="text"
                            value={data?.email}
                            disabled={true}
                          />
                        </Col>
                        <Col md="3" sm="12" className="mb-1">
                          <Label className="form-label"><em className="required-red">*</em>{jsonData?.profile?.forms?.phone?.lable}</Label>
                          <Field name="phone">
                            {({ field }) => (
                              <Input
                                onKeyDown={(e) =>
                                  NumberhandleKeyPress(e, field)
                                }
                                type="text"
                                {...field}
                                // maxLength={20}
                                // minLength={6}
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="text-danger"
                          />
                        </Col>
                        <Row>
                          <Col md="3" sm="12" className="mb-1">
                            <Label className="form-label">{jsonData?.profile?.forms?.user_type}</Label>
                            <Input
                              value={data?.user_type}
                              disabled={true}
                              type="text"
                            />
                          </Col>
                        </Row>
                      </Row>
                    </div>
                  </Form>
                )}
              </Formik>
            </Row>
          </CardBody>
        </Card>
        <ProfilepasswordForm />
      </div>}
    </>
  )
}
export default Profile

