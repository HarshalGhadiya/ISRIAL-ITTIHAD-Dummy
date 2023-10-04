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
  ButtonGroup,
  CardText,
  Spinner,
} from "reactstrap"
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import {
  NumberhandleKeyPress,
  handleKeyDown,
} from "../../utility/common/InputValidation"

// ** Third Party Components
import Select from "react-select"

// ** Utils
import { selectThemeColors } from "@utils"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  SystemAdminDropdownRolelistapiCall,
  SystemAdminformapiCall,
} from "../../redux/systemAdminSlice"
import InputPasswordToggle from "@components/input-password-toggle"
import { useEffect } from "react"
import toast from "react-hot-toast";
import jsonData from "../../locales/en/translation.json"

//Site option list
const siteOptions = [
  { value: "systemBackOffice", label: jsonData?.system_admin?.dropdown_option?.site?.sys_admin },
  { value: "israelBackOffice", label: jsonData?.system_admin?.dropdown_option?.site?.israel },
  { value: "ittihadBackOffice", label: jsonData?.system_admin?.dropdown_option?.site?.ittihad }
  // { value: 'other', label: 'other' },
]

const SystemAdminaddForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // // get site from local storage
  // const userSite = localStorage.getItem("usersite")
  const userSite = useSelector(
    (state) => state?.root?.auth?.tokendata?.data?.data?.site
  )

  // Find permissions for "systemAdmins"
  const PermissionArray =
    localStorage.getItem("userData") &&
    JSON.parse(localStorage.getItem("userData"))?.permissions

  const systemAdminsPermissions = PermissionArray.find(item => item.section === "systemAdmins");

  // Extract the read and write permissions directly
  const readPermission = systemAdminsPermissions?.permissions.read || false;
  const writePermission = systemAdminsPermissions?.permissions.write || false;
  const CombinePermission = readPermission && writePermission

  //status options list
  const statusOptions = [
    { value: "active", label: jsonData?.system_admin?.dropdown_option?.status?.active },
    { value: "inActive", label: jsonData?.system_admin?.dropdown_option?.status?.inactive },
    ...(userSite === "systemBackOffice"
      ? [{ value: "deleted", label: jsonData?.system_admin?.dropdown_option?.status?.deleted }]
      : []),
  ]

  //States
  const [selectedUsersite, setselectedUsersite] = useState(siteOptions[0])
  const [selectedStatus, setselectedStatus] = useState({
    value: "active",
    label: jsonData?.system_admin?.dropdown_option?.status?.active,
  })

  //selector value from store
  const loading = useSelector((state) => state?.root?.systemadmin?.loading)
  const SytemuserTypeData = useSelector(
    (state) => state?.root?.systemadmin?.sytemuserTypeData
  )
  

  // check permission for login user 
  useEffect(() => {
    if (!CombinePermission) {
      navigate('/system-admins')
      toast.error(jsonData?.errormsg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [])

  //Dynamic Dropdown Array
  const userTypeOptions =
    SytemuserTypeData && SytemuserTypeData?.length > 0
      ? SytemuserTypeData?.map((item) => ({
        value: item._id,
        label: item.role,
      }))
      : []

  // add form management state
  const [formdata, setFormdata] = useState({
    status: statusOptions[0]?.value,
    user_type: userTypeOptions[0]?.value,
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    repeat_password: "",
    // Include "site" based on role
    ...(userSite == "systemBackOffice"
      ? { site: selectedUsersite?.value }
      : {}), // Include "site" according to role
  })

  //Dropdown list api call
  useEffect(() => {
    dispatch(
      SystemAdminDropdownRolelistapiCall(
        userSite == "systemBackOffice" ? selectedUsersite?.value : userSite,
        navigate
      )
    )
  }, [selectedUsersite])

  //formik validation schema
  const validationSchema = Yup.object().shape({
    status: Yup.string().required(jsonData?.error_msg?.status?.required),
    // user_type: Yup.string().required("User type is required"),
    firstname: Yup.string().required(jsonData?.error_msg?.firstname?.required).trim(),
    lastname: Yup.string().required(jsonData?.error_msg?.lastname?.required).trim(),
    email: Yup.string()
      .email(jsonData?.error_msg?.email?.invalid)
      .required(jsonData?.error_msg?.email?.required).trim(),
    phone: Yup.string()
      .required(jsonData?.error_msg?.phone?.required)
      .trim(),
      // .min(6, jsonData?.error_msg?.phone?.min)
      // .max(20, jsonData?.error_msg?.phone?.max), 
    password: Yup.string()
      .required(jsonData?.error_msg?.password?.required)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        jsonData?.error_msg?.new_password?.formate
      ).trim(),
    repeat_password: Yup.string()
      .required(jsonData?.error_msg?.repeat_password?.required)
      .oneOf([Yup.ref("password"), null], jsonData?.error_msg?.repeat_password?.formate).trim(),

    // Include "site" validation based on role
    ...(userSite == "systemBackOffice"
      ? { site: Yup.string().required(jsonData?.error_msg?.site?.required) }
      : {}), // Include "site" validation if role is 1
  })

  //formik initial values
  const initialValues = {
    status: formdata?.status,
    user_type: userSite == "systemBackOffice" ? userTypeOptions[0]?.value : formdata?.user_type,
    firstname: formdata?.firstname,
    lastname: formdata?.lastname,
    email: formdata?.email,
    phone: formdata?.phone,
    password: formdata?.password,
    repeat_password: formdata?.repeat_password,
    // Include "site" based on role
    ...(userSite == "systemBackOffice"
      ? { site: formdata?.site }
      : {}), // Include "site" if role is 1
  }


  //form submit Handler
  const handleSubmit = (values, onSubmitProps) => {
    // console.log(values, "values")
    dispatch(SystemAdminformapiCall(values, navigate))
  }

  return (
    <>
      <head>
        <title>
          {jsonData?.system_admin?.browser_title} -
          {userSite == "systemBackOffice"
            ? jsonData?.system_admin?.titles?.sys_backoffice
            : userSite == "israelBackOffice"
              ? jsonData?.system_admin?.titles?.isreal_backoffice
              : jsonData?.system_admin?.titles?.ittihad_backoffice}
        </title>
      </head>
      <div>
        <CardHeader className=" mb-2 d-flex justify-content-between align-items-center">
          <CardTitle tag="h4">{jsonData?.system_admin?.titles?.sys_admin}</CardTitle>
          <Button
            className=""
            onClick={() => {
              navigate("/system-admins")
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
                  setFormdata(values),
                  // console.log(values, "values", errors),
                  <Form>
                    <div className="d-flex justify-content-end align-items-center">
                      {/* <h4 className='mb-0'>Row ID : 1542</h4> */}
                      <Button type="submit" color="primary" disabled={loading}>
                        {jsonData?.save}
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
                        <Col md="3" sm="12" className="mb-1">
                          <Label className="form-label"> <em className="required-red">*</em>{jsonData?.system_admin?.forms?.status}</Label>
                          <Select
                            name="status"
                            theme={selectThemeColors}
                            className="react-select"
                            classNamePrefix="select"
                            defaultValue={selectedStatus}
                            options={statusOptions}
                            isClearable={false}
                            onChange={(selectedOption) => {
                              setFieldValue("status", selectedOption.value)
                              setselectedStatus(selectedOption)
                            }}
                          />
                          <ErrorMessage
                            name="status"
                            component="div"
                            className="text-danger"
                          />
                        </Col>
                        {userSite == "systemBackOffice" && (
                          <Col md="3" sm="12" className="mb-1">
                            <Label className="form-label"> <em className="required-red">*</em>{jsonData?.system_admin?.forms?.site}</Label>
                            <Select
                              name="site"
                              theme={selectThemeColors}
                              className="react-select"
                              classNamePrefix="select"
                              defaultValue={siteOptions[0]}
                              options={siteOptions}
                              isClearable={false}
                              onChange={(selectedOption) => {
                                setselectedUsersite(selectedOption)
                                setFieldValue("site", selectedOption.value)
                              }}
                            />
                            <ErrorMessage
                              name="site"
                              component="div"
                              className="text-danger"
                            />
                          </Col>
                        )}

                        {userSite === "systemBackOffice" ? <Col md="3" sm="12" className="mb-1">
                          <Label className="form-label"> <em className="required-red">*</em>{jsonData?.system_admin?.forms?.user_type}</Label>
                          <Select
                            name="user_type"
                            theme={selectThemeColors}
                            className="react-select"
                            classNamePrefix="select"
                            value={userTypeOptions[0]}
                            options={userTypeOptions}
                            isClearable={false}
                            onChange={(selectedOption) => {
                              setFieldValue("user_type", selectedOption.value)
                            }}
                          />
                          <ErrorMessage
                            name="user_type"
                            component="div"
                            className="text-danger"
                          />
                        </Col> :
                          <Col md="3" sm="12" className="mb-1">
                            <Label className="form-label"> <em className="required-red">*</em>{jsonData?.system_admin?.forms?.user_type}</Label>
                            <Select
                              name="user_type"
                              theme={selectThemeColors}
                              className="react-select"
                              classNamePrefix="select"
                              defaultValue={userTypeOptions[0]}
                              options={userTypeOptions}
                              isClearable={false}
                              onChange={(selectedOption) => {
                                setFieldValue("user_type", selectedOption.value)
                              }}
                            />
                            <ErrorMessage
                              name="user_type"
                              component="div"
                              className="text-danger"
                            />
                          </Col>}
                      </Row>
                      <Row>
                        <Col md="3" sm="12" className="mb-1">
                          <Label className="form-label"><em className="required-red">*</em>{jsonData?.system_admin?.forms?.firstname?.lable}</Label>
                          <Field name="firstname">
                            {({ field }) => (
                              <Input
                                onKeyPress={handleKeyDown}
                                type="text"
                                {...field}
                                placeholder={jsonData?.system_admin?.forms?.firstname?.placehoder}
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
                          <Label className="form-label"> <em className="required-red">*</em>{jsonData?.system_admin?.forms?.lastname?.lable}</Label>
                          <Field name="lastname">
                            {({ field }) => (
                              <Input
                                onKeyPress={handleKeyDown}
                                type="text"
                                {...field}
                                placeholder={jsonData?.system_admin?.forms?.lastname?.placehoder}
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
                          <Label className="form-label"> <em className="required-red">*</em>{jsonData?.system_admin?.forms?.email?.lable}</Label>
                          <Field name="email">
                            {({ field }) => (
                              <Input
                                onKeyPress={handleKeyDown}
                                type="text"
                                {...field}
                                placeholder={jsonData?.system_admin?.forms?.email?.placehoder}
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-danger"
                          />
                        </Col>
                        <Col md="3" sm="12" className="mb-1">
                          <Label className="form-label"><em className="required-red">*</em>{jsonData?.system_admin?.forms?.phone?.lable}</Label>
                          <Field name="phone">
                            {({ field }) => (
                              <Input
                                onKeyDown={(e) =>
                                  NumberhandleKeyPress(e, field)
                                }
                                type="text"
                                {...field}
                                placeholder={jsonData?.system_admin?.forms?.phone?.placehoder}
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

                        {/* <h4 className='mb-0'>Password</h4> */}
                        <Row>
                          <Col md="3" sm="12" className="mb-1">
                            <Label className="form-label"><em className="required-red">*</em>{jsonData?.system_admin?.forms?.password?.lable}</Label>
                            <div className="mb-1">
                              <Field name="password">
                                {({ field }) => (
                                  <InputPasswordToggle
                                    placeholder={jsonData?.system_admin?.forms?.password?.placehoder}
                                    {...field}
                                    onKeyPress={handleKeyDown}
                                    className="input-group-merge"
                                  />
                                )}
                              </Field>
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </Col>
                          <Col md="3" sm="12" className="mb-1">
                            <Label className="form-label">
                              <em className="required-red">*</em>{jsonData?.system_admin?.forms?.repeat_password?.lable}
                            </Label>
                            <div className="mb-1">
                              <Field name="repeat_password">
                                {({ field }) => (
                                  <InputPasswordToggle
                                    placeholder={jsonData?.system_admin?.forms?.repeat_password?.placehoder}
                                    {...field}
                                    onKeyPress={handleKeyDown}
                                    className="input-group-merge"
                                  />
                                )}
                              </Field>
                              <ErrorMessage
                                name="repeat_password"
                                component="div"
                                className="text-danger"
                              />
                            </div>
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
      </div>
      {/* )} */}
    </>
  )
}
export default SystemAdminaddForm
