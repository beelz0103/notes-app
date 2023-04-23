import { useContext, createContext, useRef } from "react";
import styled from "styled-components";
import { NoteContext } from "./Note";
import threedot from "../Resources/threedot.svg";
import image from "../Resources/image.svg";
import NoteOptions from "./NoteOptions";
import { StyledButton } from "../StyledComponents/StyledPopupComponents";
import { PopupContext } from "./NotePopup";

const ControlsContext = createContext(null);

export { ControlsContext };

const Controls = ({
  containerRef,
  type,
  uploadBtnRef,
  updateBtnRef,
  handleSubmit,
  labelList,
  setLabelList,
  hideModal,
  handleDelete,
  show,
  showShadow,
}) => {
  return (
    <ControlsContext.Provider
      value={{
        containerRef,
        type,
        uploadBtnRef,
        handleSubmit,
        labelList,
        setLabelList,
        updateBtnRef,
        hideModal,
        show,
        handleDelete,
        showShadow,
      }}
    >
      <ControlWrapper />
    </ControlsContext.Provider>
  );
};

const ControlWrapper = () => {
  const { show, showShadow } = useContext(ControlsContext);

  return (
    <ControlsContainerStyled show={show} showShadow={showShadow}>
      <Widgets />
      <Buttons />
    </ControlsContainerStyled>
  );
};

const Buttons = () => {
  const { type } = useContext(ControlsContext);

  if (type === "note") return null;
  if (type !== "notepopup") return <AddButton />;

  return (
    <div style={{ display: "flex" }}>
      <UpdateButton />
      <CloseButton />
    </div>
  );
};

const Widgets = () => {
  return (
    <StyledWidgetWrapper>
      <NoteUploadContainer />
      <NoteOptionsIconContainer />
    </StyledWidgetWrapper>
  );
};

const NoteUploadContainer = () => {
  const { uploadBtnRef, type } = useContext(ControlsContext);
  const handleClick = () => {
    uploadBtnRef.current.click();
  };
  return type === "note" ? null : (
    <StyledControlsIcons
      onClick={handleClick}
      show={true}
      img={image}
    ></StyledControlsIcons>
  );
};

const NoteOptionsIconContainer = () => {
  const iconRef = useRef(null);
  const optionButtonRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();
    optionButtonRef.current.click();
  };
  const { containerRef, type, labelList, setLabelList, show, handleDelete } =
    useContext(ControlsContext);

  return (
    <>
      <StyledControlsIcons
        show={show}
        ref={iconRef}
        img={threedot}
        onClick={handleClick}
      ></StyledControlsIcons>
      <NoteOptions
        handleDelete={handleDelete}
        containerRef={containerRef}
        iconRef={iconRef}
        optionButtonRef={optionButtonRef}
        isNote={type === "note"}
        labelList={labelList}
        setLabelList={setLabelList}
      />
    </>
  );
};

const UpdateButton = () => {
  const { updateBtnRef } = useContext(ControlsContext);
  const handleClick = () => {
    updateBtnRef.current.click();
  };

  return (
    <StyledButton onClick={handleClick} style={{ margin: 0 }}>
      Update
    </StyledButton>
  );
};

const CloseButton = () => {
  const { hideModal } = useContext(ControlsContext);

  const handleClick = () => {
    hideModal();
  };

  return <StyledButton onClick={handleClick}>Close</StyledButton>;
};

const AddButton = () => {
  const { handleSubmit } = useContext(ControlsContext);

  return (
    <StyledButton onClick={handleSubmit} style={{ marginRight: "16px" }}>
      Add
    </StyledButton>
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
  flex-wrap: wrap;

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

export default Controls;
