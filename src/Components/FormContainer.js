import { useState, useEffect, useRef } from "react";
import useFileInput from "./Hooks/useFileInput";
import usePreloadImages from "./Hooks/usePreloadImages";
import useEditableDiv from "./Hooks/useEditableDiv";
import ThumbnailContainer from "./Form Components/ThumbnailContainer";

const FormContainer = ({ addNote }) => {
  const { inputProps, files, setFiles, resetFiles } = useFileInput();
  const fileInput = useFileInput();
  const contentInputDiv = useEditableDiv();
  const titleInputDiv = useEditableDiv();

  const handleSubmit = () => {
    addNote({
      title: titleInputDiv.value,
      content: contentInputDiv.value,
      images: fileInput.files,
    });

    contentInputDiv.resetValue();
    titleInputDiv.resetValue();
    fileInput.resetFiles();
    setFiles([]);
  };

  return (
    <div className="form">
      <div>
        <div {...titleInputDiv.props}></div>
      </div>
      <div>
        <div {...contentInputDiv.props}></div>
      </div>
      <FileInput files={fileInput.files} inputProps={fileInput.props} />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};

const FileInput = ({ inputProps, files }) => {
  const ref = useRef(null);

  return (
    <div className="image-uploader">
      <button className="upload-btn" onClick={() => ref.current.click()}>
        Choose File
      </button>
      <input ref={ref} {...inputProps}></input>
      <ThumbnailContainer files={files} />
    </div>
  );
};

export default FormContainer;
