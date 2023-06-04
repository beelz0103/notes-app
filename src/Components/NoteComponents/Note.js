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
import Checkbox from "./Checkbox";
import Pin from "./Pin";

const NoteContext = createContext(null);

const NoteOuterContiner = ({ note, showModal, showNote }) => {
  const {
    labels,
    deleteNote,
    pinNote,
    archiveNote,
    restoreNote,
    deletePermanently,
  } = useContext(ContainerContext);
  const [widgetVisible, setWidgetVisible] = useState(false);
  const [widgetVisibleLong, setWidgetVisibleLong] = useState(false);
  const [optionsClicked, setOptionsClicked] = useState(false);

  const noteContainerRef = useRef(null);

  const { updateNoteLabels, noteLabels } = useNoteLabels(note);

  const labelList = useGetLabelList(labels, noteLabels);

  const handleClick = () => {
    showModal(note);
  };

  const handleMouseEnter = () => {
    setWidgetVisible(true);
  };

  const handleMouseLeave = () => {
    if (!optionsClicked && !widgetVisibleLong) setWidgetVisible(false);
  };

  const handleDelete = () => {
    deleteNote(note, note._id);
  };

  const handlePin = () => {
    pinNote(note, note._id);
  };

  const handleArchive = () => {
    archiveNote(note, note._id);
  };

  const handlePermaDelete = () => deletePermanently(note, note._id);

  const handleRestore = () => restoreNote(note, note._id);

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
        handleDelete,
        setWidgetVisibleLong,
        setWidgetVisible,
        handlePin,
      }}
    >
      <StyledNoteOuterContainer
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        showNote={showNote}
      >
        <Checkbox />
        <NoteInnerContainer ref={noteContainerRef}>
          <ContentCotainer {...note} />
          <Controls
            note={note}
            containerRef={noteContainerRef}
            type="note"
            labelList={labelList}
            show={widgetVisible}
            handleDelete={handleDelete}
            handleRestore={handleRestore}
            handlePermaDelete={handlePermaDelete}
            setWidgetVisibleLong={setWidgetVisibleLong}
            setWidgetVisible={setWidgetVisible}
          />
        </NoteInnerContainer>
      </StyledNoteOuterContainer>
    </NoteContext.Provider>
  );
};

function strip(html) {
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText;
}

const ContentCotainer = ({ title, content, images, _id }) => {
  const { labelList, note } = useContext(NoteContext);

  return (
    <NoteContentContainer>
      <NoteContentImageContainer>
        <NoteImageContainer images={images} />
      </NoteContentImageContainer>
      <NoteContentInfo className="note-content-info">
        {!note.deleted && <Pin />}
        <div>
          {title === "" ? (
            <div style={{ padding: "0 0 12px 0" }}></div>
          ) : (
            <>
              <TitleDiv>{strip(title)}</TitleDiv>
            </>
          )}
        </div>
        <div>
          {content === "" ? (
            <div style={{ padding: "0 0 12px 0" }}></div>
          ) : (
            <>
              <ContentDiv>{parse(content)}</ContentDiv>
            </>
          )}
        </div>
        <Footer labelList={labelList} />
      </NoteContentInfo>
    </NoteContentContainer>
  );
};

export default NoteOuterContiner;
export { NoteContext };
