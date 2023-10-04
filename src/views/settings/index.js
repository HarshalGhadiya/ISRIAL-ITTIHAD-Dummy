import React, { useRef } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useState } from "react";
import { selectThemeColors } from "@utils";
import makeAnimated from "react-select/animated";
import {
  Card,
  CardBody,
  Col,
  Input,
  Label,
  Row,
  CardHeader,
  Button,
  CardTitle,
  Spinner,
} from "reactstrap";
import CommonTemplate from "./CommonTemplate";
import FileUploader from "./FileUploader";
import validationSchema from "./setting_form_validation";
import { Fragment } from "react";
import Reachtextbox from "./Reachtextbox";
import { useDispatch, useSelector } from "react-redux";
import {
  settingPageGetData,
  settingPageGetEmailOption,
  settingPagecreateData,
  settingPageupdateData,
} from "../../redux/settingPageSlice";
import "@styles/react/libs/editor/editor.scss";
import { useEffect } from "react";
import LoaderComponent from "../../utility/common/LoaderComponent";
import jsonData from "../../locales/en/translation.json";
function Index() {
  const animatedComponents = makeAnimated();
  const dispatch = useDispatch();
  //seting page edit data
  const data = useSelector(
    (state) => state?.root?.settingPage?.settingPageData
  );
  //decalre intialvalue in state
  const [initialValues, setInitialValues] = useState({
    pages_notifications:
      data && data.length > 0 && JSON.parse(data[0]?.pages_notifications),
    comment_notifications:
      data && data.length > 0 && JSON.parse(data[0]?.comment_notifications),
    top_banner_image: data[0]?.top_banner_image,
    logo_image: data[0]?.logo_image,
    login_image: data[0]?.login_image,
    top_title: data[0]?.top_title,
    sub_title: data[0]?.sub_title,
    url_parms: data[0]?.url_parms,
    mustLogin: data[0]?.mustLogin,
    google_client_id: data[0]?.google_client_id,
    footer_text: data[0]?.footer_text,
    terms_privacy_policy: data[0]?.terms_privacy_policy,
    confirm_email_from: data[0]?.confirm_email_from,
    confirm_email_reply: data[0]?.confirm_email_reply,
    confrim_email_sub: data[0]?.confrim_email_sub,
    confirm_email_message: data[0]?.confirm_email_message,
    reset_email_from: data[0]?.reset_email_from,
    reset_email_reply: data[0]?.reset_email_reply,
    reset_email_sub: data[0]?.reset_email_sub,
    reset_email_message: data[0]?.reset_email_message,
    newpage_email_from: data[0]?.newpage_email_from,
    newpage_email_reply: data[0]?.newpage_email_reply,
    newpage_email_sub: data[0]?.newpage_email_sub,
    newpage_email_message: data[0]?.newpage_email_message,
    newcommit_email_from: data[0]?.newcommit_email_from,
    newcommit_email_reply: data[0]?.newcommit_email_reply,
    newcommit_email_sub: data[0]?.newcommit_email_sub,
    newcommit_email_message: data[0]?.newcommit_email_message,
  });
  //load componet when data is recive
  useEffect(() => {
    setInitialValues({
      pages_notifications:
        data && data.length > 0 && JSON.parse(data[0]?.pages_notifications),
      comment_notifications:
        data && data.length > 0 && JSON.parse(data[0]?.comment_notifications),
      top_banner_image: data[0]?.top_banner_image,
      logo_image: data[0]?.logo_image,
      login_image: data[0]?.login_image,
      top_title: data[0]?.top_title,
      sub_title: data[0]?.sub_title,
      url_parms: data[0]?.url_parms,
      mustLogin: data[0]?.mustLogin,
      google_client_id: data[0]?.google_client_id,
      footer_text: data[0]?.footer_text,
      terms_privacy_policy: data[0]?.terms_privacy_policy,
      confirm_email_from: data[0]?.confirm_email_from,
      confirm_email_reply: data[0]?.confirm_email_reply,
      confrim_email_sub: data[0]?.confrim_email_sub,
      confirm_email_message: data[0]?.confirm_email_message,
      reset_email_from: data[0]?.reset_email_from,
      reset_email_reply: data[0]?.reset_email_reply,
      reset_email_sub: data[0]?.reset_email_sub,
      reset_email_message: data[0]?.reset_email_message,
      newpage_email_from: data[0]?.newpage_email_from,
      newpage_email_reply: data[0]?.newpage_email_reply,
      newpage_email_sub: data[0]?.newpage_email_sub,
      newpage_email_message: data[0]?.newpage_email_message,
      newcommit_email_from: data[0]?.newcommit_email_from,
      newcommit_email_reply: data[0]?.newcommit_email_reply,
      newcommit_email_sub: data[0]?.newcommit_email_sub,
      newcommit_email_message: data[0]?.newcommit_email_message,
    });
  }, [data]);

  // Handle form submission here
  const handleSubmit = (values) => {
    console.log("value", values);
    var formData = new FormData();
    formData.set(
      "pages_notifications",
      JSON.stringify(values.pages_notifications)
    );
    formData.set(
      "comment_notifications",
      JSON.stringify(values.comment_notifications)
    );
    formData.append("top_banner_image", values.top_banner_image);
    formData.append("logo_image", values.logo_image);
    formData.append("login_image", values.login_image);
    formData.append("top_title", values.top_title);
    formData.append("sub_title", values.sub_title);
    formData.append("url_parms", values.url_parms);
    formData.append("mustLogin", values.mustLogin);
    formData.append("google_client_id", values.google_client_id);
    formData.append("footer_text", values.footer_text);
    formData.append("terms_privacy_policy", values.terms_privacy_policy);
    formData.append("confirm_email_from", values.confirm_email_from);
    formData.append("confirm_email_reply", values.confirm_email_reply);
    formData.append("confrim_email_sub", values.confrim_email_sub);
    formData.append("confirm_email_message", values.confirm_email_message);
    formData.append("reset_email_from", values.reset_email_from);
    formData.append("reset_email_reply", values.reset_email_reply);
    formData.append("reset_email_sub", values.reset_email_sub);
    formData.append("reset_email_message", values.reset_email_message);
    formData.append("newpage_email_from", values.newpage_email_from);
    formData.append("newpage_email_reply", values.newpage_email_reply);
    formData.append("newpage_email_sub", values.newpage_email_sub);
    formData.append("newpage_email_message", values.newpage_email_message);
    formData.append("newcommit_email_from", values.newcommit_email_from);
    formData.append("newcommit_email_reply", values.newcommit_email_reply);
    formData.append("newcommit_email_sub", values.newcommit_email_sub);
    formData.append("newcommit_email_message", values.newcommit_email_message);
    //dispatch(settingPagecreateData(formData));
    dispatch(settingPageupdateData(formData, data[0]?._id));
  };
  //get setting page data
  useEffect(() => {
    dispatch(settingPageGetData());
  }, []);
  //check site
  const userSite = localStorage.getItem("usersite");
  //for email option
  const systemadminEmail = useSelector(
    (state) => state?.root?.systemadmin?.systemadminData
  );
  const Emailoptions = useSelector(
    (state) => state?.root?.settingPage?.getemailoption?.map((option) => ({
      value: option.email,
      label: option.email,
    }))
  );
  //save button loding
  const buttonLoading = useSelector(
    (state) => state?.root?.settingPage?.loading
  );
  console.log(buttonLoading,'button loding')
  //get time loading
  const getdataLoading = useSelector(
    (state) => state?.root?.settingPage?.getdataloding
  );
  console.log(getdataLoading,'getdataLoading')
  //option for page notification
  const emailOptionsForPagen = systemadminEmail?.adminData?.map((option) => ({
    value: option.email,
    label: option.email,
  }));
  //option for comment notification
  const emailOptionsForcommentn = systemadminEmail?.adminData?.map(
    (option) => ({
      value: option.email,
      label: option.email,
    })
  );
  //check permision
  const PermissionArray =
    localStorage.getItem("userData") &&
    JSON.parse(localStorage.getItem("userData"))?.permissions;

  // Find permissions for "systemAdmins"
  const SettingPermissions = PermissionArray.find(
    (item) => item.section === "settings"
  );

  // Extract the read and write permissions directly
  const settingPagewritePermission =
    SettingPermissions?.permissions.write || false;
    useEffect(()=>{
      dispatch(settingPageGetEmailOption())
    },[])

  return (
    <Fragment>
      <head>
        <title>
          Settings - {userSite == "israelBackOffice" ? "Israel" : "Ittihad"}
          Today back office
        </title>
      </head>
      {getdataLoading ? (
        <LoaderComponent></LoaderComponent>
      ) : (
        <>
          <CardHeader className="mb-1">
            {/* <Row>
              <Col
                className="d-flex align-items-center justify-content-sm-start mt-sm-0 mt-1"
                sm="8"
              >
                <CardTitle tag="h4">
                  {userSite == "israelBackOffice"
                    ? jsonData?.settingPage?.israel_header
                    : jsonData?.settingPage?.ittihad_header
                  }
                </CardTitle>
              </Col>
              <Col
                className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
                sm="4"
              >
                <Button outline color="primary" onClick={() => navigate(-1)}>
                  {jsonData.back}
                </Button>
              </Col>
            </Row> */}
          </CardHeader>
          <Row>
            <Formik
              initialValues={initialValues}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, touched, errors, setFieldValue }) => (
                console.log('values',values),
                <Form>
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0 ">
                      <Col
                        className="d-flex align-items-center justify-content-sm-start mt-sm-0 mt-1"
                        sm="12"
                      >
                        <CardTitle tag="h4">
                          {userSite == "israelBackOffice"
                            ? jsonData?.settingPage?.israel_header
                            : jsonData?.settingPage?.ittihad_header}
                        </CardTitle>
                      </Col>
                    </h4>
                    <Button
                      type="submit"
                      color="primary"
                      style={{
                        cursor: !settingPagewritePermission
                          ? "not-allowed"
                          : "",
                      }}
                      disabled={buttonLoading || !settingPagewritePermission}
                    >
                      {buttonLoading && (
                        <Spinner
                          className="me-1 text-light spinner-border-sm"
                          size={10}
                        />
                      )}
                      {jsonData?.update_data_card?.save_button}
                    </Button>
                  </div>
                  <hr />
                  <Card>
                    <CardBody>
                      <Row>
                        <Col md="6" sm="12" className="mb-1">
                          <Label className="form-label" for="nameMulti">
                            <em className="required-red">*</em>
                            {jsonData?.settingPage?.senpage_notification}
                          </Label>
                          <div>
                            <CreatableSelect
                               isDisabled={!settingPagewritePermission}
                              id="pages_notifications"
                              // defaultValue={data[0]?.pages_notifications}
                              name="pages_notifications"
                              //isClearable={false}
                              theme={selectThemeColors}
                              // styles={{color:'white'}}
                              sx={{ color: "" }} // set the text color to red
                              closeMenuOnSelect={false}
                              components={animatedComponents}
                              className="react-select"
                              classNamePrefix="select"
                              options={Emailoptions}
                              isMulti
                              // value={values?.pages_notifications &&  values?.pages_notifications.length > 0 ? values.pages_notifications:[]}
                              value={
                                values &&
                                values.pages_notifications.length > 0 &&
                                values?.pages_notifications.map((val) => {
                                  const returnVal = {
                                    value: val,
                                    label: val,
                                  };
                                  return returnVal;
                                })
                              }
                              onChange={(selectedOptions) =>
                                setFieldValue(
                                  "pages_notifications",
                                  selectedOptions.map((option) => option.value)
                                )
                              }
                              // onCreateOption={handleCreation}
                            />
                          </div>
                          <ErrorMessage
                            name="pages_notifications"
                            component="div"
                            className="error-message text-danger"
                          />
                        </Col>
                        <Col md="6" sm="12" className="mb-1">
                          <Label className="form-label" for="nameMulti">
                            <em className="required-red">*</em>{" "}
                            {jsonData?.settingPage?.comment_notification}
                          </Label>
                          <div>
                            <CreatableSelect
                              id="comment_notifications"
                              color="white"
                               isDisabled={!settingPagewritePermission}
                              name="comment_notifications"
                              //isClearable={false}
                              theme={selectThemeColors}
                              closeMenuOnSelect={false}
                              components={animatedComponents}
                              className="react-select"
                              classNamePrefix="select"
                              options={Emailoptions}
                              isMulti
                              value={
                                values &&
                                values.comment_notifications.length > 0 &&
                                values?.comment_notifications.map((val) => {
                                  const returnVal = {
                                    value: val,
                                    label: val,
                                  };
                                  return returnVal;
                                })
                              }
                              onChange={(selectedOptions) =>
                                setFieldValue(
                                  "comment_notifications",
                                  selectedOptions.map((option) => option.value)
                                )
                              }
                            />
                            <ErrorMessage
                              name="comment_notifications"
                              component="div"
                              className="error-message text-danger"
                            />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>

                  <Row>
                    <Col sm="6" className="mb-1">
                      <Card>
                        <CardBody>
                          <Col sm="12" className="mb-1">
                            <em className="required-red">*</em>
                            <Label htmlFor="top_title">
                              {jsonData?.settingPage?.top_title}
                            </Label>
                            <Field name="top_title">
                              {({ field }) => (
                                <Input
                                  disabled={!settingPagewritePermission}
                                  type="text"
                                  id="top_title"
                                  placeholder= {jsonData?.settingPage?.top_title}
                                  name="top_title"
                                  dir="rtl"
                                  {...field}
                                  onChange={(event) =>
                                    setFieldValue(
                                      "top_title",
                                      event.target.value
                                    )
                                  }
                                  className="form-control"
                                />
                              )}
                            </Field>

                            <ErrorMessage
                              name="top_title"
                              component="div"
                              className="error-message text-danger"
                            />
                          </Col>
                          <Col sm="12" className="mb-1">
                            <em className="required-red">*</em>
                            <Label htmlFor="sub_title">
                              {jsonData?.settingPage?.sub_title}
                            </Label>
                            <Field name="sub_title">
                              {({ field }) => (
                                <Input
                                  type="text"
                                  disabled={!settingPagewritePermission}
                                  id="sub_title"
                                  {...field}
                                  placeholder={jsonData?.settingPage?.sub_title}
                                  name="sub_title"
                                  dir="rtl"
                                  onChange={(event) =>
                                    setFieldValue(
                                      "sub_title",
                                      event.target.value
                                    )
                                  }
                                  className="form-control"
                                />
                              )}
                            </Field>

                            <ErrorMessage
                              name="sub_title"
                              component="div"
                              className="error-message text-danger"
                            />
                          </Col>
                          <Col sm="12" className="mb-1">
                            <Label htmlFor="url_parms">
                              <em className="required-red">*</em>
                              {jsonData?.settingPage?.url_parms}
                            </Label>
                            <Field name="url_parms">
                              {({ field }) => (
                                <Input
                                  type="text"
                                  disabled={!settingPagewritePermission}
                                  id="url_parms"
                                  {...field}
                                  placeholder={jsonData?.settingPage?.url_parms}
                                  name="url_parms"
                                  onChange={(event) =>
                                    setFieldValue(
                                      "url_parms",
                                      event.target.value
                                    )
                                  }
                                  className="form-control"
                                />
                              )}
                            </Field>

                            <ErrorMessage
                              name="url_parms"
                              component="div"
                              className="error-message text-danger"
                            />
                          </Col>
                          <Col sm="12" className="mb-1">
                            <Label htmlFor="url_parms">
                              <em className="required-red">*</em>
                              {jsonData?.settingPage?.google_client_id}
                            </Label>
                            <Field name="google_client_id">
                              {({ field }) => (
                                <Input
                                  type="text"
                                  disabled={!settingPagewritePermission}
                                  id="google_client_id"
                                  {...field}
                                  name="google_client_id"
                                  placeholder={jsonData?.settingPage?.google_client_id}
                                  onChange={(event) =>
                                    setFieldValue(
                                      "google_client_id",
                                      event.target.value
                                    )
                                  }
                                  className="form-control"
                                />
                              )}
                            </Field>

                            <ErrorMessage
                              name="google_client_id"
                              component="div"
                              className="error-message text-danger"
                            />
                          </Col>
                          <Col sm="12" className="mb-1">
                            <Field name="mustLogin">
                              {({ field }) => (
                                <div className="demo-inline-spacing">
                                  <div className="form-check form-check-inline">
                                    <Input
                                      {...field}
                                      type="checkbox"
                                      checked={field.value}
                                      className={`form-check-label ${
                                        field.value ? "cursor-pointer" : ""
                                      }`}
                                      id="basic-cb-checked"
                                    />
                                    <Label for="basic-cb-checked">
                                      {jsonData?.settingPage?.must_login}
                                    </Label>
                                  </div>
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col sm="12" className="mb-1">
                      <em className="required-red">*</em>
                      <Label htmlFor="Footer title">
                        {jsonData?.settingPage?.footer_title}
                      </Label>
                      <Reachtextbox
                        setFieldValue={setFieldValue}
                        name="footer_text"
                        initialContent={data[0]?.footer_text}
                        // readonly={!settingPagewritePermission}
                      ></Reachtextbox>
                    </Col>
                    <Col sm="12" className="mb-1">
                      <Label htmlFor="Footer title">
                        <em className="required-red">*</em>
                        {jsonData?.settingPage?.terms_private}
                      </Label>
                      <Reachtextbox
                        setFieldValue={setFieldValue}
                        name="terms_privacy_policy"
                        initialContent={data[0]?.terms_privacy_policy}
                        readonly={!settingPagewritePermission}
                      ></Reachtextbox>
                      </Col>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col sm="6" className="mb-1">
                      <Card>
                        <CardBody>
                          <Label className="form-label" for="nameMulti">
                            <em className="required-red">*</em>
                            {jsonData?.settingPage?.bannr_image}
                          </Label>
                          <FileUploader
                            type="file"
                            readonly={!settingPagewritePermission}
                            id="top_banner_image"
                            name="top_banner_image"
                            setFieldValue={setFieldValue}
                            className="form-control"
                            initialPath={data[0]?.top_banner_image}
                          />
                          <ErrorMessage
                            name="top_banner_image"
                            component="div"
                            className="error-message text-danger"
                          />
                          <Row>
                            <Col sm="6" className="mb-1">
                              <em className="required-red">*</em>{" "}
                              <Label htmlFor="top_banner_image">
                                {jsonData?.settingPage?.logo_image}
                              </Label>
                              <FileUploader
                                type="file"
                                readonly={!settingPagewritePermission}
                                id="logo_image"
                                name="logo_image"
                                setFieldValue={setFieldValue}
                                className="form-control"
                                initialPath={data[0]?.logo_image}
                              />
                              <ErrorMessage
                                name="logo_image"
                                component="div"
                                className="error-message text-danger"
                              />
                            </Col>
                            <Col sm="6" className="mb-1">
                              <em className="required-red">*</em>{" "}
                              <Label htmlFor="top_banner_image">
                                {jsonData?.settingPage?.login_image}
                              </Label>
                              <FileUploader
                                type="file"
                                readonly={!settingPagewritePermission}
                                id="login_image"
                                name="login_image"
                                setFieldValue={setFieldValue}
                                className="form-control"
                                initialPath={data[0]?.login_image}
                              />
                              <ErrorMessage
                                name="login_image"
                                component="div"
                                className="error-message text-danger"
                              />
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>

                  {/* <Row>
                        <Col sm="5" className="mb-1">
                          <Label className="form-label" for="nameMulti">
                            <em className="required-red">*</em>
                            {jsonData?.settingPage?.bannr_image}
                          </Label>
                          <FileUploader
                            type="file"
                            readonly={!settingPagewritePermission}
                            id="top_banner_image"
                            name="top_banner_image"
                            setFieldValue={setFieldValue}
                            className="form-control"
                            initialPath={data[0]?.top_banner_image}
                          />
                          <ErrorMessage
                            name="top_banner_image"
                            component="div"
                            className="error-message text-danger"
                          />
                          <Row>
                            <Col sm="12" className="mb-1">
                              <em className="required-red">*</em>
                              <Label htmlFor="top_title">
                                {jsonData?.settingPage?.top_title}
                              </Label>
                              <Field name="top_title">
                                {({ field }) => (
                                  <Input
                                    disabled={!settingPagewritePermission}
                                    type="text"
                                    id="top_title"
                                    placeholder="Top title"
                                    name="top_title"
                                    dir="rtl"
                                    {...field}
                                    onChange={(event) =>
                                      setFieldValue(
                                        "top_title",
                                        event.target.value
                                      )
                                    }
                                    className="form-control"
                                  />
                                )}
                              </Field>

                              <ErrorMessage
                                name="top_title"
                                component="div"
                                className="error-message text-danger"
                              />
                            </Col>
                            <Col sm="12" className="mb-1">
                              <em className="required-red">*</em>
                              <Label htmlFor="sub_title">
                                {jsonData?.settingPage?.sub_title}
                              </Label>
                              <Field name="sub_title">
                                {({ field }) => (
                                  <Input
                                    type="text"
                                    disabled={!settingPagewritePermission}
                                    id="sub_title"
                                    {...field}
                                    placeholder="Sub title"
                                    name="sub_title"
                                    dir="rtl"
                                    onChange={(event) =>
                                      setFieldValue(
                                        "sub_title",
                                        event.target.value
                                      )
                                    }
                                    className="form-control"
                                  />
                                )}
                              </Field>

                              <ErrorMessage
                                name="sub_title"
                                component="div"
                                className="error-message text-danger"
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col sm="2" className="mb-1">
                          <em className="required-red">*</em>{" "}
                          <Label htmlFor="top_banner_image">
                            {jsonData?.settingPage?.logo_image}
                          </Label>
                          <FileUploader
                            type="file"
                            readonly={!settingPagewritePermission}
                            id="logo_image"
                            name="logo_image"
                            setFieldValue={setFieldValue}
                            className="form-control"
                            initialPath={data[0]?.logo_image}
                          />
                          <ErrorMessage
                            name="logo_image"
                            component="div"
                            className="error-message text-danger"
                          />
                        </Col>
                        <Col sm="2" className="mb-1">
                          <em className="required-red">*</em>{" "}
                          <Label htmlFor="top_banner_image">
                            {jsonData?.settingPage?.login_image}
                          </Label>
                          <FileUploader
                            type="file"
                            readonly={!settingPagewritePermission}
                            id="login_image"
                            name="login_image"
                            setFieldValue={setFieldValue}
                            className="form-control"
                            initialPath={data[0]?.login_image}
                          />
                          <ErrorMessage
                            name="login_image"
                            component="div"
                            className="error-message text-danger"
                          />
                        </Col>
                        <Col sm="3" className="mb-1">
                          <Field name="mustLogin">
                            {({ field }) => (
                              <div className="demo-inline-spacing">
                                <div className="form-check form-check-inline">
                                  <Input
                                    {...field}
                                    type="checkbox"
                                   checked={field.value}
                                   className={`form-check-label ${field.value ? 'cursor-pointer' : ''}`}
                                    id='basic-cb-checked'
                                  />
                                 <em className="required-red">*</em><Label
                                    for="basic-cb-checked"
                                  >
                                    {jsonData?.settingPage?.must_login}
                                  </Label>
                                </div>
                              </div>
                            )}
                          </Field>
                        </Col>
                      </Row> */}
                  {/* <Row>
                    <Col sm="6" className="mb-1">
                      <em className="required-red">*</em>
                      <Label htmlFor="Footer title">
                        {jsonData?.settingPage?.footer_title}
                      </Label>
                      <Reachtextbox
                        setFieldValue={setFieldValue}
                        name="footer_text"
                        initialContent={data[0]?.footer_text}
                        // readonly={!settingPagewritePermission}
                      ></Reachtextbox>
                    </Col>
                    <Col sm="6" className="mb-1">
                      <Label htmlFor="Footer title">
                        <em className="required-red">*</em>
                        {jsonData?.settingPage?.terms_private}
                      </Label>
                      <Reachtextbox
                        setFieldValue={setFieldValue}
                        name="terms_privacy_policy"
                        initialContent={data[0]?.terms_privacy_policy}
                        readonly={!settingPagewritePermission}
                      ></Reachtextbox>
                    </Col>
                  </Row> */}
                  {/* <Row>
                        <Col sm="6" className="mb-1">
                          <Label htmlFor="url_parms">
                            <em className="required-red">*</em>
                            {jsonData?.settingPage?.url_parms}
                          </Label>
                          <Field name="url_parms">
                            {({ field }) => (
                              <Input
                                type="text"
                                disabled={!settingPagewritePermission}
                                id="url_parms"
                                {...field}
                                placeholder=" URL for perms and privacy policy"
                                name="url_parms"
                                onChange={(event) =>
                                  setFieldValue("url_parms", event.target.value)
                                }
                                className="form-control"
                              />
                            )}
                          </Field>

                          <ErrorMessage
                            name="url_parms"
                            component="div"
                            className="error-message text-danger"
                          />
                        </Col>
                        <Col sm="6" className="mb-1">
                          <Label htmlFor="url_parms">
                            <em className="required-red">*</em>
                            {jsonData?.settingPage?.google_client_id}
                          </Label>
                          <Field name="google_client_id">
                            {({ field }) => (
                              <Input
                                type="text"
                                disabled={!settingPagewritePermission}
                                id="google_client_id"
                                {...field}
                                name="google_client_id"
                                placeholder="Google signing client id"
                                onChange={(event) =>
                                  setFieldValue(
                                    "google_client_id",
                                    event.target.value
                                  )
                                }
                                className="form-control"
                              />
                            )}
                          </Field>

                          <ErrorMessage
                            name="google_client_id"
                            component="div"
                            className="error-message text-danger"
                          />
                        </Col>
                      </Row> */}
                      <Row>
                      <Col sm="6" className="mb-1">
                      <CommonTemplate
                    card_header="Confirm email template"
                    setFieldValue={setFieldValue}
                    email_from="confirm_email_from"
                    email_reply="confirm_email_reply"
                    email_sub="confrim_email_sub"
                    email_message="confirm_email_message"
                    initialContent={data[0]?.confirm_email_message}
                    readonly={!settingPagewritePermission}
                  ></CommonTemplate>
                        </Col>
                        <Col sm="6" className="mb-1">
                        <CommonTemplate
                    card_header="Reset password template"
                    setFieldValue={setFieldValue}
                    email_from="reset_email_from"
                    email_reply="reset_email_reply"
                    email_sub="reset_email_sub"
                    email_message="reset_email_message"
                    initialContent={data[0]?.reset_email_message}
                    readonly={!settingPagewritePermission}
                  ></CommonTemplate>
                        </Col>
                      </Row>
                      <Row>
                      <Col sm="6" className="mb-1">
                      <CommonTemplate
                    card_header="New page template"
                    setFieldValue={setFieldValue}
                    email_from="newpage_email_from"
                    email_reply="newpage_email_reply"
                    email_sub="newpage_email_sub"
                    email_message="newpage_email_message"
                    initialContent={data[0]?.newpage_email_message}
                    readonly={!settingPagewritePermission}
                  ></CommonTemplate>
                        </Col>
                        <Col sm="6" className="mb-1">
                        <CommonTemplate
                    card_header="New comment template"
                    setFieldValue={setFieldValue}
                    email_from="newcommit_email_from"
                    email_reply="newcommit_email_reply"
                    email_sub="newcommit_email_sub"
                    email_message="newcommit_email_message"
                    initialContent={data[0]?.newcommit_email_message}
                    readonly={!settingPagewritePermission}
                  ></CommonTemplate>
                          </Col>
                      </Row>
                 
                 
                  
                 
                </Form>
              )}
            </Formik>
          </Row>
        </>
      )}
    </Fragment>
  );
}

export default Index;
