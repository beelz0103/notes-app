import { useContext, useEffect, useRef, useState } from "react";

import { StyledButton } from "../StyledComponents/StyledComponents";
import {
  PopupContainerStyled,
  PopupInnerContainer,
} from "../StyledComponents/StyledPopupComponents";

import { Modal } from "../StyledComponents/Modal";

import { ControlsContainerStyled } from "../StyledComponents/StyledPopupComponents";

import UpdateFormContainer from "../UpdateFormContainer";

import { NoteContainerContext } from "./NotesContainer";
import styled from "styled-components";

import {
  StyledFooterWrapper,
  LastUpdated,
} from "../StyledComponents/StyledPopupComponents";

const NotePopup = ({ display, popupNote, updateNote, hideModal }) => {
  const { showPopup } = useContext(NoteContainerContext);

  return (
    <>
      <Modal
        style={{ display: display }}
        display={display}
        onClick={hideModal}
      ></Modal>
      <Popup note={popupNote} hideModal={hideModal} updateNote={updateNote} />
    </>
  );
};

const Popup = ({ note, hideModal, updateNote }) => {
  const [maxHeight, setMaxHeight] = useState("");

  return Object.keys(note).length === 0 ? null : (
    <PopupContainer
      maxHeight={maxHeight}
      setMaxHeight={setMaxHeight}
      note={note}
      hideModal={hideModal}
      updateNote={updateNote}
    />
  );
};

const PopupContainer = ({
  note,
  hideModal,
  updateNote,
  maxHeight,
  setMaxHeight,
}) => {
  const [showShadow, setShowShadow] = useState(false);
  const updateBtnRef = useRef(null);
  const uploadBtnRef = useRef(null);
  const [minWidth, setMinWidth] = useState("600px");
  const [top, setTop] = useState("");
  const [bottom, setBottom] = useState("");
  const divRef = useRef(null);

  useEffect(() => {
    const changeWidth = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerWidth;
      if (windowWidth <= 632) {
        setMinWidth(windowWidth - 32 + "px");
      } else {
        setMinWidth(600 + "px");
      }
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  useEffect(() => {
    const divRefCurrent = divRef.current;
    let divHeight, windowHeight, maxFullHeight, currentMaxHeight, newTop;

    const observer = new ResizeObserver((entries) => {
      divHeight = entries[0].contentRect.height;
      windowHeight = window.innerHeight;
      maxFullHeight = windowHeight - 80;

      if (divHeight >= maxFullHeight - 37 + 18) {
        currentMaxHeight = maxFullHeight - 46;
      } else if (divHeight === maxFullHeight - 37 + 18 - 1) {
        currentMaxHeight = maxFullHeight - 46 - 0.25;
      } else if (divHeight < maxFullHeight - 37 + 18 - 1) {
        currentMaxHeight =
          maxFullHeight -
          46 -
          0.25 -
          (maxFullHeight - 37 + 18 - 1 - divHeight) * 0.275;
      }

      if (currentMaxHeight >= 100 && currentMaxHeight <= 800) {
        setMaxHeight(currentMaxHeight);
        newTop = windowHeight - currentMaxHeight - 80 - 16 + "px";
        setTop(newTop);
        console.log(currentMaxHeight);
      } else if (currentMaxHeight < 100) {
        setMaxHeight(100);
        if (windowHeight - 100 - 80 - 16 >= 30) {
          newTop = windowHeight - 100 - 80 - 16 + "px";
          setTop(newTop);
          console.log(newTop);
        } else {
          setTop("30px");
          console.log("30px");
        }
      } else if (currentMaxHeight > 800) {
        setMaxHeight(800);
        newTop = windowHeight - currentMaxHeight - 80 - 16 + "px";
        setTop(newTop);
        console.log(newTop);
      }
    });

    const windowResize = () => {
      setMaxHeight(currentMaxHeight);
      setTop(newTop);
      setMaxHeight("");
    };

    window.addEventListener("resize", windowResize);

    observer.observe(divRef.current);

    return () => {
      observer.unobserve(divRefCurrent);
      window.removeEventListener("resize", windowResize);
    };
  }, [maxHeight]);

  return (
    <PopupMain topProp={top} bottomProp={bottom} ref={divRef}>
      <PopupContainerStyled className="popup-container" widthProp={minWidth}>
        <PopupInnerContainer>
          <ContentContainer
            setShowShadow={setShowShadow}
            note={note}
            hideModal={hideModal}
            updateBtnRef={updateBtnRef}
            updateNote={updateNote}
            uploadBtnRef={uploadBtnRef}
            maxHeight={maxHeight}
            setTop={setTop}
            setBottom={setBottom}
          />

          <ControlWrapper
            hideModal={hideModal}
            showShadow={showShadow}
            updateBtnRef={updateBtnRef}
            uploadBtnRef={uploadBtnRef}
          />
        </PopupInnerContainer>
      </PopupContainerStyled>
    </PopupMain>
  );
};

const Footer = () => {
  return (
    <StyledFooterWrapper showFooter={true}>
      <LastUpdated>Edited yesterday, 17:57</LastUpdated>
    </StyledFooterWrapper>
  );
};

const PopupMain = styled.div`
  /* set these dynamically
  left: 128.5px;
  top: 30px; */

  top: ${(props) => props.topProp};

  /* display: none; this is used when hidden*/

  /* opacity: 1; this is used for animation*/

  display: flex;

  box-sizing: border-box;

  transition: top 0.13s;

  background-color: transparent;
  border: none;
  box-shadow: none;
  /* opacity: 0; this is used for animation*/
  padding: 16px 0;
  position: fixed;
  z-index: 10;

  outline: 0;
  border-radius: 5px;

  left: 50%;
  transform: translateX(-50%);
`;

const ContentContainer = ({
  setShowShadow,
  updateBtnRef,
  hideModal,
  note,
  updateNote,
  uploadBtnRef,
  maxHeight,
  setTop,
  setBottom,
}) => {
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
      console.log("User has scrolled to the bottom!");
      setShowShadow(true);
    } else {
      setShowShadow(false);
    }
  };

  return (
    <div
      className="notepopupcontainer"
      ref={divRef}
      onScroll={scrollHandler}
      style={{
        overflowY: overflow ? "scroll" : "",
        maxHeight: maxHeight + "px",
      }}
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
      <Footer />
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
