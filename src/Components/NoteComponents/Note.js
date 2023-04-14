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

const NoteOuterContiner = ({ note, showModal, normalDisplay }) => {
  const ref = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [prevClassName, setPrev] = useState(null);
  const clickHandler = () => {
    showModal(note);
    // if (!clicked) {
    //   setClicked(true);
    //   setPrev(ref.current.className);
    //   ref.current.className = ref.current.className; //+ " note-pop-up";
    // } else {
    //   setClicked(false);
    //   ref.current.className = prevClassName;
    // }
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

export default NoteOuterContiner;
