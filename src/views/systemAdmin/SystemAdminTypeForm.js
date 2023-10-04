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
import { handleKeyDown } from "../../utility/common/InputValidation"

// ** Third Party Components
import Select from "react-select"

// ** Utils
import { selectThemeColors } from "@utils"
import { useDispatch, useSelector } from "react-redux"
import {
  AddAdminRoleType,
  GetAdminRoleTypesById,
  editAdminRoleType,
} from "../../redux/adminRoleTypeSlice"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import LoaderComponent from "../../utility/common/LoaderComponent"
import toast from "react-hot-toast"
import jsonData from "../../locales/en/translation.json"

//status options list
const permissionOptions = [
  // { value: '', label: 'Select' },
  {
    value: jsonData.roleType.notApplicableValue,
    label: jsonData.roleType.notApplicableLabel,
  },
  {
    value: jsonData.roleType.readWriteValue,
    label: jsonData.roleType.readWriteLabel,
  },
  { value: jsonData.roleType.readValue, label: jsonData.roleType.readLabel },
]

const Section = [
  { value: jsonData.roleType.usersValue, label: jsonData.roleType.usersLabel },
  { value: jsonData.roleType.pagesValue, label: jsonData.roleType.pagesLabel },
  {
    value: jsonData.roleType.commentsValue,
    label: jsonData.roleType.commentsLabel,
  },
  {
    value: jsonData.roleType.harmfulWordsValue,
    label: jsonData.roleType.harmfulWordsLabel,
  },
  {
    value: jsonData.roleType.settingsValue,
    label: jsonData.roleType.settingsLabel,
  },
  {
    value: jsonData.roleType.systemAdminsValue,
    label: jsonData.roleType.systemAdminsLabel,
  },
]
const validationSchema = Yup.object().shape({
  type_name: Yup.string().trim().required(jsonData.roleType.nameError),
  users: Yup.string().required(jsonData.roleType.userError),
  pages: Yup.string().required(jsonData.roleType.pageError),
  comments: Yup.string().required(jsonData.roleType.commentError),
  harmfulWords: Yup.string().required(jsonData.roleType.harmfulWordsError),
  settings: Yup.string().required(jsonData.roleType.settingsError),
  systemAdmins: Yup.string().required(jsonData.roleType.systemAdminsError),
})

const SystemAdminTypeForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const buttonLoading = useSelector(
    (state) => state?.root?.adminRoleType?.buttonloading
  )
  const loading = useSelector((state) => state?.root?.adminRoleType?.loading)
  // console.log(buttonLoading, loading, "loading check")
  const siteName = localStorage.getItem("usersite")
  const PermissionArray =
    localStorage.getItem("userData") &&
    JSON.parse(localStorage.getItem("userData"))?.permissions

  // Find permissions for "systemAdmins"
  const systemAdminsPermissions = PermissionArray.find(
    (item) => item.section === "systemAdmins"
  )

  // Extract the read and write permissions directly
  const readPermission = systemAdminsPermissions?.permissions.read || false
  const writePermission = systemAdminsPermissions?.permissions.write || false

  const CombinePermission = readPermission && writePermission

  useEffect(() => {
    if (!CombinePermission) {
      navigate("/system-admins")
      toast.error(jsonData.errormsg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }, [])

  useEffect(() => {
    if (id !== undefined) {
      dispatch(GetAdminRoleTypesById(id, navigate))
    }
  }, [id])

  const apiResponse = useSelector(
    (state) => state?.root?.adminRoleType?.adminRoleTypesById
  )

  //formik initial values
  const initialValues = {
    type_name: "",
    users: permissionOptions[0].value,
    pages: permissionOptions[0].value,
    comments: permissionOptions[0].value,
    harmfulWords: permissionOptions[0].value,
    settings: permissionOptions[0].value,
    systemAdmins: permissionOptions[0].value,
  }

  // api response to initialValue for default value in edit
  if (id && apiResponse?.data) {
    initialValues.type_name = apiResponse.data.role
    Section.forEach((item) => {
      const sectionValue = item.value
      const permission = apiResponse?.data?.permissions?.find(
        (p) => p.section === sectionValue
      )

      initialValues[sectionValue] =
        permission?.permissions?.write && permission?.permissions?.read
          ? "read-write"
          : permission?.permissions?.read &&
            permission?.permissions?.write === false
          ? "read"
          : "not-applicable"
    })
  }
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Initialize the output object with static values

    const outputObj = {
      role: values?.type_name.trim(),
      site: siteName,
      permissions: [],
    }

    // Iterate over the keys in the input object
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        const sectionName = key
        const permission = {
          section: sectionName,
          permissions: {
            read:
              values[key] === "read" || values[key] === "read-write"
                ? true
                : false,
            write: values[key] === "read-write" ? true : false,
            notApplicable: values[key] === "not-applicable" ? true : false,
          },
        }
        if (key !== "type_name") {
          outputObj.permissions.push(permission)
        }
      }
    }
    if (id !== undefined) {
      dispatch(editAdminRoleType(outputObj, id, navigate))
    } else {
      dispatch(AddAdminRoleType(outputObj, navigate))
      resetForm()
    }
    setSubmitting(false)
  }

  return (
    <>
      <head>
        <title>
          {id !== undefined
            ? jsonData.roleType.editRole
            : jsonData.roleType.addRole}
          {siteName == "systemBackOffice"
            ? jsonData.roleType.systemBackOffice
            : siteName == "israelBackOffice"
            ? jsonData.roleType.israelTitle
            : jsonData.roleType.ittihadTitle}
        </title>
      </head>
      {loading ? (
        <LoaderComponent />
      ) : (
        <>
          <CardHeader className="mb-1 d-flex justify-content-between align-items-center">
            <CardTitle tag="h4">{jsonData.roleType.title}</CardTitle>
            <Button
              outline
              color="primary"
              type="button"
              onClick={() => navigate("/system-admins")}
            >
              {jsonData.back}
            </Button>
          </CardHeader>

          <Card className="mt-1 mb-5">
            <CardBody>
              <Row>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values, isSubmitting, setFieldValue }) => (
                    <Form>
                      <div className="d-flex justify-content-between align-items-center">
                        <h4 className="mb-0">
                          {id && "Row ID: " + apiResponse.data?.row_id}
                        </h4>
                        <Button
                          type="submit"
                          color="primary"
                          disabled={buttonLoading}
                        >
                          {buttonLoading && (
                            <Spinner
                              className="me-1 text-light spinner-border-sm"
                              size={10}
                            />
                          )}
                          {jsonData.save}
                        </Button>
                      </div>
                      <hr />
                      <div className="mb-1">
                        <Row>
                          <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label">
                              <em className="required-red">*</em>
                              {jsonData.roleType.typeName}
                            </Label>
                            <div className="mb-1">
                              <Field name="type_name">
                                {({ field }) => (
                                  <Input
                                    onKeyPress={handleKeyDown}
                                    type="text"
                                    {...field}
                                    placeholder={
                                      id === undefined ? "Type Name" : undefined // Set placeholder to undefined if id is not undefined
                                    }
                                    disabled={id !== undefined}
                                    // Set default value
                                    value={values?.type_name}
                                  />
                                )}
                              </Field>
                              <ErrorMessage
                                name="type_name"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="3" sm="12" className="mb-1">
                            <Label className="form-label">
                              <em className="required-red">*</em>
                              {jsonData.roleType.section}
                            </Label>
                          </Col>
                          <Col md="3" sm="12" className="mb-1">
                            <Label className="form-label">
                              <em className="required-red">*</em>
                              {jsonData.roleType.permission}
                            </Label>
                          </Col>
                        </Row>
                        {Section?.map((items, index) => (
                          <Row key={items.value}>
                            <Col md="3" sm="12" className="mb-1">
                              <Input
                                type="text"
                                // className="bg-dark"
                                defaultValue={items?.label}
                                disabled
                              />
                            </Col>
                            <Col md="3" sm="12" className="mb-1">
                              <Select
                                name={items?.value}
                                theme={selectThemeColors}
                                className="react-select"
                                classNamePrefix="select"
                                // Set default value based on values object
                                value={permissionOptions.find(
                                  (option) =>
                                    option.value === values[items.value]
                                )}
                                options={permissionOptions}
                                isClearable={false}
                                onChange={(selectedOption) => {
                                  setFieldValue(
                                    items?.value,
                                    selectedOption.value
                                  )
                                }}
                              />
                              <ErrorMessage
                                name={items?.value}
                                component="div"
                                className="text-danger"
                              />
                            </Col>
                          </Row>
                        ))}
                      </div>
                    </Form>
                  )}
                </Formik>
              </Row>
            </CardBody>
          </Card>
        </>
      )}
    </>
  )
}
export default SystemAdminTypeForm
