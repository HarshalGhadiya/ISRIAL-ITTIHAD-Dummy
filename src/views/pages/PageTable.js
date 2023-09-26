// ** React Imports
import { Fragment, useState, useEffect, memo } from "react"
import "@styles/react/libs/tables/react-dataTable-component.scss"

import { useSelector, useDispatch } from "react-redux"

// ** Third Party Components
import { ChevronDown, ChevronUp, Edit, Trash } from "react-feather"
import DataTable from "react-data-table-component"
import { exportToExcel } from "../../utility/common/exportToExcel"

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Row,
  Col,
  Button,
  Badge,
  Spinner,
} from "reactstrap"
import CustomPagination from "../../utility/common/CustomPagination"
import { useNavigate } from "react-router"
import { useDebouncedValue } from "../../utility/common/useDebouncedValue"
import { Link } from "react-router-dom"
import store from "../../redux/store"
import LoaderComponent from "../../utility/common/LoaderComponent"
import moment from "moment"
import { getPage, setRowPerPagePage } from "../../redux/pageSlice"
import jsonData from "../../locales/en/translation.json"

const PageTable = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // ** States
  const rowperpage = useSelector((state) => state?.root?.page?.rowsPerPagePage)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(rowperpage)
  const [searchValue, setSearchValue] = useState("")
  const [column, setColumn] = useState("row_id")
  const [sortDirection, setSortDirection] = useState("desc")
  const [sort, setsort] = useState(true)
  // const data = useSelector((state) => state?.root?.page?.pageData)
  const data = [
    {
      "_id": "650aee7fc14832994f61901d",
      "row_id": 4,
      "israelStatus": "pending",
      "ittihadStatus": "pending",
      "ittihadPublishDate": "2023-09-20T13:07:11.689Z",
      "ittihadPageCreatedBy": "6502a8d49aefafd330438638",
      "ittihadPageUpdatedBy": "6502a8d49aefafd330438638",
      "is_deleted": false,
      "ittihadUpdatedByAdmin": {
        "_id": "6502a8d49aefafd330438638",
        "firstname": "ittihad",
        "lastname": "admin"
      },
      "israelCommentCount": 0,
      "ittihadCommentCount": 0
    },
    {
      "_id": "650ae34b6b13aa846c618f88",
      "row_id": 3,
      "israelStatus": "pending",
      "ittihadStatus": "active",
      "ittihadPage": "sdsda",
      "ittihadPublishDate": "2023-09-20T12:19:19.225Z",
      "ittihadPageCreatedBy": "6502a8d49aefafd330438638",
      "ittihadPageUpdatedBy": "6502a8d49aefafd330438638",
      "is_deleted": false,
      "ittihadUpdatedByAdmin": {
        "_id": "6502a8d49aefafd330438638",
        "firstname": "ittihad",
        "lastname": "admin"
      },
      "israelCommentCount": 0,
      "ittihadCommentCount": 0
    },
    {
      "_id": "65098ac7dfc16014091b766f",
      "row_id": 2,
      "israelStatus": "active",
      "ittihadStatus": "active",
      "israelPage": "iseraelPage",
      "israelPublishDate": "2023-09-19T11:49:27.502Z",
      "israelPageCreatedBy": "6501c415c9616d135ba396f1",
      "israelPageUpdatedBy": "6501c415c9616d135ba396f1",
      "is_deleted": false,
      "ittihadPage": "test",
      "ittihadPageCreatedBy": "6502a8d49aefafd330438638",
      "ittihadPageUpdatedBy": "6502a8d49aefafd330438638",
      "israelUpdatedByAdmin": {
        "_id": "6501c415c9616d135ba396f1",
        "firstname": "israel",
        "lastname": "admin24324"
      },
      "ittihadUpdatedByAdmin": {
        "_id": "6502a8d49aefafd330438638",
        "firstname": "ittihad",
        "lastname": "admin"
      },
      "israelCommentCount": 5,
      "ittihadCommentCount": 0
    },
    {
      "_id": "6509786dad867c4e792aa00d",
      "row_id": 1,
      "israelStatus": "active",
      "ittihadStatus": "active",
      "israelPage": "iseraelPage",
      "israelPublishDate": "2023-09-19T10:31:06.640Z",
      "israelPageCreatedBy": "6501c415c9616d135ba396f1",
      "israelPageUpdatedBy": "6501c415c9616d135ba396f1",
      "is_deleted": false,
      "ittihadPage": "ittihad Page",
      "ittihadPageCreatedBy": "6502a8d49aefafd330438638",
      "ittihadPageUpdatedBy": "6502a8d49aefafd330438638",
      "israelUpdatedByAdmin": {
        "_id": "6501c415c9616d135ba396f1",
        "firstname": "israel",
        "lastname": "admin24324"
      },
      "israelCommentCount": 8,
      "ittihadCommentCount": 0
    }
  ]
  const loading = useSelector((state) => state?.root?.harmfulWord?.loading)
  const debouncedQuery = useDebouncedValue(searchValue, 1000)
  //for permition
  const usersite = localStorage.getItem("usersite")
  const userData = JSON.parse(localStorage.getItem("userData"))
  const permissionArr = userData?.permissions?.filter((section) => section?.section == "pages")
  const checkPermission = permissionArr[0]?.permissions?.write && permissionArr[0]?.permissions?.read
  console.log(data)
  // ** Get data on mount
  // useEffect(() => {
  //   dispatch(
  //     getPage(
  //       navigate,
  //       currentPage,
  //       rowsPerPage,
  //       searchValue,
  //       sortDirection,
  //       column
  //     )
  //   )
  // }, [dispatch, debouncedQuery, rowsPerPage, currentPage, sortDirection])

  const serverSideColumns = [
    {
      name: "",
      width: "85px",
      allowOverflow: true,
      cell: (row) => {
        return (
          <div className="d-flex gap-1">
            {/* <div onClick={() => navigate(`/pages/edit/${row?._id}`)} className={!checkPermission ? "cursor-not-allowed" : "cursor-pointer"}> */}
              <Edit color="#e8b078" size={15} className="mr-1" />
            {/* </div> */}
          </div>
        )
      },
    },
    {
      sortable: true,
      name: <div>{jsonData.tableColum.id}</div>,
      width: "80px",
      selector: (row) => row.row_id,
      sortField: "row_id",
    },
    {
      sortable: true,
      name: <div>{usersite == "israelBackOffice" ? jsonData.tableColum.israelStatus : jsonData.tableColum.ittihadStatus}</div>,
      width: "200px",
      selector: (row) => (
        <div>
          {usersite == "israelBackOffice" ? row?.israelStatus == "active" ? (
            <Badge color="success" className="text-capitalize">
            {jsonData.tableColum.active}
            </Badge>
          ) : row?.israelStatus == "notApproved" ? (
            <Badge color="danger">
            {jsonData.tableColum.notApproved}
            </Badge>) :
            (<Badge color="warning" className="text-capitalize">
            {jsonData.tableColum.pending}
            </Badge>) :
            row?.ittihadStatus == "active" ? (
              <Badge color="success" className="text-capitalize">
              {jsonData.tableColum.active}
              </Badge>
            ) : row?.ittihadStatus == "notApproved" ? (
              <Badge color="danger">
              {jsonData.tableColum.notApproved}
              </Badge>) :
              (<Badge color="warning" className="text-capitalize">
              {jsonData.tableColum.pending}
              </Badge>)
          }
        </div>
      ),
      sortField: usersite == "israelBackOffice" ? "israelStatus" : "ittihadStatus",
    },
    {
      sortable: true,
      name: <div >{usersite == "israelBackOffice" ? jsonData.tableColum.israelPage : jsonData.tableColum.ittihadPage}</div>,
      width: "200px",
      selector: (row) => usersite == "israelBackOffice" ? row.israelPage : row.ittihadPage,
      sortField: usersite == "israelBackOffice" ? "israelPage" : "ittihadPage",
    },
    {
      sortable: true,
      name: <div>{usersite == "israelBackOffice" ? jsonData.tableColum.israelComment : jsonData.tableColum.ittihadComment}</div>,
      width: "200px",
      selector: (row) => usersite == "israelBackOffice" ? row.israelCommentCount : row.ittihadCommentCount,
      sortField: usersite == "israelBackOffice" ? "isrealComments" : "ittihadComments",
    },
    {
      sortable: true,
      name: <div>{usersite == "israelBackOffice" ? jsonData.tableColum.israelPdate : jsonData.tableColum.ittihadPdate}</div>,
      width: "300px",
      selector: (row) => moment(usersite == "israelBackOffice" ? row?.israelPublishDate : row?.ittihadPublishDate).format("DD.MM.YYYY HH:mm"),
      sortField: usersite == "israelBackOffice" ? "israelPublishDate" : "ittihadPublishDate",
    },
    {
      sortable: true,
      name: <div>{usersite == "israelBackOffice" ?jsonData.tableColum.ittihadStatus : jsonData.tableColum.israelStatus}</div>,
      width: "200px",
      selector: (row) => (
        <div>
          {usersite == "israelBackOffice" ? row?.ittihadStatus == "active" ? (
            <Badge color="success" className="text-capitalize">
            {jsonData.tableColum.active}
            </Badge>
          ) : row?.ittihadStatus == "notApproved" ? (
            <Badge color="danger">
              {jsonData.tableColum.notApproved}
            </Badge>) :
            (<Badge color="warning" className="text-capitalize">
             {jsonData.tableColum.pending}
            </Badge>) :
            row?.israelStatus == "active" ? (
              <Badge color="success" className="text-capitalize">
              {jsonData.tableColum.active}
              </Badge>
            ) : row?.israelStatus == "notApproved" ? (
              <Badge color="danger">
                {jsonData.tableColum.notApproved}
              </Badge>) :
              (<Badge color="warning" className="text-capitalize">
               {jsonData.tableColum.pending}
              </Badge>)
          }
        </div>
      ),
      sortField: usersite == "israelBackOffice" ? "ittihadStatus" : "israelStatus",
    },
    {
      sortable: true,
      name: <div>{usersite == "israelBackOffice" ? jsonData.tableColum.ittihadPage : jsonData.tableColum.israelPage}</div>,
      width: "200px",
      selector: (row) => usersite == "israelBackOffice" ? row.ittihadPage : row.israelPage ,
      sortField: usersite == "israelBackOffice" ? "ittihadPage" : "israelPage",
    },
    {
      sortable: true,
      name: <div>{usersite == "israelBackOffice" ? jsonData.tableColum.ittihadComment : jsonData.tableColum.israelComment}</div>,
      width: "200px",
      selector: (row) => usersite == "israelBackOffice" ? row.ittihadCommentCount : row.israelCommentCount,
      sortField:  usersite == "israelBackOffice" ? "ittihadComments" : "isrealComments",
    },
    {
      sortable: true,
      name: <div >{usersite == "israelBackOffice" ? jsonData.tableColum.ittihadPdate : jsonData.tableColum.israelPdate}</div>,
      width: "300px",
      selector: (row) => moment(usersite == "israelBackOffice" ? row?.ittihadPublishDate : row?.israelPublishDate).format("DD.MM.YYYY HH:mm"),
      sortField: usersite == "israelBackOffice" ? "ittihadPublishDate" : "israelPublishDate",
    },
  ]

  // ** Function to handle filter
  const handleFilter = (e) => {
    setSearchValue(e.target.value)
    setTimeout(() => {
      setCurrentPage(1)
    }, 980)
  }

  // ** Function to handle per page
  const handlePerPage = (e) => {
    dispatch(setRowPerPagePage(e.target.value))
    setRowsPerPage(e.target.value)
    setCurrentPage(1)
  }

  // ** Function to handle sorting
  const TableSort = (column, sortDirection) => {
    setsort(!sort)
    setColumn(column.sortField)
    setSortDirection(sortDirection)
  }

  return (
    <Fragment>
      <head>
        <title>{jsonData.title.page} - {usersite == "israelBackOffice" ? jsonData.sitename.israel : jsonData.sitename.ittihad}</title>
      </head>

      <Row>
        <Col sm="12">
          <CardHeader className="mb-1">
            <Row>
              <Col
                className="d-flex align-items-center justify-content-sm-start mt-sm-0 mt-1"
                sm="8"
              >
                <CardTitle tag="h4">{jsonData.title.page}</CardTitle>
              </Col>
              <Col
                className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
                sm="4"
              >
                <Button
                  color="info"
                  className="rounded-0 me-1"
                  type="button"
                  // onClick={() => navigate("/pages/add")}
                  disabled={!checkPermission}
                >
                  {jsonData.new}
                </Button>
                <Button
                  onClick={() => {
                    exportToExcel(data, "xyz")
                  }}
                  color="primary"
                  className="rounded-0"
                  type="button"
                >
                   {jsonData.export}
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <Card>
            <Row className="mx-0 mt-1 mb-50">
              <Col sm="6">
                <div className="d-flex align-items-center">
                  <Input
                    className="dataTable-select"
                    type="select"
                    id="sort-select"
                    value={rowsPerPage}
                    onChange={(e) => handlePerPage(e)}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={75}>75</option>
                    <option value={100}>100</option>
                  </Input>
                </div>
              </Col>
              <Col
                className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
                sm="6"
              >
                <Input
                  className="dataTable-filter"
                  type="text"
                  bsSize="sm"
                  id="search-input"
                  placeholder="Search"
                  value={searchValue}
                  onChange={handleFilter}
                />
              </Col>
            </Row>
            {loading ? (
              <div className="d-flex justify-content-center align-items-center loader-container my-5">
                <Spinner />
              </div>
            ) : (
              <div className="react-dataTable">
                <DataTable
                  noHeader
                  pagination
                  paginationServer
                  onSort={TableSort}
                  className="react-dataTable"
                  columns={serverSideColumns}
                  sortIcon={<ChevronDown size={10} />}
                  defaultSortAsc={sort}
                  paginationComponent={() =>
                    CustomPagination({
                      data,
                      rowsPerPage,
                      currentPage,
                      setCurrentPage,
                    })
                  }
                  // data={data.pageData}
                  data={data}

                />
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default PageTable
