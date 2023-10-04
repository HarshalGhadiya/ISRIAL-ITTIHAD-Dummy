import React, { useEffect } from "react"
import { useLocation, useNavigate } from "react-router"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  Input,
  InputGroup,
  Label,
  Row,
  Spinner,
} from "reactstrap"
import { handleKeyDown } from "../../utility/common/InputValidation"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  addHarmfulWord,
  editHarmfulWord,
  getSingalHarmfulWord,
} from "../../redux/harmfulWordSlice"
import { useParams } from "react-router-dom"
import LoaderComponent from "../../utility/common/LoaderComponent"
import toast from "react-hot-toast";
import jsonData from "../../locales/en/translation.json"
import { clippingParents } from "@popperjs/core"


const EditharmfulWord = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const { id } = useParams()
  const loading = useSelector(
    (state) => state?.root?.harmfulWord?.loading
  );
  const loader = useSelector(
    (state) => state?.root?.harmfulWord?.getSinglawordLoader
  );
  const data = useSelector(
    (state) => state?.root?.harmfulWord?.singalHarmfulWord
  );
  const [word, setHarmfulWord] = useState(id ? data?.word : "")
  const usersite = localStorage.getItem("usersite")
  useEffect(() => {
    //for access route
    const userData = JSON.parse(localStorage.getItem("userData"))
    const permissionArr = userData?.permissions?.filter((section) => section?.section == "harmfulWords")
    const checkPermission =permissionArr[0]?.permissions?.write && permissionArr[0]?.permissions?.read
    if(!checkPermission) {
      navigate('/harmful-words')
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

    if (id) {
      dispatch(getSingalHarmfulWord(navigate, id))
    }
  }, [id])

  const handleSave = () => {
    if (word == "") {
      setError(true)
    } else {
      //api call
      if (location.pathname == "/harmful-words/add") {
        dispatch(addHarmfulWord(navigate, word))
      } else if (id != undefined) {
        dispatch(editHarmfulWord(navigate, word, id))
      }
    }
  }
  return (
    <>
      <head>
        <title>{id ? jsonData.title.editharmfulword : jsonData.title.addharmfulword } - {usersite == "israelBackOffice" ? jsonData.sitename.israel : jsonData.sitename.ittihad}</title>
      </head>
      {loader ? <LoaderComponent /> : <><CardHeader className="mb-1">
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
              outline
              color="primary"
              onClick={() => navigate(-1)}>{jsonData.back}</Button>
          </Col>
        </Row>
      </CardHeader>
        <Card>
          <CardBody>
            <Form>
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0"> {id && `${jsonData.roomId}:-${data?.row_id}`}</h4>
                <Button onClick={handleSave} color="primary" disabled={loading} type="button">
                  {loading && (
                    <Spinner
                      className="me-1 text-light spinner-border-sm"
                      size={10}
                    />
                  )}
                  {jsonData.save}
                </Button>
              </div>
              <hr />
              <Row>
                <Col className="col-md-6">
                  <Label className="form-label" for="nameVerticalIcons">
                    <span className="text-danger">*</span>{jsonData.harmful_word.word}
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    id="nameVerticalIcons"
                    defaultValue={id && data?.word}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      if (e.target.value.trim() == "") {
                        setHarmfulWord('')
                        setError(true)
                      } else {
                      setHarmfulWord(e.target.value.trim())
                        setError(false)
                      }
                    }}
                  />
                  {error && <p className="text-danger mt-o">{jsonData.harmful_word.worderror}</p>}
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card></>}
    </>
  )
}

export default EditharmfulWord
