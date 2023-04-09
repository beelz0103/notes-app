import { useState, useEffect, useRef } from "react";
import useFileInput from "./Hooks/useFileInput";
import useEditableDiv from "./Hooks/useEditableDiv";
import FileInput from "./FormComponents/FileInput";
import DivInput from "./FormComponents/DivInput";

const FormContainer = ({ addNote }) => {
  const fileInput = useFileInput();
  const contentInputDiv = useEditableDiv();
  const titleInputDiv = useEditableDiv();

  const handleSubmit = () => {
    if (titleInputDiv.empty || contentInputDiv.empty) {
      console.log("input fields cant be empty"); //I dont want to implement input errors now
      return;
    }

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
