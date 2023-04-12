import { useState, useEffect, useRef } from "react";
import parse from "html-react-parser";
import useFileInput from "../Hooks/useFileInput";
import useEditableDiv from "../Hooks/useEditableDiv";
import FileInput from "../FormComponents/FileInput";
import DivInput from "../FormComponents/DivInput";

import {
  StyledNoteOuterContainer,
  NoteInnerContainer,
  NoteContentContainer,
  NoteControlsSubContainer,
  NoteControlsMainContainer,
  NoteContentImageContainer,
  NoteContentInfo,
  TitleDiv,
  ContentDiv,
  FooterDiv,
  StyledButton,
  StyledNoteOuterContainerExpanded,
} from "../StyledComponents/StyledComponents";
import NoteImageContainer from "../FormComponents/NoteImageContainer";
import { Modal } from "../StyledComponents/Modal";

const NoteOuterContiner = ({ note, showModal, normalDisplay }) => {
  const ref = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [prevClassName, setPrev] = useState(null);
  const clickHandler = () => {
    showModal(note, setClicked);
    if (!clicked) {
      setClicked(true);
      setPrev(ref.current.className);
      ref.current.className = ref.current.className; //+ " note-pop-up";
    } else {
      setClicked(false);
      ref.current.className = prevClassName;
    }
  };

  return (
    <StyledNoteOuterContainer ref={ref} onClick={clickHandler}>
      <NoteInnerContainer>
        <ContentCotainer {...note} />
        <Controls />
      </NoteInnerContainer>
    </StyledNoteOuterContainer>
  );
};

const ContentCotainer = ({ title, content, images, _id }) => {
  return (
    <NoteContentContainer>
      <NoteContentImageContainer>
        <NoteImageContainer images={images} />
      </NoteContentImageContainer>
      <NoteContentInfo>
        <div>
          {title === "" ? (
            <div style={{ padding: "0 0 12px 0" }}></div>
          ) : (
            <TitleDiv>{parse(title)}</TitleDiv>
          )}
        </div>
        <div>
          {content === "" ? (
            <div style={{ padding: "0 0 12px 0" }}></div>
          ) : (
            <ContentDiv>{parse(content)}</ContentDiv>
          )}
        </div>
        <FooterDiv></FooterDiv>
      </NoteContentInfo>
    </NoteContentContainer>
  );
};

const Controls = () => {
  return (
    <NoteControlsMainContainer>
      <NoteControlsSubContainer>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></div>
      </NoteControlsSubContainer>
    </NoteControlsMainContainer>
  );
};

const NoteExpandedConatiner = ({ note, updateNote, hideModal }) => {
  const ref = useRef(null);
  const contentInputDiv = useEditableDiv("content", note.content);
  const titleInputDiv = useEditableDiv("title", note.title);
  const before = note;

  const handleUpdate = () => {
    if (titleInputDiv.empty || contentInputDiv.empty) {
      console.log("input fields cant be empty"); //I dont want to implement input errors now
      return;
    }

    if (
      titleInputDiv.value === before.title &&
      contentInputDiv.value === before.content
    ) {
      console.log("updatedddddddddddddddddd");
      return;
    }

    hideModal("none");

    updateNote(
      {
        title: titleInputDiv.value,
        content: contentInputDiv.value,
        images: note.images,
      },
      note._id
    );
  };

  return (
    <StyledNoteOuterContainerExpanded
      style={{
        maxHeight: "400px",
        overflow: "scroll",
      }}
      $show
      ref={ref}
    >
      <NoteInnerContainer>
        <ContentCotainerExp
          contentInputDiv={contentInputDiv}
          titleInputDiv={titleInputDiv}
          {...note}
        />
        <ControlsExpanded handleUpdate={handleUpdate} />
      </NoteInnerContainer>
    </StyledNoteOuterContainerExpanded>
  );
};

const ControlsExpanded = ({ handleUpdate }) => {
  return (
    <NoteControlsMainContainer>
      <Controlllls />
      <div style={{ display: "flex" }}>
        <UpdateButton handleUpdate={handleUpdate} />
        <CloseButton />
      </div>
    </NoteControlsMainContainer>
  );
};

const Controlllls = () => {
  const styles = {};

  return (
    <div className="controllls">
      <div></div>
    </div>
  );
};

const UpdateButton = ({ handleUpdate }) => {
  const clickHandler = () => {
    handleUpdate();
  };

  return (
    <StyledButton onClick={clickHandler} style={{ margin: 0 }}>
      Update
    </StyledButton>
  );
};

const CloseButton = () => {
  const styles = {
    boxSizing: "border-box",
    color: "rgba(0,0,0,.87)",
    letterSpacing: ".01785714em",
    fontSize: ".875rem",
    fontWeight: "500",
    lineHeight: "1.25rem",
    height: "36px",
    padding: "8px 24px",
    borderRadius: "4px",
  };

  return <StyledButton>Close</StyledButton>;
};

const ContentCotainerExp = ({
  title,
  content,
  images,
  _id,
  contentInputDiv,
  titleInputDiv,
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
  };

  return (
    <div>
      <NoteContentImageContainer>
        <NoteImageContainer images={images} />
      </NoteContentImageContainer>
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
        <div className="footer-div" style={footerStyles}>
          <div style={{ margin: "6px 6px 0 0" }}>Edited 00:00</div>
        </div>
      </div>
    </div>
  );
};

export default NoteOuterContiner;
