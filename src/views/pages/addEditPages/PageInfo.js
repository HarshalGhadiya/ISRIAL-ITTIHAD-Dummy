import React from 'react'
import { useParams } from 'react-router-dom'
import Select from "react-select"
import { Button, CardBody, Col, Input, Label, Row } from 'reactstrap'
import { selectThemeColors } from "@utils"
import jsonData from "../../../locales/en/translation.json"

const PageInfo = () => {
  const { id } = useParams()
  return (
    <div>
      <CardBody className="pb-0">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0"> {id && `Room ID:-${id}`}</h4>
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
              defaultValue={{ value: 'active', label: 'Active' }}
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
              value={30}
            />
          </Col>

          <Col className="col-md-2">
            <Label className="form-label" for="nameVerticalIcons">
            {jsonData.Page.publicDate}
            </Label>
            <Input
              type="text"
              disabled={true}
              value={"2023-09-13T05:13:04.113Z"}
            />
          </Col>
          <Col className="col-md-2">
            <Label className="form-label" for="nameVerticalIcons">
            {jsonData.Page.publicAdmin}
            </Label>
            <Input
              type="text"
              disabled={true}
              value={"Admin Name"}
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
              value={"Page Name"}
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
              value="Page URL"
              disabled={true}
            />
          </Col>
          <Col className="col-md-2 d-flex justify-content-start align-items-end">
            <Button type="button" color="primary">{jsonData.Page.viewPage}</Button>
          </Col>
        </Row>
      </CardBody>
    </div>
  )
}

export default PageInfo
