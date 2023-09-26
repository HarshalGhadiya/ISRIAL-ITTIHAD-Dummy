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
  Spinner,
} from "reactstrap"
import { SetRowPerPage, deleteHarmfulWord, getHarmfulWord } from "../../redux/harmfulWordSlice"
import CustomPagination from "../../utility/common/CustomPagination"
import { useNavigate } from "react-router"
import { useDebouncedValue } from "../../utility/common/useDebouncedValue"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import store from "../../redux/store"
import LoaderComponent from "../../utility/common/LoaderComponent"
import moment from "moment"
import jsonData from "../../locales/en/translation.json"

const HarmfulWord = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // ** States
  const rowperpage = useSelector((state) => state?.root?.harmfulWord?.rowsPerPage)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(rowperpage)
  const [searchValue, setSearchValue] = useState("")
  const [column, setColumn] = useState("")
  const [sortDirection, setSortDirection] = useState("desc")
  const [sort, setsort] = useState(true)
  const data = useSelector((state) => state?.root?.harmfulWord?.harmfulWordData)
  const loading = useSelector((state) => state?.root?.harmfulWord?.loading)
  const debouncedQuery = useDebouncedValue(searchValue, 1000)
  //for permition
  const usersite = localStorage.getItem("usersite")
  const userData = JSON.parse(localStorage.getItem("userData"))
  const permissionArr = userData?.permissions?.filter((section) => section?.section == "harmfulWords")
  const checkPermission = permissionArr[0]?.permissions?.write && permissionArr[0]?.permissions?.read
  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getHarmfulWord(
        navigate,
        currentPage,
        rowsPerPage,
        searchValue,
        sortDirection,
        column,
        true
      )
    )
  }, [dispatch, debouncedQuery, rowsPerPage, currentPage, sortDirection])

  const handleWarning = (id) => {
    Swal.fire({
      title: jsonData.harmful_word.delete_popup.title,
      text: jsonData.harmful_word.delete_popup.text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: jsonData.harmful_word.delete_popup.confirmButtonText,
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        if (data?.wordData?.length == 1 && currentPage > 1) {
          setCurrentPage((pre) => pre - 1)
        }
        store.dispatch(
          deleteHarmfulWord(
            id,
            navigate,
            currentPage,
            rowsPerPage,
            searchValue,
            sortDirection,
            column,
            data?.wordData?.length == 1
          )
        )
      }
    })
  }

  const serverSideColumns = [
    {
      name: "",
      width: "85px",
      allowOverflow: true,
      cell: (row) => {
        return (
          <div className={`d-flex gap-1`}>
            <div onClick={() => navigate(`/harmful-words/edit/${row?._id}`)} className={!checkPermission ? "cursor-not-allowed" : "cursor-pointer"}>
              <Edit color="#e8b078" size={15} className="mr-1" />
            </div>

            <div className={!checkPermission ? "cursor-not-allowed" : "cursor-pointer"}>
              <span onClick={() => handleWarning(row._id)}>
                <Trash color="#ea5556" size={15} />
              </span>
            </div>
          </div>
        )
      },
    },
    {
      sortable: true,
      name: <div className="text-capitalize">{jsonData.tableColum.id}</div>,
      width: "80px",
      selector: (row) => row.row_id,
    },
    {
      sortable: true,
      name: <div className="text-capitalize">{jsonData.tableColum.Word}</div>,
      width: "150px",
      selector: (row) => row.word,
    },
    {
      sortable: true,
      name: <div className="text-capitalize">{jsonData.tableColum.Updated}</div>,
      width: "250px",
      selector: (row) => (
        <div>
          <div>
            {row?.updatedAt && row?.updatedAt != ""
              ? moment(row?.updatedAt).format("DD.MM.YYYY HH:mm")
              : jsonData.tableColum.NA}
          </div>
          <div >
            {row?.updatedByUser
              ?<span className="text-capitalize">{row?.updatedByUser?.firstname+" " +row?.updatedByUser?.lastname}</span>
              : <span className="text-capitalize">{row?.updatedByAdmin?.firstname+ " " +row?.updatedByAdmin?.lastname}</span>}
          </div>
        </div>
      ),
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
    dispatch(SetRowPerPage(e.target.value))
    setRowsPerPage(e.target.value)
    setCurrentPage(1)
  }

  // ** Function to handle sorting
  const TableSort = (column, sortDirection) => {
    setsort(!sort)
    setColumn(column)
    setSortDirection(sortDirection)
  }

  return (
    <Fragment>
      <head>
        <title> {usersite == "israelBackOffice" ? jsonData.title.israelharmfulword : jsonData.title.ittihadharmfulword}</title>
      </head>

      <Row>
        <Col sm="12">
          <CardHeader className="mb-1">
            <Row>
              <Col
                className="d-flex align-items-center justify-content-sm-start mt-sm-0 mt-1"
                sm="8"
              >
                <CardTitle tag="h4">{jsonData.harmful_word.header}</CardTitle>
              </Col>
              <Col
                className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
                sm="4"
              >
                <Button
                  color="info"
                  className="rounded-0 me-1"
                  type="button"
                  onClick={() => navigate("/harmful-words/add")}
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
                  placeholder={jsonData.tableColum.search}
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
                  data={data.wordData}
                />
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default HarmfulWord
