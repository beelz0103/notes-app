import { useState, useEffect, useRef } from "react";
import useFileInput from "./Hooks/useFileInput";
import useEditableDiv from "./Hooks/useEditableDiv";
import FileInput from "./Form Components/FileInput";
import DivInput from "./Form Components/DivInput";

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
      <DivInput props={titleInputDiv.props} />
      <DivInput props={contentInputDiv.props} />
      <FileInput files={fileInput.files} inputProps={fileInput.props} />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};

export default FormContainer;
