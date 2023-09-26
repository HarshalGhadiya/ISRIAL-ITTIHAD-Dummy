// ** React Imports
import { useState, Fragment } from "react";

// ** Reactstrap Imports
import { Card, CardBody } from "reactstrap";

// ** Third Party Imports
import { useDropzone } from "react-dropzone";
import { FileText, X, DownloadCloud, UploadCloud } from "react-feather";
import { height } from "dom7";

const FileUploader = (props) => {
  // ** State
  const { setFieldValue, id, initialPath,readonly,...inputProps} = props;
  console.log(initialPath, "initialPath");
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => {
          setFieldValue(id, file);
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        })
      );
    },
  });

  return (
    <Card style={{ border: "1px solid #ededed",cursor:  readonly ?'not-allowed':"pointer"}}>
      <CardBody>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps({ ...inputProps })} />
          {files && files.length > 0 ? (
            <div>
              {files.map((file, index) => {
                return (
                  <Fragment key={index}>
                    <img
                      src={
                        file?.preview
                          ? file.preview
                          : `${import.meta.env.VITE_APP_FILE_API_URL}/${initialPath}`
                      }
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Fragment>
                );
              })}
            </div>
          ) : initialPath ? (
            <img
              src={`${import.meta.env.VITE_APP_FILE_API_URL}/${initialPath}`}
              style={{ width: "100%", height: "auto" }}
            />
          ) : (
            <div className="d-flex align-items-center justify-content-center flex-column">
              <UploadCloud size={34} style={{ color: "#339AF0",cursor:'pointer' }} />
              <h5 className="pt-1 text-center">Select or drage file </h5>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default FileUploader;
