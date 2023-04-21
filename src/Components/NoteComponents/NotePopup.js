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
import { StyledButton } from "../StyledComponents/StyledPopupComponents";
import { useUpdateFormGetLabelList } from "../Hooks/useLabels";

const PopupContext = createContext(null);

export { PopupContext };

const NotePopup = ({ display, popupNote, updateNote, hideModal }) => {
  const popupRef = useRef(null);
  const { labels } = useContext(ContainerContext);
  const { updateNoteLabels, noteLabels } = useNoteLabels(popupNote);

  const { labelList, setLabelList } = useUpdateFormGetLabelList(
    labels,
    noteLabels
  );

  const updateBtnRef = useRef(null);
  const uploadBtnRef = useRef(null);

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
          updateBtnRef,
          uploadBtnRef,
          setLabelList,
        }}
      >
        <Popup />
      </PopupContext.Provider>
    </>
  );
};

const Popup = () => {
  const {
    popupRef,
    labelList,
    noteLabels,
    note,
    hideModal,
    updateBtnRef,
    uploadBtnRef,
    setLabelList,
  } = useContext(PopupContext);
  return Object.keys(note).length === 0 ? null : (
    <PopupContainer>
      <PopupSubContainer ref={popupRef}>
        <ContentOuterContainer>
          <ContentContainer>
            <UpdateFormContainer labelList={labelList} />
            <Footer labelList={labelList} noteLabels={noteLabels} />
          </ContentContainer>
          <Controls
            containerRef={popupRef}
            type="notepopup"
            labelList={labelList}
            setLabelList={setLabelList}
            updateBtnRef={updateBtnRef}
            uploadBtnRef={uploadBtnRef}
            hideModal={hideModal}
            show={true}
          />
        </ContentOuterContainer>
      </PopupSubContainer>
    </PopupContainer>
  );
};

export default NotePopup;
