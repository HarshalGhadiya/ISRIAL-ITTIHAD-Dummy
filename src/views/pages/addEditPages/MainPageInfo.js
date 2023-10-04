import React, { useEffect } from "react"
import { useNavigate } from "react-router"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Select from "react-select"
import { selectThemeColors } from "@utils"
import "@styles/react/libs/tables/react-dataTable-component.scss";
import LoaderComponent from "../../../utility/common/LoaderComponent"
import * as Yup from "yup"
import { ErrorMessage, Field, Formik, Form } from "formik"
import { useDebouncedValue } from "../../../utility/common/useDebouncedValue"
import { handleKeyDown } from "../../../utility/common/InputValidation"
import { getSingalComment } from "../../../redux/commentSlice"
import { getHarmfulWord } from "../../../redux/harmfulWordSlice"
import HistoryLogTable from "../../../utility/common/HistoryLogTable"
import jsonData from "../../../locales/en/translation.json"
import { getHistoryComment } from "../../../redux/historyLogSlice"
import { addPage, editPage, getSingalPage } from "../../../redux/pageSlice"
import moment from "moment"
import toast from "react-hot-toast"

const MainPageInfo = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  // ** States
  // const rowperpage = useSelector(
  //   (state) => state?.root?.history?.rowsPerPagePageHistory
  // );
  const rowperpage = useSelector(
    (state) => state?.root?.harmfulWord?.rowsPerPage
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowperpage);
  const [searchValue, setSearchValue] = useState("");
  const [column, setColumn] = useState("row_id");
  const [sortDirection, setSortDirection] = useState("desc");
  const [admin, setAdmin] = useState('');


  const loading = useSelector(
    (state) => state?.root?.page?.loading
  );
  const loader = useSelector(
    (state) => state?.root?.page?.addEditLoader
  );
  const data = useSelector(
    (state) => state?.root?.history?.historytData
  );
  const singalPageData = useSelector((state) => state?.root?.page?.singalPage)

  const debouncedQuery = useDebouncedValue(searchValue, 1000);
  const usersite = localStorage.getItem("usersite")

  const options = [
    { value: jsonData.Page.activeValue, label: jsonData.Page.activeLabel },
    { value: jsonData.Page.pendingValue, label: jsonData.Page.pendingLabel },
    { value: jsonData.Page.notApprovedValue, label: jsonData.Page.notApprovedLabel },
  ]
  //formik initial values
  const initialValues = {
    status: id ? usersite == "israelBackOffice" ? singalPageData?.israelStatus : singalPageData?.ittihadStatus : '',
    pageName: id ? (usersite == "israelBackOffice" ? singalPageData?.israelPage : singalPageData?.ittihadPage) : "",
    pageUrl: id ? (usersite == "israelBackOffice" ? singalPageData?.isrealUrl : singalPageData?.ittihadUrl) : "",
  }

  //validation
  const validationSchema = Yup.object().shape({
    status: Yup.string().required(jsonData.Page.statusErr).trim(),
    pageName: Yup.string().required(jsonData.Page.pageErr).trim(),
    pageUrl: Yup.string().url(jsonData.Page.urlFormatErr).required(jsonData.Page.pageUrlErr).trim(),
  })

  useEffect(() => {
    if (id) {
      dispatch(getSingalPage(navigate, id))
    }
  }, [dispatch, id])

  //get history log
  useEffect(() => {
    if (id) {
      dispatch(getHistoryComment(navigate, currentPage, rowsPerPage, searchValue, sortDirection, column, id, "pages"))
    }
  }, [dispatch, debouncedQuery, rowsPerPage, currentPage, sortDirection])

  //set admin name
  useEffect(() => {
    if (usersite === 'israelBackOffice') {
      if (singalPageData?.israelUpdatedByAdmin) {
        setAdmin(singalPageData?.israelUpdatedByAdmin?.firstname ?? '' + ' ' + singalPageData?.israelUpdatedByAdmin?.lastname ?? '')
      } else if (singalPageData?.israelUpdatedByUser) {
        setAdmin(singalPageData?.israelUpdatedByUser?.firstname ?? '' + ' ' + singalPageData?.israelUpdatedByUser?.lastname ?? '')
      }
    } else if (usersite === 'ittihadBackOffice') {
      if (singalPageData?.ittihadUpdatedByAdmin) {
        setAdmin(singalPageData?.ittihadUpdatedByAdmin?.firstname ?? '' + ' ' + singalPageData?.ittihadUpdatedByAdmin?.lastname ?? '')
      } else if (singalPageData?.ittihadUpdatedByUser) {
        setAdmin(singalPageData?.ittihadUpdatedByUser?.firstname ?? '' + ' ' + singalPageData?.ittihadUpdatedByUser?.lastname ?? '')
      }
    }
  }, [singalPageData])

  //capitale admin name
  const capitalizeName = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  const capitalAdminName = capitalizeName(admin)


  //copy function
  const handleCopyLink = async () => {
    try {
      await window?.navigator?.clipboard?.writeText(usersite == "israelBackOffice" ? singalPageData?.israelPageScript : singalPageData?.ittihadPageScript);
      toast?.success("Coppied script")
    } catch (error) {
      console.error("Error copying URL:", error);
    }
  };

  //view page
  const handleViewPage = (url) => {
    window.open(url, "_blank")
  }

  //add edit page
  const handleSubmit = (values) => {
    if (id && id != undefined) {
      const changedFields = Object.keys(values).filter(
        (field) => values[field] !== initialValues[field]
      );
      const changedFieldValues = {};
      changedFields.forEach((field) => {
        changedFieldValues[field] = values[field];
      });
      dispatch(editPage(navigate, changedFieldValues, id))
    } else {
      values.embeddedScript = "<script async src='https://comment.iti.com/js?id=UA-181032834-1'></script> <script> window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments)};} gtag('js', new Date()); gtag('config', 'UA-181032834-1'); </script>"
      dispatch(addPage(navigate, values))
    }
  }

  return (
    <>
      {loading ? <LoaderComponent /> : <>
        <Card>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({isValid, values, isSubmitting, setFieldValue }) => (
              <>
                <Form>
                  <CardBody className="pb-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="mb-0"> {id && `${jsonData.roomId}:-${singalPageData?.row_id}`}</h4>
                      <Button color="primary" disabled={loader} type="submit">
                        {loader && (
                          <Spinner
                            className="me-1 text-light spinner-border-sm"
                            size={10}
                          />
                        )}
                        {jsonData.save}
                      </Button>
                    </div>
                    <hr />
                    <Row>
                      <Col className="col-md-2">
                        <Label className="form-label" for="nameVerticalIcons">
                          <span className="text-danger">*</span>{jsonData.Comment.status}
                        </Label>
                        <Select
                          name='status'
                          theme={selectThemeColors}
                          className="react-select"
                          classNamePrefix="select"
                          defaultValue={id && options.find((option) => option.value == (usersite == "israelBackOffice" ? singalPageData?.israelStatus : singalPageData?.ittihadStatus))}
                          options={options}
                          isClearable={false}
                          onChange={(selectedOption) => {
                            setFieldValue("status", selectedOption.value)
                          }}
                        />
                        <ErrorMessage
                          name='status'
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                      <Col className="col-md-2">
                        <Label className="form-label" for="nameVerticalIcons">
                          {jsonData.Page.totalComment}
                        </Label>
                        <Input
                          type="text"
                          disabled={true}
                          value={id && (usersite == "israelBackOffice" ? singalPageData?.israelCommentCount : singalPageData?.ittihadCommentCount)}
                        />
                      </Col>

                      <Col className="col-md-2">
                        <Label className="form-label" for="nameVerticalIcons">
                          {jsonData.Page.publicDate}
                        </Label>
                        <Input
                          type="text"
                          disabled={true}
                          value={id && (usersite == "israelBackOffice" ? singalPageData?.israelPublishDate && moment(singalPageData?.israelPublishDate).format("DD.MM.YYYY HH:mm") : singalPageData?.ittihadPublishDate && moment(singalPageData?.ittihadPublishDate).format("DD.MM.YYYY HH:mm"))}
                        />
                      </Col>
                      <Col className="col-md-2">
                        <Label className="form-label" for="nameVerticalIcons">
                          {jsonData.Page.publicAdmin}
                        </Label>
                        <Input
                          type="text"
                          disabled={true}
                          value={id && capitalAdminName}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-1">
                      <Col className="col-md-6">
                        <Label className="form-label" for="nameVerticalIcons">
                          <span className="text-danger">*</span>{jsonData.Page.pageName}
                        </Label>
                        <Field name="pageName">
                          {({ field }) => (
                            <Input
                              onKeyPress={handleKeyDown}
                              type="text"
                              {...field}
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name='pageName'
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                    </Row>
                    <Row className="mt-1">
                      <Col className="col-md-6">
                        <Label className="form-label" for="nameVerticalIcons">
                          <span className="text-danger">*</span>{jsonData.Page.pageURL}
                        </Label>
                        <Field name="pageUrl">
                          {({ field }) => (
                            <Input
                              onKeyPress={handleKeyDown}
                              type="text"
                              {...field}
                            />
                          )}
                        </Field>
                        
                      </Col>
                      <Col className="col-md-2 d-flex justify-content-start align-items-end">
                        <Button type="button" color="primary" onClick={() => handleViewPage(values.pageUrl)}
                          disabled={!values.pageUrl || !validationSchema.fields.pageUrl.isValidSync(values.pageUrl)}
                        >
                          {jsonData.Page.viewPage}
                        </Button>
                      </Col>
                      <Col lg="12">
                      <ErrorMessage
                          name='pageUrl'
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                    </Row>
                    {id && id != undefined && <><Row className="mt-1">
                      <Col className="col-md-8">
                        <Label className="form-label" for="nameVerticalIcons">
                          {jsonData.Page.embededScript}
                        </Label>
                        <Input
                          type="textarea"
                          disabled={true}
                          value={id && (usersite == "israelBackOffice" ? singalPageData?.israelPageScript : singalPageData?.ittihadPageScript)}
                        />
                      </Col>
                      <Col className="col-md-2 d-flex justify-content-start align-items-end">
                        <Button type="button" color="primary" onClick={handleCopyLink}>{jsonData.Page.copyScript} </Button>
                      </Col>
                    </Row>
                      <hr />
                    </>}
                  </CardBody>
                </Form>
              </>
            )}
          </Formik>
          {id && id != undefined && <HistoryLogTable id={id} data={data} setCurrentPage={setCurrentPage} setRowsPerPage={setRowsPerPage} setSearchValue={setSearchValue} setColumn={setColumn} setSortDirection={setSortDirection} rowsPerPage={rowsPerPage} currentPage={currentPage} searchValue={searchValue} module="pages" exelsheetname={'pagehistoryLogs'} />}
        </Card> </>}
    </>
  )
}

export default MainPageInfo
