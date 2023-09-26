import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  pages_notifications: Yup.array()
    .min(1, "Select at least one option")
    .required("Page notifications is required"),
  comment_notifications: Yup.array()
    .min(1, "Select at least one option")
    .required("Comment notifications is required"),
  top_banner_image: Yup.mixed()
    .required("Please Select An Image")
    .test(
      "fileSize",
      "File size is too Large Enter only 1 mb file",
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
      "Pleace Upload Only JPG,PNG,JPEG",
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
    .required("Please Select An Image")
    .test(
      "fileSize",
      "File Size Is Too Large Enter only 1 mb File",
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
      "pleace Upload only JPG,PNG,JPEG",
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
    .required("Please Select An Image")
    .test(
      "fileSize",
      "File Size Is Too Large Enter only 1 mb file",
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
      "Pleace Upload only JPG,PNG,JPEG",
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
  top_title: Yup.string().required("Top Title Is Required"),
  sub_title: Yup.string().required("Sub Title Is Required"),
  mustLogin: Yup.string(),
  url_parms: Yup.string().required("URL For Perms And Privacy Policy Is Required"),
  google_client_id: Yup.string().required("Google Client Id Is Required"),
  confirm_email_from: Yup.string()
    .email("Invalid Email Address")
    .required("From Email Is Required"),
  confirm_email_reply: Yup.string()
    .email("Invalid Email Address")
    .required("Reply To Email Is Required"),
  confrim_email_sub: Yup.string().required("Confirm Email Subject is Required"),
  footer_text: Yup.string().test(
    "required",
    "Footer Text Is Required",(value)=>{
      if(value === "<p><br></p>" || !value){
        return false
      }
      else{
        return true
      }
    }
  ),
  terms_privacy_policy: Yup.string().test(
    "required",
    "Terms And Privacy Policy is Required",(value)=>{
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
    "Confirm Email Message Is Required",(value)=>{
      if(value === "<p><br></p>" || !value){
        return false
      }
      else{
        return true
      }
    }
  ),
  reset_email_from: Yup.string()
    .email("Invalid Email Address")
    .required("From Email Is Required"),
  reset_email_reply: Yup.string()
    .email("Invalid Email Address")
    .required("Reply To Email Is Required"),
  reset_email_sub: Yup.string().required("Reset Email Subject Is Required"),
  reset_email_message: Yup.string().test(
    "required",
    "Reset Email Message Is Required",(value)=>{
      if(value === "<p><br></p>" || !value){
        return false
      }
      else{
        return true
      }
    }
  ),
  newpage_email_from: Yup.string()
    .email("Invalid Email Address")
    .required("From Email Is Required"),
  newpage_email_reply: Yup.string()
    .email("Invalid Email Address")
    .required("Reply To Email Is Required"),
  newpage_email_sub: Yup.string().required(
    "New Page Email Subject Is Required"
  ),
  newpage_email_message: Yup.string().test(
    "required",
    "Newpage Email Message  Is Required",(value)=>{
      if(value === "<p><br></p>" || !value){
        return false
      }
      else{
        return true
      }
    }
  ),

  newcommit_email_from: Yup.string()
    .email("Invalid Email Address")
    .required("From Email Is Required"),
  newcommit_email_reply: Yup.string()
    .email("Invalid Email Address")
    .required("Reply To Email Is Required"),
  newcommit_email_sub: Yup.string().required(
    "New Commit Email Subject Is Required"
  ),
  newcommit_email_message: Yup.string().test(
    "required",
    "New comment Email Message Is Required",(value)=>{
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
