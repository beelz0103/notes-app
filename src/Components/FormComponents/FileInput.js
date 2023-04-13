import { useRef } from "react";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FileInput = ({ inputProps }) => {
  const ref = useRef(null);

  return (
    <div className="upload-container">
      <div className="upload-btn" onClick={() => ref.current.click()}>
        <FontAwesomeIcon className="image-icon" icon={faImage} />
      </div>
      <input ref={ref} {...inputProps}></input>
    </div>
  );
};

export default FileInput;
