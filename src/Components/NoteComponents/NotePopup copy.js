import { useRef, useState } from "react";
import parse from "html-react-parser";
import useEditableDiv from "../Hooks/useEditableDiv";
import { StyledButton } from "../StyledComponents/StyledComponents";
import {
  PopupContainerStyled,
  PopupInnerContainer,
} from "../StyledComponents/StyledPopupComponents";
import NoteImageContainer from "../FormComponents/NoteImageContainer";
import { Modal } from "../StyledComponents/Modal";

import { ControlsContainerStyled } from "../StyledComponents/StyledPopupComponents";

import {
  StyledFooter,
  StyledContentDiv,
  StyledTitleDiv,
} from "../StyledComponents/StyledPopupComponents";

import UpdateFormImageContainer from "../FormComponents/UpdateFormImageContainer";

import UpdateFormContainer from "../UpdateFormContainer";

const NotePopup = ({ display, popupNote, updateNote, hideModal }) => {
  const contentInputDiv = useEditableDiv("content", popupNote.content);
  const titleInputDiv = useEditableDiv("title", popupNote.title);

  const handleUpdate = () => {
    if (titleInputDiv.empty || contentInputDiv.empty) {
      console.log("WARNING: Input fields cant be empty"); //haven't impletmented validation
    }

    hideModal();

    if (
      !(
        titleInputDiv.value === popupNote.title &&
        contentInputDiv.value === popupNote.content
      )
    ) {
      updateNote(
        {
          title: titleInputDiv.value,
          content: contentInputDiv.value,
          images: popupNote.images,
        },
        popupNote._id
      );
    }
  };

  return (
    <>
      <Modal style={{ display: display }} onClick={hideModal}></Modal>
      <Popup
        note={popupNote}
        props={{
          display,
          hideModal,
          note: popupNote,
          handleUpdate,
          contentInputDiv,
          titleInputDiv,
        }}
      />
    </>
  );
};

const Popup = ({ note, props }) => {
  return Object.keys(note).length === 0 ? null : (
    <PopupContainer key={note._id} {...props} />
  );
};

const PopupContainer = ({
  note,
  handleUpdate,
  hideModal,
  contentInputDiv,
  titleInputDiv,
}) => {
  const [showShadow, setShowShadow] = useState(false);
  const updateBtnRef = useRef(null);

  const handleSubmitForm = () => {
    console.log("Handle update new");
  };

  const handleUpdateNew = () => {
    console.log("Handle update new");
  };

  return (
    <PopupContainerStyled className="popup-container">
      <PopupInnerContainer>
        <ContentContainer
          contentInputDiv={contentInputDiv}
          titleInputDiv={titleInputDiv}
          setShowShadow={setShowShadow}
          {...note}
          handleSubmitForm={handleSubmitForm}
          updateBtnRef={updateBtnRef}
          hideModal={hideModal}
        />
        <ControlWrapper
          handleUpdate={handleUpdate}
          hideModal={hideModal}
          showShadow={showShadow}
          handleUpdateNew={handleUpdateNew}
          updateBtnRef={updateBtnRef}
        />
      </PopupInnerContainer>
    </PopupContainerStyled>
  );
};

const ContentContainer = ({
  title,
  content,
  images,
  contentInputDiv,
  titleInputDiv,
  setShowShadow,
  handleSubmitForm,
  updateBtnRef,
  hideModal,
}) => {
  const scrollHandler = (e) => {
    if (e.target.scrollTop >= e.target.scrollHeight - e.target.clientHeight) {
      console.log("User has scrolled to the bottom!");
      setShowShadow(true);
    } else {
      setShowShadow(false);
    }
  };

  return (
    <div
      onScroll={scrollHandler}
      style={{ overflowY: "scroll", maxHeight: "400px" }}
    >
      <div>
        <UpdateFormContainer
          images={images}
          updatable={true}
          fromPopup="from popup"
          title={title}
          content={content}
          handleSubmitForm={handleSubmitForm}
          updateBtnRef={updateBtnRef}
          hideModal={hideModal}
        />
        <UpdateFormImageContainer
          images={images}
          updatable={true}
          fromPopup="from popup"
        />
        <div>
          <StyledTitleDiv>
            <div {...titleInputDiv.props}>{parse(title)}</div>
          </StyledTitleDiv>
        </div>
        <div>
          <StyledContentDiv>
            <div {...contentInputDiv.props}>{parse(content)}</div>
          </StyledContentDiv>
        </div>
        <StyledFooter>
          <div style={{ margin: "6px 6px 0 0" }}>Edited 00:00</div>
        </StyledFooter>
      </div>
    </div>
  );
};

const ControlWrapper = ({
  handleUpdate,
  handleUpdateNew,
  hideModal,
  showShadow,
  updateBtnRef,
}) => {
  return (
    <ControlsContainerStyled className="controls" showShadow={showShadow}>
      <Widgets />
      <div style={{ display: "flex" }}>
        <UpdateButton
          handleUpdate={handleUpdate}
          handleUpdateNew={handleUpdateNew}
          updateBtnRef={updateBtnRef}
        />
        <CloseButton hideModal={hideModal} />
      </div>
    </ControlsContainerStyled>
  );
};

const Widgets = () => {
  return (
    <div className="controllls widgets">
      <div className="image-uploader"></div>
    </div>
  );
};

const UpdateButton = ({ handleUpdate, handleUpdateNew, updateBtnRef }) => {
  const hanleClick = () => {
    updateBtnRef.current.click();
  };

  return (
    <StyledButton onClick={hanleClick} style={{ margin: 0 }}>
      Update
    </StyledButton>
  );
};

const CloseButton = ({ hideModal }) => {
  return <StyledButton onClick={hideModal}>Close</StyledButton>;
};

export default NotePopup;
