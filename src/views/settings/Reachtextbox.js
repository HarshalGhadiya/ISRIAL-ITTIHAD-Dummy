import React, { useMemo, useRef } from "react";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import JoditEditor from "jodit-react";
import "@styles/react/libs/editor/editor.scss";
import { useState } from "react";
import { stateToHTML } from "draft-js-export-html";
import { useEffect } from "react";
import { ErrorMessage, Field } from "formik";
import { memo } from "react";
// import { right } from "@popperjs/core";

function Reachtextbox(props) {
  const { setFieldValue, name, initialContent,readonly} = props;

  // useEffect(() => {
  //   //You can access the current editor content here if needed
  // }, [initialContent]);

  const editor = useRef(null);
  const [content, setContent] = useState(initialContent);

 

  return (
    <>
      <div style={{ textAlign: "right" }}>
        <JoditEditor
          ref={editor}
          value={content}
          config={{
            readonly:readonly,
          }}
          tabIndex={1} // tabIndex of textarea
          // onBlur={(newContent) => {
          //   setFieldValue(name, newContent);
          // }} 
          onChange={(newContent) => {
            setFieldValue(name, newContent);
          }} 
        />
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="error-message text-danger"
      />
    </>
  );
}

export default memo(Reachtextbox);
