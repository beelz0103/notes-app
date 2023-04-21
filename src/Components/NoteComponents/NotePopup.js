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
import { usePopupHeight, usePopupWidth } from "../Hooks/usePopupChange";

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
  const [showShadow, setShowShadow] = useState(false);

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
          type: "notepopup",
          showShadow,
          setShowShadow,
        }}
      >
        <Popup />
      </PopupContext.Provider>
    </>
  );
};

const Popup = () => {
  const { note } = useContext(PopupContext);

  return Object.keys(note).length === 0 ? null : <PopupWrapper />;
};

const PopupWrapper = () => {
  const minWidth = usePopupWidth();
  const { maxHeight, contentContainerRef, top } = usePopupHeight();

  const {
    popupRef,
    labelList,
    noteLabels,
    note,
    hideModal,
    updateBtnRef,
    uploadBtnRef,
    setLabelList,
    type,
    showShadow,
  } = useContext(PopupContext);

  return (
    <PopupContainer topProp={top} ref={contentContainerRef}>
      <PopupSubContainer ref={popupRef} widthProp={minWidth}>
        <ContentOuterContainer>
          <ContentContainerWrapper maxHeight={maxHeight} />
          <Controls
            containerRef={popupRef}
            type={type}
            labelList={labelList}
            setLabelList={setLabelList}
            updateBtnRef={updateBtnRef}
            uploadBtnRef={uploadBtnRef}
            hideModal={hideModal}
            show={true}
            showShadow={showShadow}
          />
        </ContentOuterContainer>
      </PopupSubContainer>
    </PopupContainer>
  );
};

const ContentContainerWrapper = ({ maxHeight }) => {
  const { labelList, noteLabels, note, type, setShowShadow } =
    useContext(PopupContext);

  const divRef = useRef(null);
  const [overflow, setOverflow] = useState(true);

  useEffect(() => {
    const divRefCurrent = divRef.current;

    const observer = new ResizeObserver((entries) => {
      const divHeight = entries[0].contentRect.height;
      if (divHeight === maxHeight) {
        setOverflow(true);
      } else {
        setOverflow(false);
      }
    });

    observer.observe(divRefCurrent);
  }, [maxHeight]);

  const scrollHandler = (e) => {
    if (e.target.scrollTop >= e.target.scrollHeight - e.target.clientHeight) {
      setShowShadow(true);
    } else {
      setShowShadow(false);
    }
  };

  return (
    <ContentContainer
      heightProp={maxHeight}
      ref={divRef}
      onScroll={scrollHandler}
      maxHeight={maxHeight}
      style={{
        overflowY: overflow ? "scroll" : "",
      }}
    >
      <UpdateFormContainer labelList={labelList} />
      <Footer
        labelList={labelList}
        noteLabels={noteLabels}
        note={note}
        type={type}
      />
    </ContentContainer>
  );
};

export default NotePopup;
