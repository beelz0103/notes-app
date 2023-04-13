import { useRef } from "react";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FileInput = ({ inputProps, uploadBtnRef }) => {
  const ref = useRef(null);

  const inputRef = uploadBtnRef ? uploadBtnRef : ref;

  return (
    <div className="upload-container">
      <UploadButton inputRef={inputRef} uploadBtnRef={uploadBtnRef} />
      <input ref={inputRef} {...inputProps}></input>
    </div>
  );
};

const UploadButton = ({ inputRef, uploadBtnRef }) => {
  return uploadBtnRef === undefined ? (
    <div className="upload-btn" onClick={() => inputRef.current.click()}>
      <FontAwesomeIcon className="image-icon" icon={faImage} />
    </div>
  ) : null;
};

export default FileInput;
