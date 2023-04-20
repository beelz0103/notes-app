import { useState, useEffect, useRef, createContext, useContext } from "react";
import parse from "html-react-parser";

import styled from "styled-components";
import { StyledButton } from "../StyledComponents/StyledPopupComponents";

import {
  TitleDiv,
  ContentDiv,
  NoteContentInfo,
} from "../StyledComponents/StyledComponents";

import {
  StyledFooterWrapper,
  StyledLabelWrapper,
  LastUpdated,
  StyledLabel,
  LabelDeleteButton,
  StyledLabelButton,
} from "../StyledComponents/StyledPopupComponents";

import NoteOptions from "./NoteOptions";

import threedot from "../Resources/threedot.svg";

import {
  StyledNoteOuterContainer,
  NoteInnerContainer,
  NoteContentContainer,
  NoteContentImageContainer,
} from "../StyledComponents/StyledComponents";
import NoteImageContainer from "../FormComponents/NoteImageContainer";
import { useGetLabelList, useNoteLabels } from "../Hooks/useLabels";
import { ContainerContext } from "../Container";

const NoteContext = createContext(null);

const NoteOuterContiner = ({ note, showModal }) => {
  const { labels } = useContext(ContainerContext);
  const [visibility, setVisibility] = useState(false);
  const [optionsClicked, setOptionsClicked] = useState(false);

  const noteContainerRef = useRef(null);

  const { updateNoteLabels, noteLabels } = useNoteLabels(note);

  const labelList = useGetLabelList(labels, noteLabels);

  const handleClick = (e) => {
    showModal(note);
  };

  const handleMouseEnter = () => {
    setVisibility(true);
  };

  const handleMouseLeave = () => {
    if (!optionsClicked) setVisibility(false);
  };

  return (
    <NoteContext.Provider
      value={{
        note,
        noteContainerRef,
        updateNoteLabels,
        labelList,
        visibility,
        setOptionsClicked,
        noteLabels,
      }}
    >
      <StyledNoteOuterContainer
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <NoteInnerContainer ref={noteContainerRef}>
          <ContentCotainer {...note} />
          <Controls />
        </NoteInnerContainer>
      </StyledNoteOuterContainer>
    </NoteContext.Provider>
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
        <Footer />
      </NoteContentInfo>
    </NoteContentContainer>
  );
};

const Footer = () => {
  const { note, labelList, noteLabels } = useContext(NoteContext);

  const [showFooter, setShowFooter] = useState(false);

  console.log(labelList.some((label) => label.checked));

  useState(() => {
    console.log(note.labels.length);
    if (note.labels.length === 0) setShowFooter(false);
    else setShowFooter(true);
  }, [note]);

  return (
    <StyledFooterWrapper showFooter={showFooter}>
      {labelList.some((label) => label.checked === true)
        ? labelList
            .filter((label) => {
              return label.checked;
            })
            .map((label) => <LabelDisplay key={label.id} label={label} />)
        : null}
    </StyledFooterWrapper>
  );
};

const LabelDisplay = ({ label }) => {
  return (
    <StyledLabelWrapper>
      <StyledLabelButton>
        <StyledLabel>{label.name}</StyledLabel>
      </StyledLabelButton>
      <LabelDeleteButton></LabelDeleteButton>
    </StyledLabelWrapper>
  );
};

const Controls = () => {
  return <ControlWrapper />;
};

const ControlWrapper = () => {
  const { visibility } = useContext(NoteContext);

  return (
    <ControlsContainerStyled show={visibility}>
      <Widgets />
    </ControlsContainerStyled>
  );
};

const Widgets = () => {
  return (
    <StyledWidgetWrapper>
      <NoteOptionsIconContainer />
    </StyledWidgetWrapper>
  );
};

const NoteOptionsIconContainer = () => {
  const { noteContainerRef, visibility } = useContext(NoteContext);

  const iconRef = useRef(null);
  const optionButtonRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();
    optionButtonRef.current.click();
  };

  return (
    <>
      <StyledControlsIcons
        show={visibility}
        ref={iconRef}
        img={threedot}
        onClick={handleClick}
      ></StyledControlsIcons>
      <NoteOptions
        containerRef={noteContainerRef}
        iconRef={iconRef}
        optionButtonRef={optionButtonRef}
      />
    </>
  );
};

const ControlsContainerStyled = styled.div`
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition-duration: 0.218s;
  transition-property: opacity;
  transition-timing-function: ease-in;

  margin: 4px 0;
  display: flex;
  justify-content: space-between;

  box-shadow: ${(props) =>
    props.showShadow ? "0 -2px 5px rgba(0,0,0,.2)" : "none"};
`;

const StyledWidgetWrapper = styled.div`
  display: flex;
`;

const StyledControlsIcons = styled.div`
  width: 32px;
  height: 32px;
  margin: 0 8px;

  color: #202124;

  opacity: ${(props) => (props.show ? 0.71 : 0)};
  transition-duration: 0.218s;
  transition-property: opacity;
  transition-timing-function: ease-in;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 18px 18px;
  border-radius: 50%;
  border: 1px solid transparent;
  cursor: pointer;
  background-image: url(${(props) => props.img});

  &:hover {
    border-radius: 50%;
    background-color: gray;
    opacity: 0.87;
    background-color: rgba(95, 99, 104, 0.157);
  }
`;

export default NoteOuterContiner;
export { NoteContext };
