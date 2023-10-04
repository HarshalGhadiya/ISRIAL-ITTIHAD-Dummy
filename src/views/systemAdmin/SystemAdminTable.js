// ** React Imports
import { Fragment, useState, useEffect } from "react";

// Image import
import Ittihadlogo from "../../../src/assets/images/logo/ittihad-logo.png";
import Israellogo from "../../../src/assets/images/logo/Israel-logo.png";
import CombineLogo from "../../../src/assets/images/logo/combinelogo2.png";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import isString from "lodash/isString";

// ** Store & Actions
// import { getData } from '../store'
import { useSelector, useDispatch } from "react-redux";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Edit3,
  Loader,
  Trash,
  Trash2,
} from "react-feather";
import DataTable from "react-data-table-component";
import moment from "moment";
import Swal from "sweetalert2";

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
  Badge,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Spinner,
} from "reactstrap";

import { useDebouncedValue } from "../../utility/common/useDebouncedValue";
import { handleKeyDown } from "../../utility/common/InputValidation";
import { exportToExcel } from "../../utility/common/exportToExcel";
import {
  // SetRowPerPage,
  SystemAdmindeleteapiCall,
  SystemAdminlistapiCall,
  updateTab,
} from "../../redux/systemAdminSlice";
import { Link, useNavigate } from "react-router-dom";

import {
  DeleteAdminRoleType,
  GetAdminRoleTypes,
} from "../../redux/adminRoleTypeSlice";
import jsonData from "../../locales/en/translation.json";
import { getDownloadadta } from "../../redux/exportdataExelslice";
import { SetRowPerPage } from "../../redux/harmfulWordSlice";

