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
} from "reactstrap";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { handleKeyDown,NumberhandleKeyPress } from "../../utility/common/InputValidation";
import jsonData from "../../locales/en/translation.json";
// ** Third Party Components
import Select from "react-select";

// ** Utils
import { selectThemeColors } from "@utils";
import SystempasswordForm from "./Components/SystempasswordForm";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  SystemAdminDropdownRolelistapiCall,
  SystemAdminEditcell,
  SystemAdminsingleformdata,
  resetSytemadminSingleData,
} from "../../redux/systemAdminSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import LoaderComponent from "../../utility/common/LoaderComponent";

//status options list
//const userSite = localStorage.getItem("usersite");

//Status options


//Site option list
const siteOptions = [
  { value: "systemBackOffice", label: "System Admin" },
  { value: "israelBackOffice", label: "Israel Back Office" },
  { value: "ittihadBackOffice", label: "Ittihad Back Office" },
  // { value: 'other', label: 'other' },
];

const SystemAdmineditForm = () => {
  const [role] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({});
  const { id } = useParams();
  const [selectedUsertype, setselectedUsertype] = useState();
  const [selectedStatus, setselectedStatus] = useState({
    value: "active",
    label: "Active",
  });
  const [userTypeOptions, setUserTypeOptions] = useState([])

  const loading = useSelector((state) => state?.root?.systemadmin?.loading);
  const AdminEditformdata = useSelector(
    (state) => state?.root?.systemadmin?.systemadmingetsingledata
  );
  const SytemuserTypeData = useSelector(
    (state) => state?.root?.systemadmin?.sytemuserTypeData
  );
  const userSite = useSelector(
    (state) => state?.root?.auth?.tokendata?.data?.data?.site
  )
  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inActive", label: "In Active" },
    ...(userSite === "systemBackOffice"
      ? [{ value: "deleted", label: "Deleted" }]
      : []),
  ];
  console.log(SytemuserTypeData, "SytemuserTypeData ")


  // useEffect(() => {
  //   console.log(SytemuserTypeData, "SytemuserTypeData", selectedUsertype);

    
  // }, [selectedUsertype]);
  //formik validation schema
  const validationSchema = Yup.object().shape({
    status: Yup.string().required(jsonData?.error_msg?.status?.required),
    // user_type: Yup.string().required("User type is required"),
    firstname: Yup.string()
      .required(jsonData?.error_msg?.firstname?.required)
      .trim(),
    lastname: Yup.string().required(jsonData?.error_msg?.lastname?.required).trim(),
    email: Yup.string()
      .email(jsonData?.error_msg?.email?.invalid)
      .required(jsonData?.error_msg?.email?.required).trim(),
    phone: Yup.string().required(jsonData?.error_msg?.phone?.required).trim(),

    // Include "site" validation based on role
    ...(userSite == "systemBackOffice"
      ? { site: Yup.string().required(jsonData?.error_msg?.site?.required) }
      : {}), // Include "site" validation if role is 1
  });

  useEffect(()=>{


    setUserTypeOptions(

    SytemuserTypeData && SytemuserTypeData?.length > 0
    ? SytemuserTypeData?.map((item) => ({
        value: item._id,
        label: item.role,
      }))
    : [])
    setInitialValues({...initialValues , user_type: SytemuserTypeData && SytemuserTypeData?.length > 0
      ? SytemuserTypeData?.map((item) => ({
          value: item._id,
          label: item.role,
        }))
      : [] })


  },[SytemuserTypeData])

  //formik initial values

  const handleSubmit = (values, onSubmitProps) => {
    console.log(values, "values");
    dispatch(SystemAdminEditcell({...values , user_type:  userSite == "systemBackOffice" ?values?.user_type[0]?.value :values?.user_type?.value }, navigate, id));
    // navigate("/otp-code")
  };

  const handleChange = (e)=>{
    console.log("###" , e.target.name , e.target.value)
  }
  const PermissionArray =
    localStorage.getItem("userData") &&
    JSON.parse(localStorage.getItem("userData"))?.permissions;

  // Find permissions for "systemAdmins"
  const systemAdminsPermissions = PermissionArray?.find(
    (item) => item.section === "systemAdmins"
  );

  // Extract the read and write permissions directly
  const readPermission = systemAdminsPermissions?.permissions.read || false;
  const writePermission = systemAdminsPermissions?.permissions.write || false;

  const CombinePermission = readPermission && writePermission;
  useEffect(() => {
    if (!CombinePermission) {
      navigate("/system-admins");
      toast.error("You are not authorize to access.", {
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
  useEffect(() => {
    if(AdminEditformdata){
      setInitialValues({
        status: AdminEditformdata[0]?.status,
        user_type: AdminEditformdata[0]?.user_type,
        firstname: AdminEditformdata[0]?.firstname,
        lastname: AdminEditformdata[0]?.lastname,
        email: AdminEditformdata[0]?.email,
        phone: AdminEditformdata[0]?.phone,
        // Include "site" based on role
        ...(userSite === "systemBackOffice"
          ? { site: AdminEditformdata[0]?.site }
          : {}), // Include "site" if role is 1
      });

    }

  }, [AdminEditformdata]);
  useEffect(() => {
    dispatch(SystemAdminsingleformdata(id, navigate));
  }, []);
  useEffect(()=>{

  },[AdminEditformdata])
  return (  
    <>
      <head>
        <title>
          Edit Admin -
          {userSite == "systemBackOffice"
            ? "System Back Office"
            : userSite == "israelBackOffice"
            ? "Israel Today Back Office"
            : "Ittihad Today Back Office"}
        </title>
      </head>
      <div>
       {loading ? (<LoaderComponent></LoaderComponent>):(
        <>
           <CardHeader className=" mb-2 d-flex justify-content-between align-items-center">
           <CardTitle tag="h4">System admins</CardTitle>
           <Button
             className=""
             onClick={() => {
               navigate("/system-admins");
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
                 enableReinitialize
                 validationSchema={validationSchema}
                 onSubmit={handleSubmit}
                 onChange={handleChange}

               >
                 {({ values, isSubmitting, setFieldValue, errors }) => (
                  // setFieldValue('user_type' ,userTypeOptions),
                  console.log(values,'219'),
                   <Form>
                     <div className="d-flex justify-content-between align-items-center">
                       <h4 className="mb-0">
                         Row ID : {AdminEditformdata && AdminEditformdata[0] && AdminEditformdata[0]?.row_id}
                       </h4>
                       <Button
                         type="submit"
                         color="primary"
                         className={!writePermission && "p-none"}
                         disabled={loading}
                       >
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
                           <Label className="form-label">
                             <em className="required-red">*</em>
                             {jsonData?.system_admin?.forms?.status}
                           </Label>
                           <Select
                             name="status"
                             theme={selectThemeColors}
                             className="react-select"
                             classNamePrefix="select"
                             defaultValue={AdminEditformdata && AdminEditformdata?.length > 0 ? statusOptions?.find(
                               (option) =>
                                 option.value === AdminEditformdata[0]?.status
                             ):[]}
                             options={statusOptions}
                             isClearable={false}
                             onChange={(selectedOption) => {
                               console.log(selectedOption, 'selectoption')
                               setFieldValue("status", selectedOption.value);
                               setselectedStatus(selectedOption);
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
                             <Label className="form-label">
                               <em className="required-red">*</em>
                               {jsonData?.system_admin?.forms?.site}
                             </Label>
                             <Select
                               name="site"
                               theme={selectThemeColors}
                               className="react-select"
                               classNamePrefix="select"
                               // defaultValue={() => {
                               //   const lable = AdminEditformdata[0]?.site ===
                               //   "systemBackOffice"
                               //     ? "System Admin"
                               //     : AdminEditformdata[0]?.site ===
                               //       "israelBackOffice"
                               //     ? "Israel Back Office"
                               //     : "Ittihad Back Office"
                               //   return {
                               //     value: AdminEditformdata[0]?.user_type,
                               //     label:lable
                                     
                               //   };
                               // }}
                               defaultValue={AdminEditformdata && AdminEditformdata?.length > 0 ? siteOptions?.find(
                                 (option) => 
                                   option?.value === AdminEditformdata[0]?.site
                               ):[]}
                               //defaultValue={siteOptions.find(option => option.value === AdminEditformdata && AdminEditformdata.length>0&& AdminEditformdata[0]?.site)}
                               options={siteOptions}
                               isClearable={false}
                               onChange={(selectedOption) => {
                                 console.log(selectedOption, "select")
                                 setselectedUsertype(selectedOption);
                                 setFieldValue("site", selectedOption.value);
                                 setInitialValues({...initialValues, site:  selectedOption?.value})
                               //  setFieldValue("user_type", userTypeOptions[0].value)
                                 dispatch(
                                  SystemAdminDropdownRolelistapiCall(
                                    selectedOption?.value,
                                    navigate
                                  )
                                );
                               }}
                             />
                             <ErrorMessage
                               name="site"
                               component="div"
                               className="text-danger"
                             />
                           </Col>
                         )}
                         <Col md="3" sm="12" className="mb-1">
                           <Label className="form-label">
                             <em className="required-red">*</em>
                             {jsonData?.system_admin?.forms?.user_type}
                           </Label>
                           {
                            userSite == 'systemBackOffice' ?
                            <Select
                            name="user_type"
                            theme={selectThemeColors}
                            className="react-select"
                            classNamePrefix="select"
                            value={userTypeOptions[0]}
                           //  defaultValue={userTypeOptions.find(
                           //   (option) => 
                           //     option?.value === AdminEditformdata[0]?.user_type
                           // )}
                            options={userTypeOptions}
                            isClearable={false}
                            onChange={(selectedOption) => {
                              setFieldValue("user_type", selectedOption.value);
                            }}
                          />:<Select
                          name="user_type"
                          theme={selectThemeColors}
                          className="react-select"
                          classNamePrefix="select"
                          // value={userTypeOptions.find(
                          //   (option) => 
                          //      option?.value === AdminEditformdata[0]?.user_type
                          // )}
                           defaultValue={AdminEditformdata && AdminEditformdata?.length > 0 ? userTypeOptions?.find(
                           (option) => 
                              option?.value === AdminEditformdata[0]?.user_type
                         ):[]}
                          options={userTypeOptions}
                          isClearable={false}
                          onChange={(selectedOption) => {
                            setFieldValue("user_type", selectedOption);
                          }}
                        />
                           }
                          
                           <ErrorMessage
                             name="user_type"
                             component="div"
                             className="text-danger"
                           />
                         </Col>
                       </Row>
                       <Row>
                         <Col md="3" sm="12" className="mb-1">
                           <Label className="form-label">
                             <em className="required-red">*</em>
                             {jsonData?.system_admin?.forms?.firstname?.lable}
                           </Label>
                           <Field name="firstname">
                             {({ field }) => (
                               <Input
                                 onKeyPress={handleKeyDown}
                                 type="text"
                                 {...field}
                                 placeholder="First Name"
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
                           <Label className="form-label">
                             <em className="required-red">*</em>
                             {jsonData?.system_admin?.forms?.lastname?.lable}
                           </Label>
                           <Field name="lastname">
                             {({ field }) => (
                               <Input
                                 onKeyPress={handleKeyDown}
                                 type="text"
                                 {...field}
                                 placeholder="Last Name"
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
                           <Label className="form-label">
                             <em className="required-red">*</em>
                             {jsonData?.system_admin?.forms?.email?.lable}
                           </Label>
                           <Field name="email">
                             {({ field }) => (
                               <Input
                                 disabled={true}
                                 onKeyPress={handleKeyDown}
                                 type="text"
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
                         </Col>
                         <Col md="3" sm="12" className="mb-1">
                           <Label className="form-label">
                             <em className="required-red">*</em>
                             {jsonData?.system_admin?.forms?.phone?.lable}
                           </Label>
                           <Field name="phone">
                             {({ field }) => (
                               <Input
                               onKeyDown={(e) =>
                                NumberhandleKeyPress(e, field)
                              }
                              type="text"
                                 {...field}
                                 placeholder="Phone"
                                 maxLength={10}
                               />
                             )}
                           </Field>
                           <ErrorMessage
                             name="phone"
                             component="div"
                             className="text-danger"
                           />
                         </Col>
                       </Row>
                     </div>
                   </Form>
                 )}
               </Formik>
             </Row>
           </CardBody>
         </Card>
         <SystempasswordForm />
         </>
       ) 

        }
       
      </div>
    </>
  );
};
export default SystemAdmineditForm;
