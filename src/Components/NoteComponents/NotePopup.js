import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Modal } from "../StyledComponents/Modal";
import Controls from "./Controls";
import {
  PopupContainer,
  PopupSubContainer,
  ContentInput,
  ContentOuterContainer,
  ContentContainer,
  TitleInputContainer,
  TitleInput,
  ContentInputContainer,
} from "../StyledComponents/NotePopup";
import Footer from "./Footer";
import { ContainerContext } from "../Container";
import { useNoteLabels, useGetLabelList } from "../Hooks/useLabels";
import UpdateFormContainer from "../UpdateFormContainer";

const PopupContext = createContext(null);

export { PopupContext };

const NotePopup = ({ display, popupNote, updateNote, hideModal }) => {
  const popupRef = useRef(null);
  const { labels } = useContext(ContainerContext);
  const { updateNoteLabels, noteLabels } = useNoteLabels(popupNote);
  const labelList = useGetLabelList(labels, noteLabels);

  return (
    <>
      <Modal
        style={{ display: display }}
        display={display}
        onClick={hideModal}
      ></Modal>
      <PopupContext.Provider
        value={{
          popupRef,
          labelList,
          updateNoteLabels,
          labels,
          noteLabels,
          note: popupNote,
          hideModal,
          updateNote,
        }}
      >
        <Popup />
      </PopupContext.Provider>
    </>
  );
};

const Popup = () => {
  const { popupRef, labelList, noteLabels, note, hideModal, updateNote } =
    useContext(PopupContext);
  return Object.keys(note).length === 0 ? null : (
    <PopupContainer ref={popupRef}>
      <PopupSubContainer>
        <ContentOuterContainer>
          <ContentContainer>
            <UpdateFormContainer note={note} />
            <Footer labelList={labelList} noteLabels={noteLabels} />
          </ContentContainer>
          <Controls containerRef={popupRef} type="notepopup" />
        </ContentOuterContainer>
      </PopupSubContainer>
    </PopupContainer>
  );
};
export default NotePopup;
