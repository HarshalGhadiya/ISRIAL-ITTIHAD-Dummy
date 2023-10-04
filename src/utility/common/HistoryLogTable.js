import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { Button, Col, Input, Row, Spinner } from "reactstrap";
import CustomPagination from "./CustomPagination";
import moment from "moment";
import { useState } from "react";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import jsonData from "../../locales/en/translation.json";
import { useDispatch, useSelector } from "react-redux";
import {
  setRowPerPageCommentHistory,
  setRowPerPagePageHistory,
} from "../../redux/historyLogSlice";
import { getDownloadadta } from "../../redux/exportdataExelslice";
import { SetRowPerPage } from "../../redux/harmfulWordSlice";
import { exportToExcel } from "./exportToExcel";
import { useNavigate } from "react-router-dom";

const HistoryLogTable = ({
  id,
  data,
  setCurrentPage,
  setRowsPerPage,
  setSearchValue,
  setColumn,
  setSortDirection,
  currentPage,
  rowsPerPage,
  searchValue,
  module,
  exelsheetname,
}) => {
  const [sort, setsort] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const loading = useSelector((state) => state?.root?.history?.loading);
  const loadingexportbutton = useSelector(
    (state) => state?.root?.dowloadexeledata?.loading
  );

  //histrory data colum
  const serverSideColumns = [
    {
      sortable: true,
      name: <div>{jsonData.tableColum.id}</div>,
      width: "80px",
      selector: (row) => row.row_id,
      sortField: "row_id",
    },
    {
      sortable: true,
      name: <div>{jsonData.tableColum.event}</div>,
      width: "100px",
      selector: (row) => row.method,
      sortField: "method",
    },
    {
      sortable: true,
      name: <div>{jsonData.tableColum.user}</div>,
      width: "180px",
      selector: (row) => (
        <div>
          {row?.updatedByUser ? (
            <span className="text-capitalize">
              {row?.updatedByUser?.firstname +
                " " +
                row?.updatedByUser?.lastname}
            </span>
          ) : (
            <span className="text-capitalize">
              {row?.updatedByAdmin?.firstname +
                " " +
                row?.updatedByAdmin?.lastname}
            </span>
          )}
        </div>
      ),
      sortField: "updatedBy",
    },
    {
      sortable: true,
      name: <div>{jsonData.tableColum.date}</div>,
      width: "150px",
      selector: (row) =>
        row?.updatedAt && row?.updatedAt != ""
          ? moment(row?.updatedAt).format("DD.MM.YYYY HH:mm")
          : jsonData.tableColum.NA,
      sortField: "updatedAt",
    },
    {
      sortable: true,
      name: <div>{jsonData.tableColum.data}</div>,
      minWidth: "150px",
      selector: (row) =>
        module == "comments" ? (
          <div style={{ whiteSpace: "normal" }}>
            <div>Updated data :</div>
            <div>
              {row?.data.status && "Status : "}
              <span className="text-capitalize">{row?.data.status}</span>
            </div>
            <div>
              {row?.data.updatedComment &&
                `Comment : ${row?.data.updatedComment}`}
            </div>
          </div>
        ) : (
          <div>
            <div>{row?.method == "create" ? row?.data : "Updated data : "}</div>
            <div>
              {row?.data.status && "Status : "}
              <span className="text-capitalize">{row?.data.status}</span>
            </div>
            <div>
              {row?.data.pageName && `Page name : ${row?.data.pageName}`}
            </div>
            <div>{row?.data.pageUrl && `Page URL : ${row?.data.pageUrl}`}</div>
          </div>
        ),
      sortField: "data",
    },
  ];

  // ** Function to handle filter
  const handleFilter = (e) => {
    setSearchValue(e.target.value);
    setTimeout(() => {
      setCurrentPage(1);
    }, 980);
  };

  // ** Function to handle per page
  const handlePerPage = (e) => {
    // if(module == "comments") {
    //     dispatch(setRowPerPageCommentHistory(e.target.value))
    // } else if (module == "pages") {
    //     dispatch(setRowPerPagePageHistory(e.target.value))
    // }
    dispatch(SetRowPerPage(parseInt(e.target.value)));
    setRowsPerPage(e.target.value);
    setCurrentPage(1);
  };

  // ** Function to handle sorting
  const TableSort = (column, sortDirection) => {
    setsort(!sort);
    setColumn(column.sortField);
    setSortDirection(sortDirection);
  };
  const exportdata = useSelector(
    (state) => state?.root?.dowloadexeledata?.downloadPageData
  );

  //History log for page
  const transformResponsepagehistorylogforPage = (apiItem) => {
    const keyValuePairs = [];

    //     Updated data:
    //     Status: Pending
    // Page name: ittihadqwew
    // Page URL: https://www.israelhayom.co.il/news/defense/articlewqewewq

    keyValuePairs.push(`${jsonData?.tableColum?.update_data} : `)
    if (apiItem.pageUrl) {
      keyValuePairs.push(`${jsonData?.tableColum?.page_url}: ${apiItem.pageUrl}`);
    }
    if (apiItem.status) {
      keyValuePairs.push(`${jsonData?.tableColum?.status} : ${apiItem.status}`);
    }
    if (apiItem.israelPage) {
      keyValuePairs.push(`${jsonData?.tableColum?.page_name}: ${apiItem.israelPage}`);
    }


    const keyValueString = keyValuePairs.join("\n");

    return {
      [jsonData.tableColum.id]: apiItem.row_id,
      [jsonData.tableColum.event]: apiItem?.method,
      [jsonData.tableColum.user]: apiItem.fullName,
      [jsonData.tableColum.date]: moment(apiItem.createdAt).format("DD.MM.YYYY HH:mm"),
      Data: keyValueString,
      // Add other array data here if needed
    };
  };



  //Comment Historylog
  const transformResponsepagehistorylog = (apiItem) => {
    const keyValuePairs = [];

    keyValuePairs.push(`${jsonData?.tableColum?.update_data} : `)
    if (apiItem.status) {
      keyValuePairs.push(`${jsonData?.tableColum?.status}: ${apiItem.status}`);
    }
    if (apiItem.comment) {
      keyValuePairs.push(`${jsonData?.tableColum?.comment}: ${apiItem.comment}`);
    }
    const keyValueString = keyValuePairs.join("\n");

    return {
      [jsonData.tableColum.id]: apiItem.row_id,
      [jsonData.tableColum.event]: apiItem?.method,
      [jsonData.tableColum.user]: apiItem.fullName,
      [jsonData.tableColum.date]: moment(apiItem.createdAt).format("DD.MM.YYYY HH:mm"),
      Data: keyValueString,
      // Add other array data here if needed
    };
  };



  return (
    <>
      <div className="px-2">
        <Row>
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">{jsonData.tableColum?.history_log}</h4>
            <Button
              onClick={() => {
                dispatch(getDownloadadta(exelsheetname, id, exportToExcel, module == "comments" ? jsonData.tableColum?.comment_history : jsonData?.tableColum?.page_histrory, module == "comments" ? transformResponsepagehistorylog : transformResponsepagehistorylogforPage, navigate));
              }}
              color="primary"
              className="rounded-0"
              type="button"
              disabled={loadingexportbutton}
            >
              {loadingexportbutton && (
                <Spinner
                  className="me-1 text-light spinner-border-sm"
                  size={10}
                />
              )}
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
        <div className="react-dataTable historylog-dataTable">
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
  );
};

export default HistoryLogTable;
