import { useState, useEffect, useRef } from "react";
import useFileInput from "./Hooks/useFileInput";
import useEditableDiv from "./Hooks/useEditableDiv";
import FileInput from "./FormComponents/FileInput";
import DivInput from "./FormComponents/DivInput";
import FormImageContainer from "./FormComponents/FormImageContainer";
import {
  StyledTitleDiv,
  StyledContentDiv,
} from "./StyledComponents/StyledPopupComponents";
import parse from "html-react-parser";
import UpdateFormImageContainer from "./FormComponents/UpdateFormImageContainer";
import useFileInputUpdate from "./Hooks/useFileInputUpdate";

const UpdateFormContainer = ({
  updateNote,
  note,
  updateBtnRef,
  hideModal,
  uploadBtnRef,
}) => {
  const { fileInput } = useFileInputUpdate(note.images);
  const contentInputDiv = useEditableDiv("content", note.content);
  const titleInputDiv = useEditableDiv("title", note.title);

  const handleUpdate = () => {
    return;
    if (titleInputDiv.empty || contentInputDiv.empty) {
      console.log("WARNING: Input fields cant be empty"); //haven't impletmented validation
    }

    hideModal();

    if (
      !(
        titleInputDiv.value === note.title &&
        contentInputDiv.value === note.content
      )
    ) {
      updateNote(
        {
          title: titleInputDiv.value,
          content: contentInputDiv.value,
          images: note.images,
        },
        note._id
      );
    }
  };

  return (
    <>
      <UpdateFormImageContainer
        images={note.images}
        updatable={true}
        fromPopup="from popup"
      />
      <div>
        <StyledTitleDiv>
          <div {...titleInputDiv.props}>{parse(note.title)}</div>
        </StyledTitleDiv>
      </div>
      <div>
        <StyledContentDiv>
          <div {...contentInputDiv.props}>{parse(note.content)}</div>
        </StyledContentDiv>
      </div>
      <FileInput
        files={fileInput.files}
        inputProps={fileInput.props}
        removeSingleFile={fileInput.removeSingleFile}
        uploadBtnRef={uploadBtnRef}
      />
      <UpdateButton updateBtnRef={updateBtnRef} handleUpdate={handleUpdate} />
    </>
  );
};

const UpdateButton = ({ updateBtnRef, handleUpdate }) => {
  return (
    <button
      ref={updateBtnRef}
      onClick={handleUpdate}
      style={{ display: "none" }}
    >
      Update
    </button>
  );
};

export default UpdateFormContainer;
