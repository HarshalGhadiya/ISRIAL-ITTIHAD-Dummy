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
import { addPage } from "../../../redux/pageSlice"

const MainPageInfo = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  // ** States
  const rowperpage = useSelector(
    (state) => state?.root?.history?.rowsPerPagePageHistory
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowperpage);
  const [searchValue, setSearchValue] = useState("");
  const [column, setColumn] = useState("row_id");
  const [sortDirection, setSortDirection] = useState("desc");
  const data = useSelector(
    (state) => state?.root?.comment?.commentHistoryData
  );
  const loading = useSelector(
    (state) => state?.root?.comment?.loading
  );
  const debouncedQuery = useDebouncedValue(searchValue, 1000);
  const usersite = localStorage.getItem("usersite")

  const options = [
    { value: jsonData.Page.activeValue, label: jsonData.Page.activeLabel },
    { value: jsonData.Page.inactiveValue, label: jsonData.Page.inactiveLabel },
  ]
  //formik initial values
  const initialValues = {
    status: "",
    pageName: "",
    pageUrl: "",
  }

  const validationSchema = Yup.object().shape({
    status: Yup.string().required(jsonData.Page.statusErr).trim(),
    pageName: Yup.string().required(jsonData.Page.pageErr).trim(),
    pageUrl: Yup.string().required(jsonData.Page.pageUrlErr).trim(),
  })

  useEffect(() => {
    if (id) {
      // dispatch(getSingalComment(navigate, id))
      dispatch(
        getHarmfulWord(navigate, '', '', '', '', '', false)
      );
    }
  }, [dispatch, id])

  useEffect(() => {
    // dispatch(getHistoryComment(navigate, currentPage, rowsPerPage, searchValue, sortDirection, column,id, "pages"))
  }, [dispatch, debouncedQuery, rowsPerPage, currentPage, sortDirection])

  const handleSubmit = (values) => {
    // console.log(values)
    values.embeddedScript = "<script async src='https://comment.iti.com/js?id=UA-181032834-1'></script> <script> window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments)};} gtag('js', new Date()); gtag('config', 'UA-181032834-1'); </script>"
      dispatch(addPage(navigate, values))
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
            {({ values, isSubmitting, setFieldValue }) => (
              <>
                <Form>
                  <CardBody className="pb-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="mb-0"> {id && `${jsonData.roomId}:-${data?.row_id}`}</h4>
                      <Button color="primary" disabled={loading} type="submit">
                        {loading && (
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
                          // defaultValue={selectedStatus}
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
                          value={id && 30}
                        />
                      </Col>

                      <Col className="col-md-2">
                        <Label className="form-label" for="nameVerticalIcons">
                          {jsonData.Page.publicDate}
                        </Label>
                        <Input
                          type="text"
                          disabled={true}
                          value={id && "2023-09-13T05:13:04.113Z"}
                        />
                      </Col>
                      <Col className="col-md-2">
                        <Label className="form-label" for="nameVerticalIcons">
                          {jsonData.Page.publicAdmin}
                        </Label>
                        <Input
                          type="text"
                          disabled={true}
                          value={ id && "Admin Name"}
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
                        <ErrorMessage
                          name='pageUrl'
                          component="div"
                          className="text-danger"
                        />

                      </Col>
                      <Col className="col-md-2 d-flex justify-content-start align-items-end">
                        <Button type="button" color="primary">{jsonData.Page.viewPage} </Button>
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
                          value={"<Scrip></Scrip>"}
                        />
                      </Col>
                      <Col className="col-md-2 d-flex justify-content-start align-items-end">
                        <Button type="button" color="primary">{jsonData.Page.copyScript} </Button>
                      </Col>
                    </Row>
                      <hr />
                    </>}
                  </CardBody>
                </Form>
              </>
            )}
          </Formik>
          {id && id != undefined && <HistoryLogTable data={data} setCurrentPage={setCurrentPage} setRowsPerPage={setRowsPerPage} setSearchValue={setSearchValue} setColumn={setColumn} setSortDirection={setSortDirection} rowsPerPage={rowsPerPage} currentPage={currentPage} searchValue={searchValue} module="pages" />}
        </Card> </>}
    </>
  )
}

export default MainPageInfo
