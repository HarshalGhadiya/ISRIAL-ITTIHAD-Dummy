// ** React Imports
import { Fragment, useState, useEffect, memo } from "react"

import { useSelector, useDispatch } from "react-redux"

// ** Third Party Components
import { exportToExcel } from "../../utility/common/exportToExcel"

// ** Reactstrap Imports
import {
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
  Spinner,
} from "reactstrap"
import { useNavigate } from "react-router"
import { useDebouncedValue } from "../../utility/common/useDebouncedValue"
import LoaderComponent from "../../utility/common/LoaderComponent"
import { getComment } from "../../redux/commentSlice"
import CustomCommentTable from "../../utility/common/CustomCommentTable"
import jsonData from "../../locales/en/translation.json"
import { getDownloadadta } from "../../redux/exportdataExelslice"
import moment from "moment"
const CommentTable = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // ** States
  // const rowperpage = useSelector((state) => state?.root?.comment?.rowsPerPageComment)
  const rowperpage = useSelector(
    (state) => state?.root?.harmfulWord?.rowsPerPage
  );
  //get download data
  const exportdata = useSelector(
    (state) => state?.root?.dowloadexeledata?.downloadPageData
  );
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(rowperpage)
  const [searchValue, setSearchValue] = useState("")
  const [column, setColumn] = useState('row_id')
  const [sortDirection, setSortDirection] = useState('desc')
  const data = useSelector((state) => state?.root?.comment?.commentData)
  const loading = useSelector((state) => state?.root?.comment?.loading)
  const debouncedQuery = useDebouncedValue(searchValue, 1000)
  //for permition check
  const usersite = localStorage.getItem("usersite")
  const userData = JSON.parse(localStorage.getItem("userData"))
  const permissionArr = userData?.permissions?.filter((section) => section?.section == "comments")
  const checkPermission =permissionArr[0]?.permissions?.write && permissionArr[0]?.permissions?.read
  const loadingexportbutton = useSelector(
    (state) => state?.root?.dowloadexeledata?.loading
  );
  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getComment(
        navigate,
        currentPage,
        rowsPerPage,
        searchValue,
        sortDirection,
        column,
        '',""
      )
    )
  }, [dispatch, debouncedQuery, rowsPerPage, currentPage, sortDirection])
  

    // Function to transform each item in the array
  const transformApilistResponse = (apiItem) => {
    return {
      [jsonData.tableColum.id]: apiItem.row_id,
      [jsonData.tableColum.status]: apiItem.status,
      [jsonData.tableColum.origin_site]: apiItem.site,
      [jsonData.tableColum.user]:apiItem.name ,
      [jsonData.tableColum.page_name]: apiItem.pageData,
      [jsonData.tableColum.comment]: apiItem.originalComment, // Extract the email and remove "mailto:"
      [jsonData.tableColum.submit_date]: moment(apiItem.createdAt).format("DD.MM.YYYY HH:mm"),
      [jsonData.tableColum.approval_date]: moment(apiItem.approvalDate).format("DD.MM.YYYY HH:mm"),
      [jsonData.tableColum.approval_admin]: apiItem.fullName,
      //[jsonData?.system_admin?.table?.header?.update]: moment(apiItem.updatedAt).format("DD.MM.YYYY HH:mm"),
      Updatedby: apiItem.updatedBy,
    };
  }




  return (
    <Fragment>
      <head>
        <title>{jsonData.title.comment} -{usersite == "israelBackOffice" ? jsonData.sitename.israel : jsonData.sitename.ittihad} </title>
      </head>
        <Row>
          <Col sm="12">
            <CardHeader className="mb-1">
              <Row>
                <Col
                  className="d-flex align-items-center justify-content-sm-start mt-sm-0 mt-1"
                  sm="8"
                >
                  <CardTitle tag="h4">{jsonData.title.comment}</CardTitle>
                </Col>
                <Col
                  className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
                  sm="4"
                >
                  <Button
                    onClick={()=>{
                    dispatch(getDownloadadta("comment", "", exportToExcel, jsonData.title.comment, transformApilistResponse, navigate))
                      // exportToExcel(transformedData,'comment')
                    }}
                    color="primary"
                    className="rounded-0"
                    type="button"
                    disabled={loadingexportbutton}
                  >
                     {/* {loadingexportbutton && (
                    <Spinner
                      className="me-1 text-light spinner-border-sm"
                      size={10}
                    />
                  )} */}

                     {jsonData.export}
                  </Button>
                </Col>
              </Row>
            </CardHeader>
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
              checkPermission={checkPermission}
              tableFlag={"comment"}
              />
          </Col>
        </Row>
    </Fragment>
  )
}

export default CommentTable
