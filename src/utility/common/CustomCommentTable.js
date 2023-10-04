import moment from 'moment'
import React from 'react'
import { useState } from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown, ChevronUp, Edit, Trash } from "react-feather"
import { Badge, Card, Col, Input, Row, Spinner } from 'reactstrap'
import "@styles/react/libs/tables/react-dataTable-component.scss"

// Image import
import Ittihadlogo from "../../../src/assets/images/logo/ittihad-logo.png"
import Israellogo from "../../../src/assets/images/logo/Israel-logo.png"
import CombineLogo from "../../../src/assets/images/logo/combinelogo2.png"
import CustomPagination from './CustomPagination'
import { Link, useNavigate } from 'react-router-dom'
import jsonData from "../../locales/en/translation.json"
import { useDispatch } from 'react-redux'
import { setRowPerPageComment, setRowPerPagePageComment } from '../../redux/commentSlice'
import { SetRowPerPage } from '../../redux/harmfulWordSlice'

const CustomCommentTable = ({ data, setSortDirection, setColumn, setSearchValue, searchValue, setRowsPerPage, rowsPerPage, setCurrentPage, currentPage, loading, checkPermission, tableFlag }) => {
  const [sort, setsort] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const serverSideColumns = [
    {
      name: "",
      width: "65px",
      allowOverflow: true,
      cell: (row) => {
        return (
          <div className="d-flex gap-1">
            <div onClick={() =>checkPermission && navigate(`/comments/edit/${row?._id}`)} className={!checkPermission ? "cursor-not-allowed" : "cursor-pointer"}>
              <Edit color="#e8b078" size={15} className="mr-1" />
            </div>
          </div>
        )
      },
    },
    {
      sortable: true,
      name: <div>{jsonData.tableColum.id}</div>,
      width: "75px",
      selector: (row) => row.row_id,
      sortField: "row_id",
    },
    {
      sortable: true,
      name: <div>{jsonData.tableColum.status}</div>,
      width: "max-content",
      selector: (row) => (
        <div className="capitalize-text">
         {row?.status == "approved" ? (
              <Badge color="success" className="text-capitalize">
              {jsonData.tableColum.approved}
              </Badge>
            ) : row?.status == "pending" ? (
              <Badge color="warning" className="text-capitalize">
              {jsonData.tableColum.pending}
              </Badge>
            ) : (
              <Badge color="danger">{jsonData.tableColum.notApproved}</Badge>
            )}
        </div>
      ),
      sortField: "status",
    },
    {
      sortable: true,
      name: <div>{jsonData.tableColum.origin_site}</div>,
      minWidth: "150px",
      selector: (row) => (
        <img
          className="img-fluid"
          src={ row?.site == "ittihad-today" ? Ittihadlogo :  Israellogo}
          alt="logo"
        />
      ),
      sortField: "site",
    },
    {
      sortable: true,
      name: <div>{jsonData.tableColum.user}</div>,
      width: "150px",
      selector: (row) => row.name ? <span className="text-capitalize">{row.name}</span> : "Anonymous User" ,
      sortField: "name",
    },
    {
      sortable: true,
      name: <div>{jsonData.tableColum.page_name}</div>,
      width: "140px",
      selector: (row) => row.pageData,
      sortField: "pageData",
    },
    {
      sortable: true,
      name: <div>{jsonData.tableColum.comment}</div>,
      width: "160px",
      selector: (row) => row.originalComment,
      sortField: "originalComment",
    },
    {
      sortable: true,
      name: <div>{jsonData.tableColum.submit_date}</div>,
      width: "150px",
      selector: (row) => moment(row?.createdAt).format("DD.MM.YYYY HH:mm"),
      sortField: "createdAt",
    },
    {
      sortable: true,
      name: <div >{jsonData.tableColum.approval_date}</div>,
      width: "160px",
      selector: (row) =>
        row?.approvalDate && row?.approvalDate != ""
          ? moment(row?.approvalDate).format("DD.MM.YYYY HH:mm")
          : "-",
      sortField: "approvalDate",
    },
    {
      sortable: true,
      name: <div>{jsonData.tableColum.approval_admin}</div>,
      width: "180px",
      selector: (row) => (
        <div> 
          <div >
            {row?.updatedByUser
              ? <span className="text-capitalize">{row?.updatedByUser?.firstname}{" "}{row?.updatedByUser?.lastname}</span>
              : row?.updatedByAdmin
                ? <span className="text-capitalize">{row?.updatedByAdmin?.firstname}{" "} {row?.updatedByAdmin?.lastname}</span> : "-"}
          </div>
        </div>),
      sortField: "updatedBy",
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
    // if (tableFlag == "comment") {
    //   dispatch(setRowPerPageComment(e.target.value))
    // } else if (tableFlag == "pageComment") {
    //   dispatch(setRowPerPagePageComment(e.target.value))
    // }
    dispatch(SetRowPerPage(parseInt(e.target.value)))
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
            data={data.allCommentsData}
          />
        </div>
      )}
    </Card>
  )
}

export default CustomCommentTable
