import { useRef } from "react";
import FormImageContainer from "./FormImageContainer";

const FileInput = ({ inputProps, files }) => {
  const ref = useRef(null);

  return (
    <div className="image-uploader">
      <button className="upload-btn" onClick={() => ref.current.click()}>
        Choose File
      </button>
      <input ref={ref} {...inputProps}></input>
      <FormImageContainer files={files} />
    </div>
  );
};

export default FileInput;
