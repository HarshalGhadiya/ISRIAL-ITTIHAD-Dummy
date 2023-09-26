// ** React Imports
import { Fragment, useState, useEffect, memo } from "react"

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss"

// ** Store & Actions
// import { getData } from '../store'
import { useSelector, useDispatch } from "react-redux"

// ** Third Party Components
import ReactPaginate from "react-paginate"
import { ChevronDown, Edit, Edit3, Loader, Trash2 } from "react-feather"
import DataTable from "react-data-table-component"
import moment from "moment"
import Swal from "sweetalert2"

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
} from "reactstrap"

import { useDebouncedValue } from "../../utility/common/useDebouncedValue"
import { handleKeyDown } from "../../utility/common/InputValidation"
import { exportToExcel } from "../../utility/common/exportToExcel"
import {
  SystemAdmindeleteapiCall,
  SystemAdminlistapiCall,
} from "../../redux/systemAdminSlice"
import { useNavigate } from "react-router-dom"
import LoaderComponent from "../../utility/common/LoaderComponent"

const SystemAdmintypeTable = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loading = useSelector((state) => state?.root?.adminRoleType?.loading)

  const systemadminData = useSelector(
    (state) => state?.root?.systemadmin?.systemadminData
  )

  // ** States
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchValue, setSearchValue] = useState("")
  const [sortColumn, setSortColumn] = useState("updatedAt")
  const [sortDirection, setSortDirection] = useState("asc")
  const [rSelected, setRSelected] = useState(1)
  const [role, setRole] = useState(2)

  const debouncedValue = useDebouncedValue(searchValue, 1000)

  //useEffect API call
  useEffect(() => {
    const pages = searchValue !== "" ? 1 : currentPage
    // fetchData(pages, rowsPerPage, debouncedValue);
    dispatch(
      SystemAdminlistapiCall(
        pages,
        rowsPerPage,
        searchValue,
        sortColumn,
        sortDirection,
        navigate
      )
    )
  }, [debouncedValue, currentPage, rowsPerPage, sortColumn, sortDirection])

  //System Admin Type coloumn
  const systemAdminTypeColumns = [
    {
      // sortable: true,
      // name: 'id',
      width: "100px",
      selector: (row) => (
        <div>
          <Edit3
            size={20}
            color="#e8b078"
            onClick={() => navigate(`/system-admins/type/${row?._id}`)}
          />
          <Trash2
            size={20}
            className="ml-5"
            color="#ea5556"
            onClick={() => {
              handleRoleWarning(row)
            }}
          />
        </div>
      ),
      // sortField: "row_id"
    },
    {
      sortable: true,
      name: "id",
      width: "80px",
      selector: (row) => row?.row_id,
      sortField: "row_id",
    },
    {
      sortable: true,
      name: "Type name",
      width: "80px",
      selector: (row) => (isString(row?.role) ? row?.role : ""),

      sortField: "role",
    },
    {
      sortable: true,
      name: "Last seen",
      width: "250px",
      selector: (row) => moment(row?.createdAt).format("DD.MM.YYYY HH:mm"),
      sortField: "lastSeen",
    },
    {
      sortable: true,
      name: "Updated",
      width: "250px",
      selector: (row) => moment(row?.updatedAt).format("DD.MM.YYYY HH:mm"),
      sortField: "updatedAt",
    },
  ]

  const handleWarning = (rowdata) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this Admin",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        // if (Questionslist?.result?.length == 1 && pageNumber > 1) {
        //     setpageNumber((pre) => pre - 1);
        // }
        // console.log(id)
        const pages = searchValue !== "" ? 1 : currentPage
        // console.log(rowdata,'rowdata')
        dispatch(
          SystemAdmindeleteapiCall(
            rowdata?._id,
            navigate,
            pages,
            rowsPerPage,
            searchValue,
            sortColumn,
            sortDirection
          )
        )
      }
    })
  }

  // ** Function to handle filter
  const handleFilter = (e) => {
    setSearchValue(e.target.value)
    setTimeout(() => {
      setCurrentPage(1)
    }, 980)
  }

  // ** Function to handle Pagination and get data
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1)
  }

  // ** Function to handle per page
  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value))
  }

  // ** Function for sorting data
  const handleSort = (column, sortDirection) => {
    setSortDirection(sortDirection)
    setSortColumn(column?.sortField)
    // console.log(column, sortDirection,'sortDirection')
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = 10
    //  Math.ceil(store.total / rowsPerPage)

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel="..."
        pageCount={Math.ceil(systemadminData?.pageCount) || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName="page-item"
        breakClassName="page-item"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item next-item"
        previousClassName="page-item prev-item"
        containerClassName={
          "pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
        }
      />
    )
  }

  const NewButtonHandler = () => {
    navigate("/system-admins/new")
  }

  return (
    <Fragment>
      {loading ? (
        <LoaderComponent />
      ) : (
        <Card>
          <CardHeader className="bg-light d-flex justify-content-between align-items-center">
            <CardTitle tag="h4">System admins</CardTitle>
            <div>
              <Button
                color="info"
                onClick={NewButtonHandler}
                className="rounded-0 me-1"
                type="button"
              >
                New
              </Button>
              <Button
                onClick={() => {
                  exportToExcel(data?.data, "xyz")
                }}
                color="primary"
                className="rounded-0"
                type="button"
              >
                Export XLS
              </Button>
            </div>
          </CardHeader>
          {role !== 1 && (
            <Col className="bg-light" md="12" lg="12">
              <ButtonGroup>
                <Button
                  color="light"
                  className={`px-3 py-1 rounded-0 ${
                    rSelected === 1 && "border-0 bg-white"
                  } `}
                  onClick={() => setRSelected(1)}
                  active={rSelected === 1}
                >
                  Admin list
                </Button>
                <Button
                  color="light"
                  className={`px-3 py-1 rounded-0 ${
                    rSelected === 2 && "border-0 bg-white"
                  } `}
                  onClick={() => setRSelected(2)}
                  active={rSelected === 2}
                >
                  Admin types
                </Button>
              </ButtonGroup>
            </Col>
          )}
          <Row className="mx-0 mt-1 mb-50">
            <Col sm="6">
              <div className="d-flex align-items-center">
                <Label for="sort-select">show</Label>
                <Input
                  className="dataTable-select"
                  type="select"
                  id="sort-select"
                  value={rowsPerPage}
                  onChange={(e) => handlePerPage(e)}
                >
                  {/* <option value={5}>5</option> */}
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
              <Label className="me-1" for="search-input">
                Search
              </Label>
              <Input
                className="dataTable-filter"
                type="text"
                bsSize="sm"
                id="search-input"
                onKeyPress={handleKeyDown}
                value={searchValue}
                onChange={handleFilter}
              />
            </Col>
          </Row>
          <div className="react-dataTable">
            <DataTable
              noHeader
              pagination
              paginationServer
              className="react-dataTable"
              columns={systemAdminTypeColumns}
              sortIcon={<ChevronDown size={10} />}
              paginationComponent={CustomPagination}
              onSort={handleSort}
              sortServer
              data={systemadminData?.adminData}
            />
          </div>
        </Card>
      )}
    </Fragment>
  )
}

export default memo(SystemAdmintypeTable)
