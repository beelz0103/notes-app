import { useState } from "react";
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

import { StyledFooter } from "../StyledComponents/StyledPopupComponents";

import UpdateFormImageContainer from "../FormComponents/UpdateFormImageContainer";

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

  return (
    <PopupContainerStyled className="popup-container">
      <PopupInnerContainer>
        <ContentContainer
          contentInputDiv={contentInputDiv}
          titleInputDiv={titleInputDiv}
          setShowShadow={setShowShadow}
          {...note}
        />
        <ControlWrapper
          handleUpdate={handleUpdate}
          hideModal={hideModal}
          showShadow={showShadow}
        />
      </PopupInnerContainer>
    </PopupContainerStyled>
  );
};

const ContentContainer = ({
  title,
  content,
  images,
  _id,
  contentInputDiv,
  titleInputDiv,
  setShowShadow,
}) => {
  const allStyles = {
    width: "100%",
    outline: "none",
    minHeight: "100%",
    boxSizing: "border-box",
    letterSpacing: "0.00625em",
    fontSize: "1.375rem",
    lineHeight: "1.75rem",
    fontWeight: "400",
  };

  const contentStyles = {
    letterSpacing: "0.00625em",
    fontSize: "1rem",
    lineHeight: "1.5rem",
    fontWeight: "400",
    padding: "12px 16px 12px 16px",
  };

  const titleStyles = {
    padding: "16px 15px 12px 15px",
  };

  const footerStyles = {
    padding: "5px 10px",
    display: "flex",
    justifyContent: "flex-end",
    letterSpacing: "0.025em",
    fontSize: "0.75rem",
    lineHeight: "1rem",
    fontWeight: "400",
    color: "rgba(0,0,0,0.8)",
    boxShadow: "0 -2px 5px rgba(0,0,0,.2)", //use this later
  };

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
      <UpdateFormImageContainer
        images={images}
        updatable={true}
        fromPopup="from popup"
      />
      <div style={allStyles}>
        <div>
          <div style={titleStyles}>
            <div {...titleInputDiv.props}>{parse(title)}</div>
          </div>
        </div>
        <div>
          <div style={contentStyles}>
            <div {...contentInputDiv.props}>{parse(content)}</div>
          </div>
        </div>
        <StyledFooter>
          <div style={{ margin: "6px 6px 0 0" }}>Edited 00:00</div>
        </StyledFooter>
      </div>
    </div>
  );
};

const ControlWrapper = ({ handleUpdate, hideModal, showShadow }) => {
  return (
    <ControlsContainerStyled className="controls" showShadow={showShadow}>
      <Widgets />
      <div style={{ display: "flex" }}>
        <UpdateButton handleUpdate={handleUpdate} />
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

const UpdateButton = ({ handleUpdate }) => {
  return (
    <StyledButton onClick={handleUpdate} style={{ margin: 0 }}>
      Update
    </StyledButton>
  );
};

const CloseButton = ({ hideModal }) => {
  return <StyledButton onClick={hideModal}>Close</StyledButton>;
};

export default NotePopup;
