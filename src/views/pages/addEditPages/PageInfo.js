import React from 'react'
import { useParams } from 'react-router-dom'
import Select from "react-select"
import { Button, CardBody, Col, Input, Label, Row } from 'reactstrap'
import { selectThemeColors } from "@utils"
import jsonData from "../../../locales/en/translation.json"
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useState } from 'react'
import { useEffect } from 'react'

const PageInfo = () => {
  const { id } = useParams()
  const singalPageData = useSelector((state) => state?.root?.page?.singalPage)
  const usersite = localStorage.getItem("usersite")
  const [admin, setAdmin] = useState('');

  const options = [
    { value: jsonData.Page.activeValue, label: jsonData.Page.activeLabel },
    { value: jsonData.Page.pendingValue, label: jsonData.Page.pendingLabel },
    { value: jsonData.Page.notApprovedValue, label: jsonData.Page.notApprovedLabel },
  ]

  //set admin name
  useEffect(() => {
    if (usersite === 'ittihadBackOffice') {
      if (singalPageData?.israelUpdatedByAdmin) {
        setAdmin(singalPageData?.israelUpdatedByAdmin?.firstname ?? '' + ' ' + singalPageData?.israelUpdatedByAdmin?.lastname ?? '')
      } else if (singalPageData?.israelUpdatedByUser) {
        setAdmin(singalPageData?.israelUpdatedByUser?.firstname ?? '' + ' ' + singalPageData?.israelUpdatedByUser?.lastname ?? '')
      }
    } else if (usersite === 'israelBackOffice') {
      if (singalPageData?.ittihadUpdatedByAdmin) {
        setAdmin(singalPageData?.ittihadUpdatedByAdmin?.firstname ?? '' + ' ' + singalPageData?.ittihadUpdatedByAdmin?.lastname ?? '')
      } else if (singalPageData?.ittihadUpdatedByUser) {
        setAdmin(singalPageData?.ittihadUpdatedByUser?.firstname ?? '' + ' ' + singalPageData?.ittihadUpdatedByUser?.lastname ?? '')
      }
    }
  }, [singalPageData])

  //capitale admin name
  const capitalizeName = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  const capitalAdminName = capitalizeName(admin)

  return (
    <div>
      <CardBody className="pb-0">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0"> {id && `Room ID:-${singalPageData?.row_id}`}</h4>
        </div>
        <hr />
        <Row>
          <Col className="col-md-2">
            <Label className="form-label" for="nameVerticalIcons">
              {jsonData.Comment.status}
            </Label>
            <Select
              name='status'
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              defaultValue={options.find((option) => option.value == (usersite == "israelBackOffice" ? singalPageData?.ittihadStatus : singalPageData?.israelStatus))}
              isClearable={false}
              isDisabled={true}
            />
          </Col>
          <Col className="col-md-2">
            <Label className="form-label" for="nameVerticalIcons">
              {jsonData.Page.totalComment}
            </Label>
            <Input
              type="text"
              disabled={true}
              value={usersite == "israelBackOffice" ? singalPageData?.ittihadCommentCount : singalPageData?.israelCommentCount}
            />
          </Col>

          <Col className="col-md-2">
            <Label className="form-label" for="nameVerticalIcons">
              {jsonData.Page.publicDate}
            </Label>
            <Input
              type="text"
              disabled={true}
              value={usersite == "israelBackOffice" ? singalPageData?.ittihadPublishDate && moment(singalPageData?.ittihadPublishDate).format("DD.MM.YYYY HH:mm") : singalPageData?.israelPublishDate && moment(singalPageData?.israelPublishDate).format("DD.MM.YYYY HH:mm")}
            />
          </Col>
          <Col className="col-md-2">
            <Label className="form-label" for="nameVerticalIcons">
              {jsonData.Page.publicAdmin}
            </Label>
            <Input
              type="text"
              disabled={true}
              value={capitalAdminName}
            />
          </Col>
        </Row>
        <Row className="mt-1">
          <Col className="col-md-6">
            <Label className="form-label" for="nameVerticalIcons">
              {jsonData.Page.pageName}
            </Label>
            <Input
              type="text"
              value={usersite == "israelBackOffice" ? singalPageData?.ittihadPage : singalPageData?.israelPage}
              disabled={true}
            />
          </Col>
        </Row>
        <Row className="mt-1">
          <Col className="col-md-6">
            <Label className="form-label" for="nameVerticalIcons">
              {jsonData.Page.pageURL}
            </Label>
            <Input
              type="text"
              value={usersite == "israelBackOffice" ? singalPageData?.ittihadUrl : singalPageData?.isrealUrl}
              disabled={true}
            />
          </Col>
          <Col className="col-md-2 d-flex justify-content-start align-items-end">
            <Button type="button" color="primary" onClick={() => window.open(usersite == "israelBackOffice" ? singalPageData?.ittihadUrl : singalPageData?.isrealUrl, "_blank")}
              disabled={usersite == "israelBackOffice" ? !singalPageData?.ittihadUrl : !singalPageData?.isrealUrl}
            >{jsonData.Page.viewPage}</Button>
          </Col>
        </Row>
      </CardBody>
    </div>
  )
}

export default PageInfo