const SystemAdminTable = () => {
  const userSite = localStorage.getItem("usersite");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProgileData = useSelector(
    (state) => state?.root?.auth?.tokendata?.data?.data
  );

  //Store Selection
  const loading = useSelector((state) => state?.root?.systemadmin?.loading);
  const LoadindRoltype = useSelector(
    (state) => state?.root?.adminRoleType?.loading
  );
  const systemadminData = useSelector(
    (state) => state?.root?.systemadmin?.systemadminData
  );
  console.log(userProgileData, "systemadminData");
  // const rowsPerPages = useSelector(
  //   (state) => state?.root?.systemadmin?.rowsPerPage
  // )
  const rowperpage = useSelector(
    (state) => state?.root?.harmfulWord?.rowsPerPage
  );
  const systemadminTypeData = useSelector(
    (state) => state?.root?.adminRoleType?.adminRoleTypes
  );
  const token = useSelector(
    (state) => state?.root?.auth?.tokendata?.data?.token
  );
  const exportdata = useSelector(
    (state) => state?.root?.dowloadexeledata?.downloadPageData
  );

  const PermissionArray =
    localStorage.getItem("userData") &&
    JSON.parse(localStorage.getItem("userData"))?.permissions;

  // Find permissions for "systemAdmins"
  const systemAdminsPermissions = PermissionArray.find(
    (item) => item.section === "systemAdmins"
  );

  // Extract the read and write permissions directly
  const readPermission = systemAdminsPermissions?.permissions.read || false;
  const writePermission = systemAdminsPermissions?.permissions.write || false;

  const CombinePermission = readPermission && writePermission;

  // ** States
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowperpage);
  const [searchValue, setSearchValue] = useState("");
  const [sortColumn, setSortColumn] = useState("row_id");
  const [sortDirection, setSortDirection] = useState("desc");
  const [sort, setsort] = useState(true);

  // const [rSelected, setRSelected] = useState(1)
  const rSelected = useSelector(
    (state) => state?.root?.systemadmin?.SelectedTab
  );
  const loadingexportbutton = useSelector(
    (state) => state?.root?.dowloadexeledata?.loading
  );
  const debouncedValue = useDebouncedValue(searchValue, 1000);


  //useEffect API call
  useEffect(() => {
    // const pages = searchValue !== "" ? 1 : currentPage
    if (rSelected === 1) {
      dispatch(
        SystemAdminlistapiCall(
          currentPage,
          rowsPerPage,
          searchValue.trim(),
          sortColumn,
          sortDirection,
          navigate,
          token
        )
      );
    } else {
      dispatch(
        GetAdminRoleTypes(
          currentPage,
          rowsPerPage,
          searchValue.trim(),
          sortColumn,
          sortDirection
        )
      );
    }
  }, [
    debouncedValue,
    currentPage,
    rowsPerPage,
    sortColumn,
    sortDirection,
    rSelected,
  ]);

  //System Admin list coloumn
  const serverSideColumns = [
    {
      // sortable: true,
      // name: 'id',
      width: "85px",
      selector: (row) => (
        <>
          {userProgileData?.email === row?.email ? null : (
            <div className={`d-flex gap-1`}>
              <div
                onClick={() => navigate(`/system-admins/${row?._id}`)}
                className={
                  !CombinePermission ? "cursor-not-allowed" : "cursor-pointer"
                }
              >
                <Edit color="#e8b078" size={15} className="mr-1" />
              </div>
              {!row?.is_deleted && (
                <div
                  className={
                    !CombinePermission ? "cursor-not-allowed" : "cursor-pointer"
                  }
                >
                  <span onClick={() => handleWarning(row)}>
                    <Trash color="#ea5556" size={15} />
                  </span>
                </div>
              )}
            </div>
          )}
        </>
      ),
      // sortField: "row_id"
    },
    {
      sortable: true,
      name: (
        <div className="text-capitalize">
          {jsonData?.system_admin?.table?.header?.id}
        </div>
      ),
      width: "80px",
      selector: (row) => (
        <div className="text-capitalize">
          {row?.row_id && row?.row_id != "" ? row?.row_id : "-"}
        </div>
      ),
      sortField: "row_id",
    },
    {
      sortable: true,
      name: (
        <div className="text-capitalize">
          {jsonData?.system_admin?.table?.header?.status}
        </div>
      ),
      width: "125px",
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
        <div className="text-capitalize">
          {jsonData?.system_admin?.table?.header?.site}
        </div>
      ),
      minWidth: "200px",
      selector: (row) =>
        row?.site == "systemBackOffice" ? (
          "System admin"
        ) : (
          <img
            className="img-fluid"
            src={row?.site == "ittihadBackOffice" ? Ittihadlogo : Israellogo}
            alt="logo"
          />
        ),
      sortField: "site",
    },
    {
      sortable: true,
      name: jsonData?.system_admin?.table?.header?.fullname,
      minWidth: "150px",
      selector: (row) => (
        <div className="text-capitalize">
          {row?.firstname && row?.firstname != ""
            ? row?.firstname + " " + row?.lastname
            : "-"}
          {/* <span className="text-capitalize">{row?.updatedBy?.firstname}</span> <span>{row?.updatedBy?.lastname}</span> */}
        </div>
      ),
      sortField: "firstname",
    },
    {
      sortable: true,
      name: jsonData?.system_admin?.table?.header?.user_type,
      minWidth: "150px",
      selector: (row) => (
        <div>
          {row?.userRole?.role && row?.userRole?.role != ""
            ? row?.userRole?.role
            : "-"}
        </div>
      ),
      sortField: "role",
    },
    {
      sortable: true,
      name: <div>{jsonData?.system_admin?.table?.header?.email}</div>,
      minWidth: "250px",
      selector: (row) => (row?.email && row?.email != "" ? row?.email : "-"),
      sortField: "email",
    },
    {
      sortable: true,
      name: (
        <div className="text-capitalize">
          {jsonData?.system_admin?.table?.header?.phone}
        </div>
      ),
      minWidth: "150px",
      selector: (row) => (row?.phone && row?.phone != "" ? row?.phone : "-"),
      sortField: "phone",
    },
    {
      sortable: true,
      name: <div>{jsonData?.system_admin?.table?.header?.last_seen}</div>,
      minWidth: "150px",
      selector: (row) =>
        row?.lastSeen ? moment(row?.lastSeen).format("DD.MM.YYYY HH:mm") : "-",
      sortField: "lastSeen",
    },
    {
      sortable: true,
      name: (
        <div className="text-capitalize">
          {jsonData?.system_admin?.table?.header?.update}
        </div>
      ),
      minWidth: "150px",
      selector: (row) => (
        <div>
          <div>
            {row?.updatedAt && row?.updatedAt != ""
              ? moment(row?.updatedAt).format("DD.MM.YYYY HH:mm")
              : "-"}
          </div>
          <div className="text-capitalize">
            <span>{row?.updatedBy?.firstname}</span>{" "}
            <span>{row?.updatedBy?.lastname}</span>
            {/* {row?.updatedBy?.firstname + " " + row?.updatedBy?.lastname} */}
          </div>
        </div>
      ),
      sortField: "updatedAt",
    },
  ];

  //System Admin Type coloumn
  const systemAdminTypeColumns = [
    {
      // sortable: true,
      // name: 'id',
      width: "85px",

      selector: (row) => (
        <div className={`d-flex gap-1`}>
          {row?.keepValue ? null : (
            <div
              onClick={() => navigate(`/system-admins/type/${row?._id}`)}
              className={
                !CombinePermission ? "cursor-not-allowed" : "cursor-pointer"
              }
            >
              <Edit size={15} color="#e8b078" className="mr-1" />
            </div>
          )}

          {row?.keepValue ? null : (
            <div
              className={
                !CombinePermission ? "cursor-not-allowed" : "cursor-pointer"
              }
            >
              <Trash
                size={15}
                color="#ea5556"
                onClick={() => {
                  handleRoleWarning(row);
                }}
              />
            </div>
          )}
        </div>
      ),
      // sortField: "row_id"
    },
    {
      sortable: true,
      name: (
        <div className="text-capitalize">
          {jsonData?.system_admin?.table?.header?.id}
        </div>
      ),
      width: "80px",
      selector: (row) => (row?.row_id && row?.row_id != "" ? row?.row_id : "-"),
      sortField: "row_id",
    },
    {
      sortable: true,
      name: <div>{jsonData?.system_admin?.table?.header?.type_name}</div>,
      width: "350px",
      selector: (row) => (
        <div className="capitalize-text">
          {/* {/ {row?.role} /}
          {/ {row?.role && row?.role != '' ? row?.role : "-" } /} */}
          {isString(row?.role) && isString(row?.role) != "" ? row?.role : "-"}
        </div>
      ),
      sortField: "role",
    },

    {
      sortable: true,
      name: (
        <div className="text-capitalize">
          {jsonData?.system_admin?.table?.header?.update}
        </div>
      ),
      width: "250px",
      selector: (row) => (
        <div>
          <div>
            {row?.updatedAt && row?.updatedAt != ""
              ? moment(row?.updatedAt).format("DD.MM.YYYY HH:mm")
              : "-"}
          </div>
          <div className="text-capitalize">
            {row?.updatedBy?.firstname + " " + row?.updatedBy?.lastname}
          </div>
        </div>
      ),
      sortField: "updatedAt",
    },
  ];

  const handleWarning = (rowdata) => {
    Swal.fire({
      title: "Are you sure?",
      text: jsonData?.delete_alert_title,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        if (
          systemadminData?.adminData?.length == 1 &&
          currentPage > 1 &&
          userSite == "systemBackOffice"
        ) {
          setCurrentPage((pre) => pre - 1);
        }
        // console.log(id)
        const pages = searchValue !== "" ? 1 : currentPage;
        // console.log(rowdata,'rowdata')
        dispatch(
          SystemAdmindeleteapiCall(
            rowdata?._id,
            navigate,
            pages,
            rowsPerPage,
            searchValue,
            sortColumn,
            sortDirection,
            systemadminData?.adminData?.length == 1
          )
        );
      }
    });
  };

  const handleRoleWarning = (rowdata) => {
    Swal.fire({
      title: "Are you sure?",
      text: jsonData?.delete_alert_title,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        if (systemadminTypeData?.roleData?.length == 1 && currentPage > 1) {
          setCurrentPage((pre) => pre - 1);
        }

        // console.log(id)
        const pages = searchValue !== "" ? 1 : currentPage;
        // console.log(rowdata,'rowdata')
        dispatch(
          DeleteAdminRoleType(
            rowdata?._id,
            navigate,
            pages,
            rowsPerPage,
            searchValue,
            sortColumn,
            sortDirection,
            systemadminTypeData?.roleData?.length == 1
          )
        );
      }
    });
  };

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
        pageCount={
          rSelected === 1
            ? Math.ceil(systemadminData?.pageCount) || 1
            : Math.ceil(systemadminTypeData?.pageCount) || 1
        }
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
    if (rSelected === 1) {
      navigate("/system-admins/new");
    } else {
      navigate("/system-admins/new-type");
    }
  };

  // Function to transform each item in the array
  const transformApilistResponse = (apiItem) => {
    return {
      [jsonData?.system_admin?.table?.header?.id]: apiItem.row_id,
      [jsonData?.system_admin?.table?.header?.status]: apiItem.status,
      [jsonData?.system_admin?.table?.header?.site]: apiItem.site,
      [jsonData?.system_admin?.table?.header?.fullname]: apiItem.fullName,
      [jsonData?.system_admin?.table?.header?.user_type]: apiItem.userRole,
      [jsonData?.system_admin?.table?.header?.email]: apiItem.email, // Extract the email and remove "mailto:"
      [jsonData?.system_admin?.table?.header?.phone]: apiItem.phone,
      [jsonData?.system_admin?.table?.header?.last_seen]: apiItem.lastSeen,
      [jsonData?.system_admin?.table?.header?.update]: moment(apiItem.updatedAt).format("DD.MM.YYYY HH:mm"),
      [jsonData?.system_admin?.table?.header?.updatedBy]:apiItem.updatedBy,

    };
  }

  const transformApiRolelistResponse = (apiItem) => {
    //const typename = jsonData?.system_admin?.table?.header?.update
    return {
      [jsonData?.system_admin?.table?.header?.id]: apiItem.row_id, 
      [jsonData?.system_admin?.table?.header?.type_name]:apiItem?.role,
      [jsonData?.system_admin?.table?.header?.update]: moment(apiItem?.updatedAt).format("DD.MM.YYYY HH:mm"),
      [jsonData?.system_admin?.table?.header?.updatedBy] : apiItem?.updatedBy?.firstname + " " + apiItem?.updatedBy?.lastname
    };
  }

  return (
    <Fragment>
      <head>
        <title>
          {jsonData?.system_admin?.title} -{" "}
          {userSite == "systemBackOffice"
            ? "System Back Office"
            : userSite == "israelBackOffice"
            ? "Israel Today Back Office"
            : "Ittihad Today Back Office"}
        </title>
      </head>
      <CardHeader className="mb-2 d-flex justify-content-between align-items-center">
        <CardTitle tag="h4">{jsonData?.system_admin?.title}</CardTitle>
        <div>
          <Button
            color="info"
            onClick={NewButtonHandler}
            className={`rounded-0 me-1 ${
              CombinePermission ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            style={{ cursor: !CombinePermission ? "not-allowed" : "pointer" }}
            type="button"
          >
            {jsonData?.new}
          </Button>
          <Button
            onClick={() =>{
              
              rSelected == 1
                ? dispatch(getDownloadadta("admin", "", exportToExcel, jsonData.exel_sheetfilname.sys_admin_list, transformApilistResponse, navigate))
                : dispatch(getDownloadadta("role", "", exportToExcel, jsonData.exel_sheetfilname.sys_admin_type, transformApiRolelistResponse, navigate));
              // exportToExcel(transformedData ,rSelected === 1 ? jsonData.exel_sheetfilname.system_admin:jsonData.exel_sheetfilname.role)
            }}
            
            disabled={loadingexportbutton}
            color="primary"
            className={`rounded-0 ${
              CombinePermission ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            style={{ cursor: !CombinePermission ? "not-allowed" : "pointer" }}
            type="button"
          >
            {loadingexportbutton && (
              <Spinner
                className="me-1 text-light spinner-border-sm"
                size={10}
              />
            )}
            {jsonData?.export}
          </Button>
        </div>
      </CardHeader>
      <Card>
        <>
          {userSite !== "systemBackOffice" && (
            <Col className="mt-1" md="12" lg="12">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    active={rSelected === 1}
                    onClick={() => {
                      // setRowsPerPage(10)
                      // dispatch(SetRowPerPage(10))
                      dispatch(updateTab(1));
                    }}
                  >
                    {jsonData?.system_admin?.admin_list}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    onClick={() => {
                      // setRowsPerPage(10)
                      // dispatch(SetRowPerPage(10))
                      dispatch(updateTab(2));
                    }}
                    active={rSelected === 2}
                  >
                    {jsonData?.system_admin?.admin_type}
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          )}

          <Row className="mx-0 mt-1 mb-50">
            <Col sm="6">
              <div className="d-flex align-items-center">
                <Label for="sort-select">{jsonData?.system_admin?.show}</Label>
                <Input
                  className="dataTable-select"
                  type="select"
                  id="sort-select"
                  value={rowsPerPage}
                  onChange={(e) => {
                    handlePerPage(e);
                  }}
                >
                  {/* {/ <option value={5}>5</option> /} */}
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
                {jsonData?.system_admin?.search}
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
          {loading || LoadindRoltype || !token ? (
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
                columns={
                  rSelected === 1 ? serverSideColumns : systemAdminTypeColumns
                }
                defaultSortAsc={sort}
                sortIcon={<ChevronDown size={10} />}
                paginationComponent={CustomPagination}
                defaultSortFieldId={sortColumn}
                onSort={handleSort}
                sortServer
                data={
                  rSelected === 1
                    ? systemadminData?.adminData
                    : systemadminTypeData?.roleData
                }
              />
            </div>
          )}
        </>
      </Card>
    </Fragment>
  );
};

export default SystemAdminTable;
