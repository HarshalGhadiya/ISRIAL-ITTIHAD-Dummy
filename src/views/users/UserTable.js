// ** React Imports
import { Fragment, useState, useEffect, memo } from "react";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";

// ** Store & Actions
// import { getData } from '../store'
import { useSelector, useDispatch } from "react-redux";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown, Edit, Edit3, Loader, Trash2 } from "react-feather";
import DataTable from "react-data-table-component";
import moment from "moment";
import jsonData from "../../locales/en/translation.json";
// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Input,
  Button,
  Label,
  ButtonGroup,
  CardText,
  Badge,
  Spinner,
} from "reactstrap";

import { useDebouncedValue } from "../../utility/common/useDebouncedValue";
import { handleKeyDown } from "../../utility/common/InputValidation";
import { exportToExcel } from "../../utility/common/exportToExcel";
import { useNavigate } from "react-router-dom";
import LoaderComponent from "../../utility/common/LoaderComponent";
import { userList } from "../../redux/userSlice";
import Ittihadlogo from "../../../src/assets/images/logo/ittihad-logo.png";
import Israellogo from "../../../src/assets/images/logo/Israel-logo.png";
import CombineLogo from "../../../src/assets/images/logo/combinelogo2.png";
import { getDownloadadta } from "../../redux/exportdataExelslice";
import { SetRowPerPage } from "../../redux/harmfulWordSlice";

