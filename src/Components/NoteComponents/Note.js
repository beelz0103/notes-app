import { useState, useEffect, useRef, createContext, useContext } from "react";
import parse from "html-react-parser";

import styled from "styled-components";
import { StyledButton } from "../StyledComponents/StyledPopupComponents";

import {
  TitleDiv,
  ContentDiv,
  NoteContentInfo,
} from "../StyledComponents/StyledComponents";
import Footer from "./Footer";

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
import Controls from "./Controls";

const NoteContext = createContext(null);

const NoteOuterContiner = ({ note, showModal, showNote }) => {
  const { labels } = useContext(ContainerContext);
  const [widgetVisible, setWidgetVisible] = useState(false);
  const [optionsClicked, setOptionsClicked] = useState(false);

  const noteContainerRef = useRef(null);

  const { updateNoteLabels, noteLabels } = useNoteLabels(note);

  const labelList = useGetLabelList(labels, noteLabels);

  const handleClick = (e) => {
    showModal(note);
  };

  const handleMouseEnter = () => {
    setWidgetVisible(true);
  };

  const handleMouseLeave = () => {
    if (!optionsClicked) setWidgetVisible(false);
  };

  return (
    <NoteContext.Provider
      value={{
        note,
        noteContainerRef,
        updateNoteLabels,
        labelList,
        widgetVisible,
        setOptionsClicked,
        noteLabels,
      }}
    >
      <StyledNoteOuterContainer
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        showNote={showNote}
      >
        <NoteInnerContainer ref={noteContainerRef}>
          <ContentCotainer {...note} />
          <Controls
            containerRef={noteContainerRef}
            type="note"
            labelList={labelList}
            show={widgetVisible}
          />
        </NoteInnerContainer>
      </StyledNoteOuterContainer>
    </NoteContext.Provider>
  );
};

const ContentCotainer = ({ title, content, images, _id }) => {
  const { labelList } = useContext(NoteContext);

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
        <Footer labelList={labelList} />
      </NoteContentInfo>
    </NoteContentContainer>
  );
};

export default NoteOuterContiner;
export { NoteContext };
