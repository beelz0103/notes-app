import { useRef, useState } from "react";

import { StyledButton } from "../StyledComponents/StyledComponents";
import {
  PopupContainerStyled,
  PopupInnerContainer,
} from "../StyledComponents/StyledPopupComponents";

import { Modal } from "../StyledComponents/Modal";

import { ControlsContainerStyled } from "../StyledComponents/StyledPopupComponents";

import UpdateFormContainer from "../UpdateFormContainer";

const NotePopup = ({ display, popupNote, updateNote, hideModal }) => {
  return (
    <>
      <Modal style={{ display: display }} onClick={hideModal}></Modal>
      <Popup note={popupNote} hideModal={hideModal} updateNote={updateNote} />
    </>
  );
};

const Popup = ({ note, hideModal, updateNote }) => {
  return Object.keys(note).length === 0 ? null : (
    <PopupContainer note={note} hideModal={hideModal} updateNote={updateNote} />
  );
};

const PopupContainer = ({ note, hideModal, updateNote }) => {
  const [showShadow, setShowShadow] = useState(false);
  const updateBtnRef = useRef(null);
  const uploadBtnRef = useRef(null);

  return (
    <PopupContainerStyled className="popup-container">
      <PopupInnerContainer>
        <ContentContainer
          setShowShadow={setShowShadow}
          note={note}
          hideModal={hideModal}
          updateBtnRef={updateBtnRef}
          updateNote={updateNote}
          uploadBtnRef={uploadBtnRef}
        />
        <ControlWrapper
          hideModal={hideModal}
          showShadow={showShadow}
          updateBtnRef={updateBtnRef}
          uploadBtnRef={uploadBtnRef}
        />
      </PopupInnerContainer>
    </PopupContainerStyled>
  );
};

const ContentContainer = ({
  setShowShadow,
  updateBtnRef,
  hideModal,
  note,
  updateNote,
  uploadBtnRef,
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
          updateBtnRef={updateBtnRef}
          hideModal={hideModal}
          note={note}
          updateNote={updateNote}
          uploadBtnRef={uploadBtnRef}
        />
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
  uploadBtnRef,
}) => {
  return (
    <ControlsContainerStyled className="controls" showShadow={showShadow}>
      <Widgets uploadBtnRef={uploadBtnRef} />
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

const Widgets = ({ uploadBtnRef }) => {
  return (
    <div className="controllls widgets">
      <div
        className="image-uploader"
        onClick={() => uploadBtnRef.current.click()}
      ></div>
    </div>
  );
};

const UpdateButton = ({ updateBtnRef }) => {
  const handleClick = () => {
    updateBtnRef.current.click();
  };

  return (
    <StyledButton onClick={handleClick} style={{ margin: 0 }}>
      Update
    </StyledButton>
  );
};

const CloseButton = ({ hideModal }) => {
  return <StyledButton onClick={hideModal}>Close</StyledButton>;
};

export default NotePopup;
