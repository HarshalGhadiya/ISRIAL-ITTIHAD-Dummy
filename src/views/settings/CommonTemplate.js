import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Label,
  Row,
} from "reactstrap";
import Reachtextbox from "./Reachtextbox";
import { ErrorMessage, Field } from "formik";
import jsonData from "../../locales/en/translation.json"

function CommonTemplate(props) {
  const {
    card_header,
    setFieldValue,
    email_from,
    email_reply,
    email_sub,
    email_message,
    initialContent,
    readonly
  } = props;
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{card_header}</CardTitle>
        </CardHeader>
        <hr />
        <CardBody>
          <Row>
            <div className="col">
              <Col className="row">
                <Col sm="6" className="mb-1">
                  <em className="required-red">*</em>{" "}
                  <Label htmlFor="url_parms">{jsonData?.settingPage?.from_name}</Label>
                  <Field name={email_from}>
                    {({ field }) => (
                      <Input
                        type="text"
                        disabled={readonly}
                        id="email_from"
                        placeholder="From Name"
                        name={email_from}
                        {...field}
                        onChange={(event) =>
                          setFieldValue(email_from, event.target.value)
                        }
                        className="form-control"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name={email_from}
                    component="div"
                    className="text-danger"
                  />
                </Col>
                <Col sm="6" className="mb-1">
                  <em className="required-red">*</em>
                  <Label htmlFor="url_parms">{jsonData?.settingPage?.replay_to}</Label>
                  <Field name={email_reply}>
                    {({ field }) => (
                      <Input
                        type="text"
                        disabled={readonly}
                        placeholder="Reply To"
                        id="confirm_email_reply"
                        name={email_reply}
                        {...field}
                        onChange={(event) =>
                          setFieldValue(email_reply, event.target.value)
                        }
                        className="form-control"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name={email_reply}
                    component="div"
                    className="text-danger"
                  />
                </Col>
              </Col>
              <Col sm="12" className="mb-1">
                <Col sm="12" className="mb-1">
                  <em className="required-red">*</em>{" "}
                  <Label htmlFor="url_parms">{jsonData?.settingPage?.Subject}</Label>
                  <Field name={email_sub}>
                    {({ field }) => (
                      <Input
                        type="text"
                        disabled={readonly}
                        id="confrim_email_sub"
                        dir="rtl"
                        placeholder="Subject"
                        name={email_sub}
                        {...field}
                        onChange={(event) =>
                          setFieldValue(email_sub, event.target.value)
                        }
                        className="form-control"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name={email_sub}
                    component="div"
                    className="text-danger"
                  />
                </Col>
              </Col>
            </div>
          </Row>
          <em className="required-red">*</em>
              <Label htmlFor="Footer title">{jsonData?.settingPage?.message}</Label>
              <Reachtextbox
                setFieldValue={setFieldValue}
                name={email_message}
                initialContent={initialContent}
                readonly={readonly}
              ></Reachtextbox>
        </CardBody>
      </Card>
    </>
  );
}

export default CommonTemplate;
