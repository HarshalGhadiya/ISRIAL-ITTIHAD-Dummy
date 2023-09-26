import React from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import { Button, Col, Input, Row, Spinner } from 'reactstrap'
import CustomPagination from './CustomPagination'
import moment from "moment"
import { useState } from 'react'
import "@styles/react/libs/tables/react-dataTable-component.scss";
import jsonData from "../../locales/en/translation.json"
import { useDispatch, useSelector } from 'react-redux'
import { setRowPerPageCommentHistory, setRowPerPagePageHistory } from '../../redux/historyLogSlice'

const HistoryLogTable = ({ data, setCurrentPage, setRowsPerPage, setSearchValue, setColumn, setSortDirection, currentPage, rowsPerPage, searchValue, module }) => {
    const [sort, setsort] = useState(true)
    const dispatch =useDispatch()
    const loading = useSelector(
        (state) => state?.root?.history?.loading
    );

    //histrory data colum
    const serverSideColumns = [
        {
            sortable: true,
            name: <div>{jsonData.tableColum.id}</div>,
            maxWidth: '50px',
            selector: row => row.row_id,
            sortField: "row_id",
        },
        {
            sortable: true,
            name: <div>{jsonData.tableColum.event}</div>,
            maxWidth: '100px',
            selector: row => row.method,
            sortField: "method",
        },
        {
            sortable: true,
            name: <div>{jsonData.tableColum.user}</div>,
            minWidth: '100px',
            selector: row => (<div >
                {row?.updatedByUser
                    ? row?.updatedByUser?.firstname.charAt(0).toUpperCase() + row?.updatedByUser?.firstname.slice(1) + " " + row?.updatedByUser?.lastname
                    : row?.updatedByAdmin?.firstname.charAt(0).toUpperCase() + row?.updatedByAdmin?.firstname.slice(1) + " " + row?.updatedByAdmin?.lastname}
            </div>),
            sortField: "updatedBy",
        },
        {
            sortable: true,
            name: <div>{jsonData.tableColum.date}</div>,
            minWidth: '150px',
            selector: row => row?.updatedAt && row?.updatedAt != ""
                ? moment(row?.updatedAt).format("DD.MM.YYYY HH:mm")
                : jsonData.tableColum.NA,
            sortField: "updatedAt",
        },
        {
            sortable: true,
            name: <div>{jsonData.tableColum.data}</div>,
            minWidth: '150px',
            selector: row =>  (
                <div>
                  <div>
                    Updated data :
                  </div>
                  <div >
                   {row?.data.status && 'Status : '}<span className='text-capitalize'>{row?.data.status}</span>
                  </div>
                  <div >
                  {row?.data.updatedComment && `Comment : ${row?.data.updatedComment}`}
                  </div>
                </div>
              ),
            sortField: "data",
        }
    ]

    // ** Function to handle filter
    const handleFilter = (e) => {
        setSearchValue(e.target.value);
        setTimeout(() => {
            setCurrentPage(1);
        }, 980);
    };

    // ** Function to handle per page
    const handlePerPage = (e) => {
        if(module == "comments") {
            dispatch(setRowPerPageCommentHistory(e.target.value))
        } else if (module == "pages") {
            dispatch(setRowPerPagePageHistory(e.target.value))
        }
        setRowsPerPage(e.target.value);
        setCurrentPage(1)
    };

    // ** Function to handle sorting
    const TableSort = (column, sortDirection) => {
        setsort(!sort)
        setColumn(column.sortField);
        setSortDirection(sortDirection);
    };
    return (
        <>
            <div className='px-2'>
                <Row>
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="mb-0">{jsonData.history_log}</h4>
                        <Button
                            onClick={() => {
                                exportToExcel(data, "xyz");
                            }}
                            color="primary"
                            className="rounded-0"
                            type="button"
                        >
                            {jsonData.export}
                        </Button>
                    </div>
                </Row>
                <hr />
            </div>
            <Row className="mx-0 mb-50">
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
                    defaultSortAsc={sort}
                    sortIcon={<ChevronDown size={10} />}
                    paginationComponent={() =>
                        CustomPagination({
                            data,
                            rowsPerPage,
                            currentPage,
                            setCurrentPage,
                        })
                    }
                    data={data.data}
                />
            </div>
            )}
        </>
    )
}

export default HistoryLogTable
