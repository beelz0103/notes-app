import { useRef } from "react";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FileInput = ({ inputProps, uploadBtnRef }) => {
  return (
    <div className="upload-container">
      <input ref={uploadBtnRef} {...inputProps}></input>
    </div>
  );
};

export default FileInput;
