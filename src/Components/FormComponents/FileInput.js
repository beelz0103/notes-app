import { useRef } from "react";
import FormImageContainer from "./FormImageContainer";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FileInput = ({ inputProps, files, removeSingleFile }) => {
  const ref = useRef(null);

  return (
    <div className="image-uploader">
      <div className="upload-btn" onClick={() => ref.current.click()}>
        <FontAwesomeIcon className="upload-image" icon={faImage} />
        <div className="test"></div>
      </div>
      <input ref={ref} {...inputProps}></input>
      <FormImageContainer files={files} removeSingleFile={removeSingleFile} />
    </div>
  );
};

export default FileInput;
