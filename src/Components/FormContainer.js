import { useState, useEffect, useRef } from "react";
import useFileInput from "./Hooks/useFileInput";
import useEditableDiv from "./Hooks/useEditableDiv";
import FileInput from "./FormComponents/FileInput";
import DivInput from "./FormComponents/DivInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FormImageContainer from "./FormComponents/FormImageContainer";

const FormContainer = ({ addNote }) => {
  const fileInput = useFileInput();
  const contentInputDiv = useEditableDiv("content");
  const titleInputDiv = useEditableDiv("title");

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
    <div className="form form-container">
      <FormImageContainer
        files={fileInput.files}
        removeSingleFile={fileInput.removeSingleFile}
      />
      <DivInput props={titleInputDiv.props} />
      <DivInput props={contentInputDiv.props} />
      <FileInput
        files={fileInput.files}
        inputProps={fileInput.props}
        removeSingleFile={fileInput.removeSingleFile}
      />
      <div className="add-note-btn" onClick={handleSubmit}>
        <div>Add Note</div>
      </div>
    </div>
  );
};

export default FormContainer;
