import { useState, useEffect, useRef } from "react";
import parse from "html-react-parser";
import useFileInput from "../Hooks/useFileInput";
import useEditableDiv from "../Hooks/useEditableDiv";
import FileInput from "../FormComponents/FileInput";
import DivInput from "../FormComponents/DivInput";
import styled from "styled-components";
import { StyledButton } from "../StyledComponents/StyledPopupComponents";

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
  StyledNoteOuterContainerExpanded,
} from "../StyledComponents/StyledComponents";
import NoteImageContainer from "../FormComponents/NoteImageContainer";

const NoteOuterContiner = ({ note, showModal, normalDisplay }) => {
  const ref = useRef(null);
  const clickHandler = () => {
    showModal(note);
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
  return <ControlWrapper />;
};

const ControlsContainerStyled = styled.div`
  margin: 4px 0;
  display: flex;
  justify-content: space-between;

  box-shadow: ${(props) =>
    props.showShadow ? "0 -2px 5px rgba(0,0,0,.2)" : "none"};
`;

const ControlWrapper = ({}) => {
  return (
    <ControlsContainerStyled>
      <Widgets />
      <div style={{ display: "flex" }}>
        <UpdateButton />
        <CloseButton />
      </div>
    </ControlsContainerStyled>
  );
};

const Widgets = ({}) => {
  return (
    <div className="controllls widgets">
      <div className="image-uploader"></div>
      <div className="image-uploader"></div>
    </div>
  );
};

const UpdateButton = ({}) => {
  const handleClick = () => {};

  return (
    <StyledButton onClick={handleClick} style={{ margin: 0 }}>
      Update
    </StyledButton>
  );
};

const CloseButton = ({}) => {
  return <StyledButton>Close</StyledButton>;
};

export default NoteOuterContiner;
