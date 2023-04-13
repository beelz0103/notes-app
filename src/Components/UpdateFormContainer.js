import { useState, useEffect, useRef } from "react";
import useFileInput from "./Hooks/useFileInput";
import useEditableDiv from "./Hooks/useEditableDiv";
import FileInput from "./FormComponents/FileInput";
import DivInput from "./FormComponents/DivInput";
import FormImageContainer from "./FormComponents/FormImageContainer";

const UpdateFormContainer = ({ addNote }) => {
  const fileInput = useFileInput();
  const contentInputDiv = useEditableDiv("content");
  const titleInputDiv = useEditableDiv("title");

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
    </div>
  );
};

export default UpdateFormContainer;
