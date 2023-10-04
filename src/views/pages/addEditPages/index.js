// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

// ** Reactstrap Imports
import { TabContent, TabPane, Nav, NavItem, NavLink, CardHeader, Row, Col, CardTitle, Button, Card } from 'reactstrap'
import MainPageInfo from './MainPageInfo'
import PageInfo from './PageInfo'
import CustomCommentTable from '../../../utility/common/CustomCommentTable'
import { getComment } from '../../../redux/commentSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useDebouncedValue } from '../../../utility/common/useDebouncedValue'
import jsonData from "../../../locales/en/translation.json"
import toast from "react-hot-toast";

const index = () => {
  // ** State
  const [active, setActive] = useState('1')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()

  // ** States
  // const rowperpage = useSelector((state) => state?.root?.comment?.rowsPerPagePageComment)
  const rowperpage = useSelector(
    (state) => state?.root?.harmfulWord?.rowsPerPage
  );
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(rowperpage)
  const [searchValue, setSearchValue] = useState("")
  const [column, setColumn] = useState("row_id")
  const [sortDirection, setSortDirection] = useState("desc")
  const data = useSelector((state) => state?.root?.comment?.commentData)
  const loading = useSelector((state) => state?.root?.comment?.loading)
  const debouncedQuery = useDebouncedValue(searchValue, 1000)
  const usersite = localStorage.getItem("usersite")

  useEffect(() => {
    //for access route
    const userData = JSON.parse(localStorage.getItem("userData"))
    const permissionArr = userData?.permissions?.filter((section) => section?.section == "comments")
    const checkPermission = permissionArr[0]?.permissions?.write && permissionArr[0]?.permissions?.read
    if (!checkPermission) {
      navigate('/comments')
      toast.error(jsonData.errormsg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [dispatch])


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
        id, ""
      )
    )
  }, [dispatch, debouncedQuery, rowsPerPage, currentPage, sortDirection])

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }
  return (
    <Fragment>
      <head>
        <title>{id ? jsonData.title.editPage : jsonData.title.addPage} - {usersite == "israelBackOffice" ? jsonData.sitename.israel : jsonData.sitename.ittihad}</title>
      </head>
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
              outline
              color="primary"
              onClick={() => navigate(-1)}>{jsonData.back}</Button>
          </Col>
        </Row>
      </CardHeader>
      <Card>

        <div className='mt-2'>
          <Nav tabs>
            <NavItem>
              <NavLink
                active={active === '1'}
                onClick={() => {
                  toggle('1')
                }}
              >
                {usersite == "israelBackOffice" ? jsonData.Page.israelPageInfo : jsonData.Page.ittihadPageInfo}
              </NavLink>
            </NavItem>
            {location.pathname !== '/pages/add' && <><NavItem>
              <NavLink
                active={active === '2'}
                onClick={() => {
                  toggle('2')
                }}
              >
                {usersite == "israelBackOffice" ? jsonData.Page.ittihadPageInfo : jsonData.Page.israelPageInfo}
              </NavLink>
            </NavItem>
              <NavItem>
                <NavLink
                  active={active === '3'}
                  onClick={() => {
                    toggle('3')
                  }}
                >
                  {jsonData.title.comment}
                </NavLink>
              </NavItem>
            </>}
          </Nav>
        </div>
        <TabContent className='py-50' activeTab={active}>
          <TabPane tabId='1'>
            <MainPageInfo />
          </TabPane>
          <TabPane tabId='2'>
            <PageInfo />
          </TabPane>
          <TabPane tabId='3'>
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
              checkPermission={true}
              tableFlag={"pageComment"}
            />
          </TabPane>
        </TabContent>
      </Card>
    </Fragment>
  )
}
export default index
