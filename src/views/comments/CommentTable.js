// ** React Imports
import { Fragment, useState, useEffect, memo } from "react"

import { useSelector, useDispatch } from "react-redux"

// ** Third Party Components
import { exportToExcel } from "../../utility/common/exportToExcel"

// ** Reactstrap Imports
import {
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap"
import { useNavigate } from "react-router"
import { useDebouncedValue } from "../../utility/common/useDebouncedValue"
import LoaderComponent from "../../utility/common/LoaderComponent"
import { getComment } from "../../redux/commentSlice"
import CustomCommentTable from "../../utility/common/CustomCommentTable"
import jsonData from "../../locales/en/translation.json"
const CommentTable = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // ** States
  const rowperpage = useSelector((state) => state?.root?.comment?.rowsPerPageComment)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(rowperpage)
  const [searchValue, setSearchValue] = useState("")
  const [column, setColumn] = useState('row_id')
  const [sortDirection, setSortDirection] = useState('desc')
  // const data = useSelector((state) => state?.root?.comment?.commentData)
  const data ={
    "allCommentsData": [
      {
        "_id": "65094b9ec7d619783586954d",
        "row_id": 10,
        "originalComment": "welcome to Tridhya Tech",
        "site": "israel-today",
        "status": "pending",
        "createdAt": "2023-09-19T07:19:58.450Z",
        "updatedAt": "2023-09-19T11:14:39.506Z",
        "approvalDate": "2023-09-19T09:44:47.053Z",
        "updatedComment": "user asadjkqkadqqwd",
        "pageData": {
          "_id": "65098ac7dfc16014091b766f",
          "israelPage": "iseraelPage",
          "ittihadPage": "test"
        },
        "like": 0,
        "replyComments": [],
        "totalReplay": 0,
        "updatedByAdmin": {
          "_id": "6501c415c9616d135ba396f1",
          "firstname": "israel",
          "lastname": "admin24324"
        }
      },
      {
        "_id": "65094b99c7d619783586953f",
        "row_id": 9,
        "originalComment": "welcome to Tridhya Tech",
        "site": "israel-today",
        "status": "pending",
        "createdAt": "2023-09-19T07:19:53.320Z",
        "updatedAt": "2023-09-19T09:44:09.517Z",
        "pageData": {
          "_id": "6509786dad867c4e792aa00d",
          "israelPage": "iseraelPage",
          "ittihadPage": "ittihad Page"
        },
        "like": 0,
        "replyComments": [],
        "totalReplay": 0
      },
      {
        "_id": "65094b95c7d6197835869531",
        "row_id": 8,
        "originalComment": "welcome to Tridhya Tech",
        "site": "israel-today",
        "status": "pending",
        "createdAt": "2023-09-19T07:19:49.145Z",
        "updatedAt": "2023-09-20T09:56:32.726Z",
        "approvalDate": "2023-09-20T09:24:22.885Z",
        "updatedComment": "asdasdasda",
        "pageData": {
          "_id": "65098ac7dfc16014091b766f",
          "israelPage": "iseraelPage",
          "ittihadPage": "test"
        },
        "like": 0,
        "replyComments": [],
        "totalReplay": 0,
        "updatedByAdmin": {
          "_id": "6502a8d49aefafd330438638",
          "firstname": "ittihad",
          "lastname": "admin"
        }
      },
      {
        "_id": "65094b92c7d6197835869518",
        "row_id": 7,
        "originalComment": "welcome to Tridhya Tech",
        "site": "israel-today",
        "status": "approved",
        "createdAt": "2023-09-19T07:19:46.222Z",
        "updatedAt": "2023-09-20T09:34:47.888Z",
        "updatedComment": "asdasa",
        "approvalDate": "2023-09-20T09:34:47.886Z",
        "pageData": {
          "_id": "6509786dad867c4e792aa00d",
          "israelPage": "iseraelPage",
          "ittihadPage": "ittihad Page"
        },
        "like": 0,
        "replyComments": [],
        "totalReplay": 0,
        "updatedByAdmin": {
          "_id": "6502a8d49aefafd330438638",
          "firstname": "ittihad",
          "lastname": "admin"
        }
      },
      {
        "_id": "65094b8cc7d619783586950a",
        "row_id": 6,
        "originalComment": "welcome to Tridhya Tech",
        "site": "israel-today",
        "status": "approved",
        "createdAt": "2023-09-19T07:19:40.954Z",
        "updatedAt": "2023-09-19T11:09:47.554Z",
        "approvalDate": "2023-09-19T11:09:47.552Z",
        "pageData": {
          "_id": "6509786dad867c4e792aa00d",
          "israelPage": "iseraelPage",
          "ittihadPage": "ittihad Page"
        },
        "like": 0,
        "replyComments": [],
        "totalReplay": 0,
        "updatedByAdmin": {
          "_id": "6501c415c9616d135ba396f1",
          "firstname": "israel",
          "lastname": "admin24324"
        }
      },
      {
        "_id": "65094b89c7d61978358694fc",
        "row_id": 5,
        "originalComment": "welcome to Tridhya Tech",
        "site": "israel-today",
        "status": "approved",
        "createdAt": "2023-09-19T07:19:37.861Z",
        "updatedAt": "2023-09-19T07:49:29.858Z",
        "approvalDate": "2023-09-19T07:49:29.854Z",
        "pageData": {
          "_id": "6509786dad867c4e792aa00d",
          "israelPage": "iseraelPage",
          "ittihadPage": "ittihad Page"
        },
        "like": 0,
        "replyComments": [],
        "totalReplay": 0,
        "updatedByAdmin": {
          "_id": "6501c415c9616d135ba396f1",
          "firstname": "israel",
          "lastname": "admin24324"
        }
      },
      {
        "_id": "65094b86c7d61978358694ee",
        "row_id": 4,
        "originalComment": "welcome to Tridhya Tech",
        "site": "israel-today",
        "status": "pending",
        "createdAt": "2023-09-19T07:19:34.622Z",
        "updatedAt": "2023-09-20T10:37:54.284Z",
        "approvalDate": "2023-09-20T10:10:45.300Z",
        "updatedComment": "asdasadSDAWDW",
        "pageData": {
          "_id": "6509786dad867c4e792aa00d",
          "israelPage": "iseraelPage",
          "ittihadPage": "ittihad Page"
        },
        "like": 0,
        "replyComments": [],
        "totalReplay": 0,
        "updatedByAdmin": {
          "_id": "6502a8d49aefafd330438638",
          "firstname": "ittihad",
          "lastname": "admin"
        }
      },
      {
        "_id": "65094b83c7d61978358694e0",
        "row_id": 3,
        "originalComment": "welcome to Tridhya Tech",
        "site": "israel-today",
        "status": "pending",
        "createdAt": "2023-09-19T07:19:31.595Z",
        "updatedAt": "2023-09-19T07:19:31.595Z",
        "pageData": {
          "_id": "6509786dad867c4e792aa00d",
          "israelPage": "iseraelPage",
          "ittihadPage": "ittihad Page"
        },
        "like": 0,
        "replyComments": [],
        "totalReplay": 0
      },
      {
        "_id": "65094b80c7d61978358694d2",
        "row_id": 2,
        "originalComment": "welcome to Tridhya Tech",
        "site": "israel-today",
        "status": "pending",
        "createdAt": "2023-09-19T07:19:28.615Z",
        "updatedAt": "2023-09-20T09:52:41.910Z",
        "updatedComment": "i want change 12",
        "pageData": {
          "_id": "6509786dad867c4e792aa00d",
          "israelPage": "iseraelPage",
          "ittihadPage": "ittihad Page"
        },
        "like": 0,
        "replyComments": [],
        "totalReplay": 0
      },
      {
        "_id": "65094b7dc7d61978358694c3",
        "row_id": 1,
        "originalComment": "welcome to Tridhya Tech",
        "site": "israel-today",
        "status": "pending",
        "createdAt": "2023-09-19T07:19:25.259Z",
        "updatedAt": "2023-09-20T10:22:48.889Z",
        "approvalDate": "2023-09-20T09:13:17.214Z",
        "updatedComment": "i want change",
        "pageData": {
          "_id": "6509786dad867c4e792aa00d",
          "israelPage": "iseraelPage",
          "ittihadPage": "ittihad Page"
        },
        "like": 2,
        "replyComments": [
          {
            "commentReplay": "Thanks",
            "like": 2
          },
          {
            "commentReplay": "Thanks",
            "like": 0
          }
        ],
        "totalReplay": 2,
        "updatedByAdmin": {
          "_id": "6502a8d49aefafd330438638",
          "firstname": "ittihad",
          "lastname": "admin"
        }
      }
    ],
    "pageCount": 2
  }
  const loading = useSelector((state) => state?.root?.comment?.loading)
  const debouncedQuery = useDebouncedValue(searchValue, 1000)
  //for permition check
  const usersite = localStorage.getItem("usersite")
  const userData = JSON.parse(localStorage.getItem("userData"))
  const permissionArr = userData?.permissions?.filter((section) => section?.section == "comments")
  const checkPermission =permissionArr[0]?.permissions?.write && permissionArr[0]?.permissions?.read

  // // ** Get data on mount
  // useEffect(() => {
  //   dispatch(
  //     getComment(
  //       navigate,
  //       currentPage,
  //       rowsPerPage,
  //       searchValue,
  //       sortDirection,
  //       column,
  //       true
  //     )
  //   )
  // }, [dispatch, debouncedQuery, rowsPerPage, currentPage, sortDirection])


  return (
    <Fragment>
      <head>
        <title>{jsonData.title.comment} -{usersite == "israelBackOffice" ? jsonData.sitename.israel : jsonData.sitename.ittihad} </title>
      </head>
        <Row>
          <Col sm="12">
            <CardHeader className="mb-1">
              <Row>
                <Col
                  className="d-flex align-items-center justify-content-sm-start mt-sm-0 mt-1"
                  sm="8"
                >
                  <CardTitle tag="h4">{jsonData.title.comment}</CardTitle>
                </Col>
                <Col
                  className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
                  sm="4"
                >
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
              checkPermission={checkPermission}
              tableFlag={"comment"}
              />
          </Col>
        </Row>
    </Fragment>
  )
}

export default CommentTable
