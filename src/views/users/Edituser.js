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
  NavItem,
  Nav,
  NavLink,
  Spinner,
} from "reactstrap";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { handleKeyDown } from "../../utility/common/InputValidation";
import toast from "react-hot-toast";
import jsonData from "../../locales/en/translation.json"
// ** Third Party Components
import { getComment } from '../../redux/commentSlice'
import Select from "react-select";

// ** Utils
import { selectThemeColors } from "@utils";
import { lazy, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userEditdata, userEditsingledata } from "../../redux/userSlice";
import { useDebouncedValue } from "../../utility/common/useDebouncedValue";
import CustomCommentTable from "../../utility/common/CustomCommentTable";
import LoaderComponent from "../../utility/common/LoaderComponent";
const CommentsComponents = lazy(() => import("../../views/comments"));

//status options list
const statusOptions = [
  // { value: '', label: 'Select' },
  { value: "active", label: "Active" },
  { value: "inActive", label: "In Active" },
];

//usertype option list


const Edituser = () => {
  const [rSelected, setRSelected] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const loading = useSelector((state) => state?.root?.users?.loading);

  // ** States
  // const rowperpage = useSelector((state) => state?.root?.comment?.rowsPerPagePageComment)
  const rowperpage = useSelector(
    (state) => state?.root?.harmfulWord?.rowsPerPage
  );
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(rowperpage)
  const [searchValue, setSearchValue] = useState("")
  const [column, setColumn] = useState("row_id")
  const [sortDirection, setSortDirection] = useState("desc")
  const data = useSelector((state) => state?.root?.comment?.commentData)
  console.log('comment',data)
  const loadingcomment = useSelector((state) => state?.root?.comment?.loading)
  const debouncedQuery = useDebouncedValue(searchValue, 1000)
  const usersite = localStorage.getItem("usersite")

  //formik validation schema
  const validationSchema = Yup.object().shape({
    status: Yup.string().required("Status is required"),
    name: Yup.string(),
    site: Yup.string(),
    email: Yup.string(),
    total_commnet: Yup.string(),
    registration: Yup.string(),
    lastSeen: Yup.string(),
    device: Yup.string(),
    last_ip_address: Yup.string(),
    approvedComments: Yup.string(),
    notApprovedComments: Yup.string(),
    pendingComments: Yup.string(),
  });
  const EditsingleData = useSelector(
    (state) => state?.root?.users?.usereditsingledata
  );
  console.log("editsibgle", EditsingleData);
  useEffect(() => {
    dispatch(userEditsingledata(navigate, id));
  }, []);
  useEffect(() => {
    dispatch(
      getComment(
        navigate,
        currentPage,
        rowsPerPage,
        searchValue,
        sortDirection,
        column,
        "",
        id,

      )
    )
  }, [dispatch, debouncedQuery, rowsPerPage, currentPage, sortDirection])

  //formik initial values
  const initialValues = {
    status: EditsingleData?.status,
    name: EditsingleData?.name,
    site: EditsingleData?.site,
    email: EditsingleData?.email,
    total_commnet: EditsingleData?.totalComments,
    registration: EditsingleData?.updatedAt,
    lastSeen: EditsingleData?.lastSeen,
    device: EditsingleData?.device,
    last_ip_address: EditsingleData?.ip,
    approvedComments:EditsingleData?.approvedComments,
    notApprovedComments: EditsingleData?.notApprovedComments,
    pendingComments: EditsingleData?.pendingComments,
  };

  const handleSubmit = (values, onSubmitProps) => {
    console.log(values, "values");
    dispatch(userEditdata(values.status, navigate, id));
    // navigate("/otp-code")
  };
  
  const PermissionArray =
    localStorage.getItem("userData") &&
    JSON.parse(localStorage.getItem("userData"))?.permissions;

  // Find permissions for "systemAdmins"
  const UsersPermissions = PermissionArray.find(
    (item) => item.section === "users"
  );
  // Extract the read and write permissions directly
  const UsersPagewritePermission = UsersPermissions?.permissions.write || false;
  const readPermission = UsersPermissions?.permissions.read || false;
  const combindpermisttion = UsersPagewritePermission && readPermission;
  useEffect(() => {
    if (!combindpermisttion) {
      navigate("/users");
      toast.error('You are not authorize to access.', {
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
  }, []);
  return (
    <>
      <head>
        <title>
        Edit Users - {usersite == "israelBackOffice" ? "Israel " : "Ittihad"}
          Today back office
        </title>
      </head>
      <div>
        {
          loading ? <LoaderComponent></LoaderComponent>:
          <>
              <CardHeader className=" mb-2 d-flex justify-content-between align-items-center">
          <CardTitle tag="h4">{jsonData?.user?.title}</CardTitle>
          <Button
            onClick={() => {
              navigate("/users");
            }}
            outline
            color="primary"
            type="button"
          >
            Back
          </Button>
        </CardHeader>
        <Col className="" md="12" lg="12">
          <Nav tabs>
            <NavItem>
              <NavLink onClick={() => setRSelected(1)} active={rSelected === 1}>
              {jsonData?.user?.user_edit_form?.general_info}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => setRSelected(2)} active={rSelected === 2}>
              {jsonData?.user?.user_edit_form?.comments}
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        {rSelected === 1 ? (
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
                    (
                      <Form>
                        <div className="d-flex justify-content-between align-items-center">
                          <h4 className="mb-0">
                            Row ID : {EditsingleData?.row_id}
                          </h4>
                          <Button
                            type="submit"
                            color="primary"
                            style={{
                              cursor: !UsersPagewritePermission
                                ? "not-allowed"
                                : "",
                            }}
                            disabled={loading || !UsersPagewritePermission}
                          >
                            {loading && (
                              <Spinner
                                className="me-1 text-light spinner-border-sm"
                                size={10}
                              />
                            )}
                             {jsonData?.user?.user_edit_form?.save}
                          </Button>
                        </div>
                        <hr />
                        <div className="mb-1">
                          <Row>
                            <Col md="3" sm="12" className="mb-1">
                            <em className="required-red">*</em><Label className="form-label"> {jsonData?.user?.user_edit_form?.status}</Label>
                              <Select
                                name="status"
                                isDisabled={!readPermission}
                                theme={selectThemeColors}
                                className="react-select"
                                classNamePrefix="select"
                                //defaultValue={statusOptions[0]}
                                defaultValue={statusOptions.find(
                                  (option) =>
                                    option.value === EditsingleData?.status
                                ) }
                                options={statusOptions}
                                isClearable={false}
                                onChange={(selectedOption) => {
                                  setFieldValue("status", selectedOption.value);
                                }}
                              />
                              <ErrorMessage
                                name="status"
                                component="div"
                                className="text-danger"
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md="3" sm="12" className="mb-1">
                              <Label className="form-label"> {jsonData?.user?.user_edit_form?.name}</Label>
                              <Field name="name">
                                {({ field }) => (
                                  <Input
                                    disabled={true}
                                    onKeyPress={handleKeyDown}
                                    type="text"
                                    {...field}
                                    placeholder="Nick name"
                                  />
                                )}
                              </Field>
                              <ErrorMessage
                                name="name"
                                component="div"
                                className="text-danger"
                              />
                            </Col>
                            <Col md="3" sm="12" className="mb-1">
                              <Label className="form-label">{jsonData?.user?.user_edit_form?.site}</Label>
                              <Field name="site">
                                {({ field }) => (
                                  <Input
                                    disabled={true}
                                    onKeyPress={handleKeyDown}
                                    type="text"
                                    {...field}
                                    placeholder={jsonData?.user?.user_edit_form?.site}
                                  />
                                )}
                              </Field>
                              <ErrorMessage
                                name="site"
                                component="div"
                                className="text-danger"
                              />
                            </Col>
                            <Col md="3" sm="12" className="mb-1">
                              <Label className="form-label">{jsonData?.user?.user_edit_form?.email}</Label>
                              <Field name="email">
                                {({ field }) => (
                                  <Input
                                    disabled={true}
                                    onKeyPress={handleKeyDown}
                                    type="text"
                                    {...field}
                                    placeholder={jsonData?.user?.user_edit_form?.email}
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
                              <Label className="form-label">
                              {jsonData?.user?.user_edit_form?.total_comments}
                              </Label>
                              <Field name="total_commnet">
                                {({ field }) => (
                                  <Input
                                    disabled={true}
                                    onKeyPress={handleKeyDown}
                                    type="number"
                                    {...field}
                                    placeholder={EditsingleData?.total_commnet || '0'}
                                    maxLength={11}
                                  />
                                )}
                              </Field>
                              <ErrorMessage
                                name="total_commnet"
                                component="div"
                                className="text-danger"
                              />
                            </Col>
                          </Row>
                          {/* <h4 className='mb-0'>Password</h4> */}
                          <Row>
                            <Col md="3" sm="12" className="mb-1">
                              <Label className="form-label">{jsonData?.user?.user_edit_form?.registration}</Label>
                              <div className="mb-1">
                                <Field name="registration">
                                  {({ field }) => (
                                    <Input
                                      disabled={true}
                                      onKeyPress={handleKeyDown}
                                      type="text"
                                      {...field}
                                      placeholder={jsonData?.user?.user_edit_form?.registration}
                                    />
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="registration"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </Col>
                            <Col md="3" sm="12" className="mb-1">
                              <Label className="form-label">{jsonData?.user?.user_edit_form?.last_seen}</Label>
                              <div className="mb-1">
                                <Field name="lastSeen">
                                  {({ field }) => (
                                    <Input
                                      disabled={true}
                                      onKeyPress={handleKeyDown}
                                      type="text"
                                      {...field}
                                      placeholder={EditsingleData?.lastSeen || '-'}
                                    />
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="lastSeen"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </Col>
                            <Col md="3" sm="12" className="mb-1">
                              <Label className="form-label">{jsonData?.user?.user_edit_form?.last_device}</Label>
                              <div className="mb-1">
                                <Field name="device">
                                  {({ field }) => (
                                    <Input
                                      disabled={true}
                                      onKeyPress={handleKeyDown}
                                      type="text"
                                      {...field}
                                      placeholder={EditsingleData?.device || '-'}
                                    />
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="device"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </Col>
                            <Col md="3" sm="12" className="mb-1">
                              <Label className="form-label">
                              {jsonData?.user?.user_edit_form?.last_ip_address}
                              </Label>
                              <div className="mb-1">
                                <Field name="last_ip_address">
                                  {({ field }) => (
                                    <Input
                                      disabled={true}
                                      onKeyPress={handleKeyDown}
                                      type="text"
                                      {...field}
                                      placeholder={EditsingleData?.ip || '-'}
                                    />
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="last_ip_address"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="3" sm="12" className="mb-1">
                              <Label className="form-label">
                              {jsonData?.user?.user_edit_form?.approved_comments}
                              </Label>
                              <div className="mb-1">
                                <Field name="approvedComments">
                                  {({ field }) => (
                                    <Input
                                      disabled={true}
                                      onKeyPress={handleKeyDown}
                                      type="text"
                                      {...field}
                                      placeholder={EditsingleData?.approvedComments || '0'}
                                    />
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="approve_comment"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </Col>
                            <Col md="3" sm="12" className="mb-1">
                              <Label className="form-label">
                              {jsonData?.user?.user_edit_form?.not_approved_comments}
                              </Label>
                              <div className="mb-1">
                                <Field name="notApprovedComments">
                                  {({ field }) => (
                                    <Input
                                      disabled={true}
                                      onKeyPress={handleKeyDown}
                                      type="text"
                                      {...field}
                                      placeholder={EditsingleData?.notApprovedComments || '0'}
                                    />
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="notApprovedComments"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </Col>
                            <Col md="3" sm="12" className="mb-1">
                              <Label className="form-label">
                              {jsonData?.user?.user_edit_form?.pending_comments}
                              </Label>
                              <div className="mb-1">
                                <Field name="pendingComments">
                                  {({ field }) => (
                                    <Input
                                      disabled={true}
                                      onKeyPress={handleKeyDown}
                                      type="text"
                                      {...field}
                                      placeholder={EditsingleData?.pendingComments || '0'}
                                    />
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="pendingComments"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Form>
                    )
                  )}
                </Formik>
              </Row>
            </CardBody>
          </Card>
        ) : (
          <CustomCommentTable
          data={data}
          setSortDirection={setSortDirection}
          setColumn={setColumn}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          loading={loading}
          checkPermission={true}
          tableFlag={"pageComment"}
        />
        )}
          </>
        }
       
      </div>
    </>
  );
};
export default Edituser;
