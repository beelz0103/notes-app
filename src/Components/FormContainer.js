import { useState, useEffect, useRef } from "react";
import useFileInput from "./Hooks/useFileInput";
import usePreloadImages from "./Hooks/usePreloadImages";
import useEditableDiv from "./Hooks/useEditableDiv";
import FileInput from "./Form Components/FileInput";

const FormContainer = ({ addNote }) => {
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

export default FormContainer;
