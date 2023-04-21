import useEditableDiv from "./Hooks/useEditableDiv";
import FileInput from "./FormComponents/FileInput";
import FormImageContainer from "./FormComponents/FormImageContainer";
import {
  StyledTitleDiv,
  StyledContentDiv,
} from "./StyledComponents/StyledPopupComponents";
import parse from "html-react-parser";
import useFileInputUpdate from "./Hooks/useFileInputUpdate";
import { useContext, createContext } from "react";
import { ContainerContext } from "./Container";
import { PopupContext } from "./NoteComponents/NotePopup";

const UpdateFormContainer = ({ labelList }) => {
  const { updateNote, labels } = useContext(ContainerContext);
  const { note, updateBtnRef, hideModal, uploadBtnRef } =
    useContext(PopupContext);

  const { fileInput } = useFileInputUpdate(note.images);
  const contentInputDiv = useEditableDiv("content", note.content);
  const titleInputDiv = useEditableDiv("title", note.title);

  const handleUpdate = () => {
    if (titleInputDiv.empty || contentInputDiv.empty) {
      console.log("WARNING: Input fields cant be empty"); //haven't impletmented validation
      return;
    }

    hideModal();

    updateNote(
      {
        title: titleInputDiv.value,
        content: contentInputDiv.value,
        images: fileInput.files,
        labels: labels.filter((label) => {
          return labelList.find(({ id }) => id === label._id.toString())
            .checked;
        }),
      },
      note._id
    );
  };

  return fileInput.files === 0 ? null : (
    <>
      <FormImageContainer
        files={fileInput.files}
        removeSingleFile={fileInput.removeSingleFile}
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