const UserTable = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state?.root?.users?.loading);
  const loadingexportbutton = useSelector(
    (state) => state?.root?.dowloadexeledata?.loading
  );
  const users = useSelector((state) => state?.root?.users?.UserListData);
  console.log('users',users);
  // const rowperpage = useSelector((state) => state?.root?.users?.rowsPerPage);
  const rowperpage = useSelector(
    (state) => state?.root?.harmfulWord?.rowsPerPage
  );
  const exportdata = useSelector(
    (state) => state?.root?.dowloadexeledata?.downloadPageData
  );
  console.log("rowper page", rowperpage);
  // ** States
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowperpage);
  const [searchValue, setSearchValue] = useState("");
  const [sortColumn, setSortColumn] = useState("row_id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [sort, setsort] = useState(true);

  const debouncedValue = useDebouncedValue(searchValue, 1000);
  const PermissionArray =
    localStorage.getItem("userData") &&
    JSON.parse(localStorage.getItem("userData"))?.permissions;

  // Find permissions for "systemAdmins"
  const UsersPermissions = PermissionArray.find(
    (item) => item.section === "users"
  );
  // Extract the read and write permissions directly
  const UsersPagewritePermission = UsersPermissions?.permissions.write || false;
  const readPermission = UsersPermissions?.permissions.read || false;
  const combindpermisttion = UsersPagewritePermission && readPermission;
  console.log("permission", readPermission);
  //useEffect API call
  useEffect(() => {
    const pages = searchValue !== "" ? 1 : currentPage;
    //fetchData(pages, rowsPerPage, debouncedValue);
    dispatch(
      userList(pages, rowsPerPage, searchValue, sortColumn, sortDirection)
    );
  }, [debouncedValue, currentPage, rowsPerPage, sortColumn, sortDirection]);

  const transformResponse = (apiItem) => {
    return {
      [jsonData?.user?.user_list?.id]: apiItem.row_id, 
      [jsonData?.user?.user_list?.status]:apiItem?.status,
      [jsonData?.user?.user_list?.name]:apiItem.name,
      [jsonData?.user?.user_list?.site]:apiItem.site,
      [jsonData?.user?.user_list?.comment]: apiItem.totalComments,
      [jsonData?.user?.user_list?.lastseen]: moment(apiItem.lastSeen).format("DD.MM.YYYY HH:mm"),
      [jsonData?.user?.user_list?.registration]: moment(apiItem?.updatedAt).format("DD.MM.YYYY HH:mm"),
      [jsonData?.user?.user_list?.email]:apiItem.email,
      [jsonData?.user?.user_list?.device]:apiItem.device,
    };
  }
  // const transformedData = exportdata.map(transformResponse)

  // ** Table Server Side Column
  const serverSideColumns = [
    {
      // sortable: true,
      // name: 'id',
      width: "80px",
      selector: (row) => (
        <div>
          {" "}
          <Edit
            color="#e8b078"
            size={15}
            className="mr-1"
            style={{
              cursor: readPermission ? "pointer" : "not-allowed",
            }}
            onClick={() => {
              if (readPermission) {
                navigate(`/users/edit-users/${row?._id}`);
              }
            }}
          />
        </div>
      ),
      // sortField: "row_id"
    },
    {
      sortable: true,
      name: (
        <div className="text-capitalize">{jsonData?.user?.user_list?.id}</div>
      ),
      width: "80px",
      selector: (row) => row?.row_id,
      sortField: "row_id",
    },
    {
      sortable: true,
      name: (
        <div className="text-capitalize">
          {jsonData?.user?.user_list?.status}
        </div>
      ),
      width: "150px",
      selector: (row) => (
        <div className="capitalize-text">
          {row?.status == "active" ? (
            <Badge color="success" className="text-capitalize">
              {row?.status}
            </Badge>
          ) : (
            <Badge color="danger" className="text-capitalize">
              {row?.status}
            </Badge>
          )}
        </div>
      ),
      sortField: "status",
    },
    {
      sortable: true,
      name: (
        <div className="text-capitalize">{jsonData?.user?.user_list?.name}</div>
      ),
      width: "110px",
      selector: (row) => (
        <div className="text-capitalize">{row?.name}</div>
      ),
      sortField: "name",
    },
    {
      sortable: true,
      name: (
        <div className="text-capitalize">{jsonData?.user?.user_list?.site}</div>
      ),
      width: "200px",
      selector: (row) => (
        <img
          className="img-fluid"
          src={
            row?.site=='israel-today'?Israellogo : Ittihadlogo
          }
          alt="logo"
        />
      ),

      sortField: "site",
    },
    {
      sortable: true,
      name: (
        <div className="text-capitalize">
          {jsonData?.user?.user_list?.comment}
        </div>
      ),
      width: "150px",
      selector: (row) => row.totalComments, // row?.comment,
      sortField: "totalComments",
    },
    {
      sortable: true,
      name: (
        <div className="text-capitalize">
          {jsonData?.user?.user_list?.lastseen}
        </div>
      ),
      width: "200px",
      selector: (row) => (
        <div>
          {row?.lastSeen && row?.lastSeen != ""
            ? moment(row?.lastSeen).format("DD.MM.YYYY HH:mm")
            : "-"}
        </div>
      ),
      sortField: "lastSeen",
    },
    {
      sortable: true,
      name: (
        <div className="text-capitalize">
          {jsonData?.user?.user_list?.registration}
        </div>
      ),
      width: "250px",
      selector: (row) => moment(row?.createdAt).format("DD.MM.YYYY HH:mm"),
      sortField: "createdAt",
    },
    {
      sortable: true,
      name: (
        <div className="text-capitalize">
          {jsonData?.user?.user_list?.email}
        </div>
      ),
      width: "250px",
      selector: (row) => row?.email,
      sortField: "email",
    },
    {
      sortable: true,
      name: (
        <div className="text-capitalize">
          {jsonData?.user?.user_list?.device}
        </div>
      ),
      width: "200px",
      selector: (row) => (
        <div className="text-capitalize">{row?.device && row?.device != "" ? row?.device : "-"}</div>
      ),
      sortField: "device",
    },
  ];

  // ** Function to handle filter
  const handleFilter = (e) => {
    setSearchValue(e.target.value);
    setTimeout(() => {
      setCurrentPage(1);
    }, 980);
  };

  // ** Function to handle Pagination and get data
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  // ** Function to handle per page
  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
    dispatch(SetRowPerPage(parseInt(e.target.value)));
  };

  // ** Function for sorting data
  const handleSort = (column, sortDirection) => {
    setsort(!sort);
    setSortDirection(sortDirection);
    setSortColumn(column?.sortField);
    // console.log(column, sortDirection,'sortDirection')
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = 10;
    //  Math.ceil(store.total / rowsPerPage)

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel="..."
        pageCount={Math.ceil(users?.totalPage) || 1}
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
    );
  };

  const NewButtonHandler = () => {
    navigate("/system-admins/new");
  };
  const usersite = localStorage.getItem("usersite");
  return (
    <Fragment>
      <head>
        <title>
          Users - {usersite == "israelBackOffice" ? "Israel " : "Ittihad"}Today
          back office
        </title>
      </head>
      <CardHeader className="mb-1">
        <Row>
          <Col
            className="d-flex align-items-center justify-content-sm-start mt-sm-0 mt-1"
            sm="8"
          >
            <CardTitle tag="h4">{jsonData?.user?.title}</CardTitle>
          </Col>
          <Col
            className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
            sm="4"
          >
            <Button
              //onClick={downloadfile}
              onClick={()=>{
                dispatch(getDownloadadta("user", "", exportToExcel, jsonData?.user?.title, transformResponse, navigate))
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
              {jsonData?.export}
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <Card>
        <Row className="mx-0 mt-1 mb-50">
          <Col sm="6">
            <div className="d-flex align-items-center">
              <Label for="sort-select">{jsonData?.user?.show}</Label>
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
              {jsonData?.user?.search}
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
              className="react-dataTable"
              columns={serverSideColumns}
              sortIcon={<ChevronDown size={10} />}
              paginationComponent={CustomPagination}
              onSort={handleSort}
              defaultSortAsc={sort}
              sortServer
              data={users?.users}
            />
          </div>
        )}
      </Card>
    </Fragment>
  );
};

export default UserTable;
