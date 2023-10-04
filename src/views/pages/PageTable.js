// ** React Imports
import { Fragment, useState, useEffect, memo } from "react";
import "@styles/react/libs/tables/react-dataTable-component.scss";

import { useSelector, useDispatch } from "react-redux";

// ** Third Party Components
import { ChevronDown, ChevronUp, Edit, Trash } from "react-feather";
import DataTable from "react-data-table-component";
import { exportToExcel } from "../../utility/common/exportToExcel";

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
} from "reactstrap";
import CustomPagination from "../../utility/common/CustomPagination";
import { useNavigate } from "react-router";
import { useDebouncedValue } from "../../utility/common/useDebouncedValue";
import { Link } from "react-router-dom";
import store from "../../redux/store";
import LoaderComponent from "../../utility/common/LoaderComponent";
import moment from "moment";
import { getPage, setRowPerPagePage } from "../../redux/pageSlice";
import jsonData from "../../locales/en/translation.json";
import { getDownloadadta } from "../../redux/exportdataExelslice";
import { SetRowPerPage } from "../../redux/harmfulWordSlice";

const PageTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // ** States
  // const rowperpage = useSelector((state) => state?.root?.page?.rowsPerPagePage)
  const rowperpage = useSelector(
    (state) => state?.root?.harmfulWord?.rowsPerPage
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowperpage);
  const [searchValue, setSearchValue] = useState("");
  const [column, setColumn] = useState("row_id");
  const [sortDirection, setSortDirection] = useState("desc");
  const [sort, setsort] = useState(true);
  const [admin, setAdmin] = useState("");
  const loadingexportbutton = useSelector(
    (state) => state?.root?.dowloadexeledata?.loading
  );
  const data = useSelector((state) => state?.root?.page?.pageData);
  const loading = useSelector((state) => state?.root?.page?.loading);
  const debouncedQuery = useDebouncedValue(searchValue, 1000);
  //for permition
  const usersite = localStorage.getItem("usersite");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const permissionArr = userData?.permissions?.filter(
    (section) => section?.section == "pages"
  );
  const exportdata = useSelector(
    (state) => state?.root?.dowloadexeledata?.downloadPageData
  );
  const checkPermission =
    permissionArr[0]?.permissions?.write && permissionArr[0]?.permissions?.read;

  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getPage(
        navigate,
        currentPage,
        rowsPerPage,
        searchValue,
        sortDirection,
        column
      )
    );
  }, [dispatch, debouncedQuery, rowsPerPage, currentPage, sortDirection]);

  //set admin name
  useEffect(() => {
    if (usersite === "israelBackOffice") {
      if (data?.israelUpdatedByAdmin) {
        setAdmin(
          data?.israelUpdatedByAdmin?.firstname ??
          "" + " " + data?.israelUpdatedByAdmin?.lastname ??
          ""
        );
      } else if (data?.israelUpdatedByUser) {
        setAdmin(
          data?.israelUpdatedByUser?.firstname ??
          "" + " " + data?.israelUpdatedByUser?.lastname ??
          ""
        );
      }
    } else if (usersite === "ittihadBackOffice") {
      if (data?.ittihadUpdatedByAdmin) {
        setAdmin(
          data?.ittihadUpdatedByAdmin?.firstname ??
          "" + " " + data?.ittihadUpdatedByAdmin?.lastname ??
          ""
        );
      } else if (data?.ittihadUpdatedByUser) {
        setAdmin(
          data?.ittihadUpdatedByUser?.firstname ??
          "" + " " + data?.ittihadUpdatedByUser?.lastname ??
          ""
        );
      }
    }
  }, [data]);

  //column
  const serverSideColumns = [
    {
      name: "",
      width: "65px",
      allowOverflow: true,
      cell: (row) => {
        return (
          <div className="d-flex gap-1">
            <div
              onClick={() =>
                checkPermission && navigate(`/pages/edit/${row?._id}`)
              }
              className={
                !checkPermission ? "cursor-not-allowed" : "cursor-pointer"
              }
            >
              <Edit color="#e8b078" size={15} className="mr-1" />
            </div>
          </div>
        );
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
      name: (
        <div>
          {usersite == "israelBackOffice"
            ? jsonData.tableColum.israelStatus
            : jsonData.tableColum.ittihadStatus}
        </div>
      ),
      width: "160px",
      selector: (row) => (
        <div>
          {usersite == "israelBackOffice" ? (
            row?.israelStatus == "active" ? (
              <Badge color="success" className="text-capitalize">
                {jsonData.tableColum.active}
              </Badge>
            ) : row?.israelStatus == "notApproved" ? (
              <Badge color="danger">{jsonData.tableColum.notApproved}</Badge>
            ) : (
              <Badge color="warning" className="text-capitalize">
                {jsonData.tableColum.pending}
              </Badge>
            )
          ) : row?.ittihadStatus == "active" ? (
            <Badge color="success" className="text-capitalize">
              {jsonData.tableColum.active}
            </Badge>
          ) : row?.ittihadStatus == "notApproved" ? (
            <Badge color="danger">{jsonData.tableColum.notApproved}</Badge>
          ) : (
            <Badge color="warning" className="text-capitalize">
              {jsonData.tableColum.pending}
            </Badge>
          )}
        </div>
      ),
      sortField:
        usersite == "israelBackOffice" ? "israelStatus" : "ittihadStatus",
    },
    {
      sortable: true,
      name: (
        <div>
          {usersite == "israelBackOffice"
            ? jsonData.tableColum.israelPage
            : jsonData.tableColum.ittihadPage}
        </div>
      ),
      width: "150px",
      selector: (row) =>
        usersite == "israelBackOffice"
          ? row.israelPage
            ? row.israelPage
            : "-"
          : row.ittihadPage
            ? row.ittihadPage
            : "-",
      sortField: usersite == "israelBackOffice" ? "israelPage" : "ittihadPage",
    },
    {
      sortable: true,
      name: (
        <div>
          {usersite == "israelBackOffice"
            ? jsonData.tableColum.israelComment
            : jsonData.tableColum.ittihadComment}
        </div>
      ),
      width: "185px",
      selector: (row) =>
        usersite == "israelBackOffice"
          ? row.israelCommentCount
            ? row.israelCommentCount
            : "-"
          : row.ittihadCommentCount
            ? row.ittihadCommentCount
            : "-",
      sortField:
        usersite == "israelBackOffice"
          ? "israelCommentCount"
          : "ittihadCommentCount",
    },
    {
      sortable: true,
      name: (
        <div>
          {usersite == "israelBackOffice"
            ? jsonData.tableColum.israelPdate
            : jsonData.tableColum.ittihadPdate}
        </div>
      ),
      width: "200px",
      selector: (row) => (
        <div>
          <div>
            {usersite == "israelBackOffice"
              ? row?.israelPublishDate
                ? moment(row?.israelPublishDate).format("DD.MM.YYYY HH:mm")
                : "-"
              : row?.ittihadPublishDate
                ? moment(row?.ittihadPublishDate).format("DD.MM.YYYY HH:mm")
                : "-"}
          </div>
          <div className="text-capitalize">
            {usersite === "israelBackOffice"
              ? row?.israelUpdatedByAdmin
                ? `${row.israelUpdatedByAdmin?.firstname ?? ""} ${row.israelUpdatedByAdmin?.lastname ?? ""
                }`
                : row?.israelUpdatedByUser
                  ? `${row.israelUpdatedByUser?.firstname ?? ""} ${row.israelUpdatedByUser?.lastname ?? ""
                  }`
                  : ""
              : usersite === "ittihadBackOffice"
                ? row?.ittihadUpdatedByAdmin
                  ? `${row.ittihadUpdatedByAdmin?.firstname ?? ""} ${row.ittihadUpdatedByAdmin?.lastname ?? ""
                  }`
                  : row?.ittihadUpdatedByUser
                    ? `${row.ittihadUpdatedByUser?.firstname ?? ""} ${row.ittihadUpdatedByUser?.lastname ?? ""
                    }`
                    : ""
                : ""}
          </div>
        </div>
      ),
      sortField:
        usersite == "israelBackOffice"
          ? "israelPublishDate"
          : "ittihadPublishDate",
    },
    {
      sortable: true,
      name: (
        <div>
          {usersite == "israelBackOffice"
            ? jsonData.tableColum.ittihadStatus
            : jsonData.tableColum.israelStatus}
        </div>
      ),
      width: "160px",
      selector: (row) => (
        <div>
          {usersite == "israelBackOffice" ? (
            row?.ittihadStatus == "active" ? (
              <Badge color="success" className="text-capitalize">
                {jsonData.tableColum.active}
              </Badge>
            ) : row?.ittihadStatus == "notApproved" ? (
              <Badge color="danger">{jsonData.tableColum.notApproved}</Badge>
            ) : (
              <Badge color="warning" className="text-capitalize">
                {jsonData.tableColum.pending}
              </Badge>
            )
          ) : row?.israelStatus == "active" ? (
            <Badge color="success" className="text-capitalize">
              {jsonData.tableColum.active}
            </Badge>
          ) : row?.israelStatus == "notApproved" ? (
            <Badge color="danger">{jsonData.tableColum.notApproved}</Badge>
          ) : (
            <Badge color="warning" className="text-capitalize">
              {jsonData.tableColum.pending}
            </Badge>
          )}
        </div>
      ),
      sortField:
        usersite == "israelBackOffice" ? "ittihadStatus" : "israelStatus",
    },
    {
      sortable: true,
      name: (
        <div>
          {usersite == "israelBackOffice"
            ? jsonData.tableColum.ittihadPage
            : jsonData.tableColum.israelPage}
        </div>
      ),
      width: "150px",
      selector: (row) =>
        usersite == "israelBackOffice"
          ? row.ittihadPage
            ? row.ittihadPage
            : "-"
          : row.israelPage
            ? row.israelPage
            : "-",
      sortField: usersite == "israelBackOffice" ? "ittihadPage" : "israelPage",
    },
    {
      sortable: true,
      name: (
        <div>
          {usersite == "israelBackOffice"
            ? jsonData.tableColum.ittihadComment
            : jsonData.tableColum.israelComment}
        </div>
      ),
      width: "185px",
      selector: (row) =>
        usersite == "israelBackOffice"
          ? row.ittihadCommentCount
            ? row.ittihadCommentCount
            : "-"
          : row.israelCommentCount
            ? row.israelCommentCount
            : "-",
      sortField:
        usersite == "israelBackOffice"
          ? "ittihadCommentCount"
          : "israelCommentCount",
    },
    {
      sortable: true,
      name: (
        <div>
          {usersite == "israelBackOffice"
            ? jsonData.tableColum.ittihadPdate
            : jsonData.tableColum.israelPdate}
        </div>
      ),
      width: "200px",
      selector: (row) => (
        <div>
          <div>
            {usersite == "israelBackOffice"
              ? row?.ittihadPublishDate
                ? moment(row?.ittihadPublishDate).format("DD.MM.YYYY HH:mm")
                : "-"
              : row?.israelPublishDate
                ? moment(row?.israelPublishDate).format("DD.MM.YYYY HH:mm")
                : "-"}
          </div>
          <div className="text-capitalize">
            {usersite === "ittihadBackOffice"
              ? row?.israelUpdatedByAdmin
                ? `${row.israelUpdatedByAdmin?.firstname ?? ""} ${row.israelUpdatedByAdmin?.lastname ?? ""
                }`
                : row?.israelUpdatedByUser
                  ? `${row.israelUpdatedByUser?.firstname ?? ""} ${row.israelUpdatedByUser?.lastname ?? ""
                  }`
                  : ""
              : usersite === "israelBackOffice"
                ? row?.ittihadUpdatedByAdmin
                  ? `${row.ittihadUpdatedByAdmin?.firstname ?? ""} ${row.ittihadUpdatedByAdmin?.lastname ?? ""
                  }`
                  : row?.ittihadUpdatedByUser
                    ? `${row.ittihadUpdatedByUser?.firstname ?? ""} ${row.ittihadUpdatedByUser?.lastname ?? ""
                    }`
                    : ""
                : ""}
          </div>
        </div>
      ),
      sortField:
        usersite == "israelBackOffice"
          ? "ittihadPublishDate"
          : "israelPublishDate",
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
    // dispatch(setRowPerPagePage(e.target.value))
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

  const transformResponse = (apiItem) => {
    return {
      [jsonData.tableColum.id]: apiItem.row_id,
      [usersite == "israelBackOffice"
        ? jsonData.tableColum.israelStatus
        : jsonData.tableColum.ittihadStatus]: apiItem.israelStatus,
      [usersite == "israelBackOffice"
        ? jsonData.tableColum.israelPage
        : jsonData.tableColum.ittihadPage]: apiItem.israelPage,
      [usersite == "israelBackOffice"
        ? jsonData.tableColum.israelComment
        : jsonData.tableColum.ittihadComment]: apiItem.israelCommentCount,
      [usersite == "israelBackOffice"
        ? jsonData.tableColum.israelPdate
        : jsonData.tableColum.ittihadPdate]: moment(apiItem.israelPublishDate).format("DD.MM.YYYY HH:mm") ,
      [usersite == "israelBackOffice"
        ? jsonData.tableColum.israelPdate_Updateby
        : jsonData.tableColum.ittihadPdate_Updateby]: apiItem.IsrealfullName,
      [usersite == "israelBackOffice"
        ? jsonData.tableColum.ittihadStatus
        : jsonData.tableColum.israelStatus]: apiItem.ittihadStatus,
      [usersite == "israelBackOffice"
        ? jsonData.tableColum.ittihadPage
        : jsonData.tableColum.israelPage]: apiItem.ittihadPage,
      [usersite == "israelBackOffice"
        ? jsonData.tableColum.ittihadComment
        : jsonData.tableColum.israelComment]: apiItem.ittihadCommentCount,
      [usersite == "israelBackOffice"
        ? jsonData.tableColum.ittihadPdate
        : jsonData.tableColum.israelPdate]: moment(apiItem.ittihadPublishDate).format("DD.MM.YYYY HH:mm") ,
      [usersite == "israelBackOffice"
        ? jsonData.tableColum.ittihadPdate_Updateby
        : jsonData.tableColum.israelPdate_Updateby]: apiItem.ittihadfullName,
    };
  };
  // const transformedData = exportdata.map(transformResponse);

  return (
    <Fragment>
      <head>
        <title>
          {jsonData.title.page} -{" "}
          {usersite == "israelBackOffice"
            ? jsonData.sitename.israel
            : jsonData.sitename.ittihad}
        </title>
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
                  onClick={() => navigate("/pages/add")}
                  disabled={!checkPermission}
                >
                  {jsonData.new}
                </Button>
                <Button
                  onClick={() => {
                    dispatch(getDownloadadta("page", "", exportToExcel, jsonData.title.page, transformResponse, navigate))
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
                    />)}
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
                  data={data.pageData}
                // data={data}
                />
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default PageTable;
