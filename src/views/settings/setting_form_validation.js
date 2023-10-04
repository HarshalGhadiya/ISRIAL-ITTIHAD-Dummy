import * as Yup from "yup";
import jsonData from "../../locales/en/translation.json";


const validationSchema = Yup.object().shape({
  pages_notifications: Yup.array()
    .min(1, jsonData?.error_msg?.pages_notifications?.min)
    .required(jsonData?.error_msg?.pages_notifications?.required),
  comment_notifications: Yup.array()
    .min(1, jsonData?.error_msg?.comment_notifications?.required)
    .required(jsonData?.error_msg?.comment_notifications?.min),
  top_banner_image: Yup.mixed()
    .required(jsonData?.error_msg?.image?.required)
    .test(
      "fileSize",
      jsonData?.error_msg?.image?.filesize,
      (value) => {
        if (typeof value === "string") {
          return true;
        } else {
          return value && value.size <= 1024000; // 1MB (adjust as needed)
        }
      }
    )
    .test(
      "fileType",
      jsonData?.error_msg?.image?.filetype,
      (value) => {
        if (typeof value === "string") {
          return true;
        } else {
          return value &&
          ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
            value.type
          )
        }
      } 
    ),
  logo_image: Yup.mixed()
    .required(jsonData?.error_msg?.image?.required)
    .test(
      "fileSize",
      jsonData?.error_msg?.image?.filesize,
      (value) => {
        if (typeof value === "string") {
          return true;
        } else {
          return value && value.size <= 1024000; // 1MB (adjust as needed)
        }
      }
    )
    .test(
      "fileType",
      jsonData?.error_msg?.image?.filetype,
      (value) => {
        if (typeof value === "string") {
          return true;
        } else {
          return value &&
          ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
            value.type
          )
        }
      } 
    ),
  login_image: Yup.mixed()
    .required(jsonData?.error_msg?.image?.required)
    .test(
      "fileSize",
      jsonData?.error_msg?.image?.filesize,
      (value) => {
        if (typeof value === "string") {
          return true;
        } else {
          return value && value.size <= 1024000; // 1MB (adjust as needed)
        }
      }
    )
    .test(
      "fileType",
      jsonData?.error_msg?.image?.filetype,
      (value) => {
        if (typeof value === "string") {
          return true;
        } else {
          return value &&
          ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
            value.type
          )
        }
      } 
    ),
  top_title: Yup.string().required(jsonData?.error_msg?.top_title).trim(),
  sub_title: Yup.string().required(jsonData?.error_msg?.sub_title).trim(),
  mustLogin: Yup.string(),
  url_parms: Yup.string().required(jsonData?.error_msg?.url_parms).trim(),
  google_client_id: Yup.string().required(jsonData?.error_msg?.google_id).trim(),
  confirm_email_from: Yup.string()
    .email(jsonData?.error_msg?.email?.invalid)
    .required(jsonData?.error_msg?.email?.required).trim(),
  confirm_email_reply: Yup.string()
    .email(jsonData?.error_msg?.email?.invalid)
    .required(jsonData?.error_msg?.email?.required).trim(),
  confrim_email_sub: Yup.string().required(jsonData?.error_msg?.confirm_email_sub).trim(),
  footer_text: Yup.string().test(
    "required",
    jsonData?.error_msg?.footer_title,(value)=>{
      if(value === "<p><br></p>" || !value){
        return false
      }
      else{
        return true
      }
    }
  ).trim(),
  terms_privacy_policy: Yup.string().test(
    "required",
    jsonData?.error_msg?.terms_private,(value)=>{
      if(value === "<p><br></p>" || !value){
        return false
      }
      else{
        return true
      }
    }
  ),
  confirm_email_message: Yup.string().test(
    "required",
    jsonData?.error_msg?.confirm_email,(value)=>{
      if(value === "<p><br></p>" || !value){
        return false
      }
      else{
        return true
      }
    }
  ),
  reset_email_from: Yup.string()
    .email(jsonData?.error_msg?.email?.invalid)
    .required(jsonData?.error_msg?.email?.required).trim(),
  reset_email_reply: Yup.string()
    .email(jsonData?.error_msg?.email?.invalid)
    .required(jsonData?.error_msg?.email?.required).trim(),
  reset_email_sub: Yup.string().required(jsonData?.error_msg?.reset_email_sub).trim(),
  reset_email_message: Yup.string().test(
    "required",
    jsonData?.error_msg?.reset_email_message,(value)=>{
      if(value === "<p><br></p>" || !value){
        return false
      }
      else{
        return true
      }
    }
  ),
  newpage_email_from: Yup.string()
    .email(jsonData?.error_msg?.email?.invalid)
    .required(jsonData?.error_msg?.email?.required).trim(),
  newpage_email_reply: Yup.string()
    .email(jsonData?.error_msg?.email?.invalid)
    .required(jsonData?.error_msg?.email?.required).trim(),
  newpage_email_sub: Yup.string().required(
    jsonData?.error_msg?.new_page_sub
  ),
  newpage_email_message: Yup.string().test(
    "required",
    jsonData?.error_msg?.new_page_email_message,(value)=>{
      if(value === "<p><br></p>" || !value){
        return false
      }
      else{
        return true
      }
    }
  ),

  newcommit_email_from: Yup.string()
    .email(jsonData?.error_msg?.email?.invalid)
    .required(jsonData?.error_msg?.email?.required).trim(),
  newcommit_email_reply: Yup.string()
    .email(jsonData?.error_msg?.email?.invalid)
    .required(jsonData?.error_msg?.email?.required).trim(),
  newcommit_email_sub: Yup.string().required(
    jsonData?.error_msg?.new_comment_sub
  ).trim(),
  newcommit_email_message: Yup.string().test(
    "required",
    jsonData?.error_msg?.new_comment_message,(value)=>{
      if(value === "<p><br></p>" || !value){
        return false
      }
      else{
        return true
      }
    }
  ),
});
export default validationSchema;
