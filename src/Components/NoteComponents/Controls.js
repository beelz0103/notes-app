import { useContext, createContext, useRef } from "react";
import styled from "styled-components";
import { NoteContext } from "./Note";
import threedot from "../Resources/threedot.svg";
import image from "../Resources/image.svg";
import NoteOptions from "./NoteOptions";

const ControlsContext = createContext(null);

export { ControlsContext };

const Controls = ({ containerRef, type }) => {
  return (
    <ControlsContext.Provider value={{ containerRef, type }}>
      <ControlWrapper />
    </ControlsContext.Provider>
  );
};

const ControlWrapper = () => {
  return (
    <ControlsContainerStyled show={true}>
      <Widgets />
    </ControlsContainerStyled>
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
  const { containerRef, type } = useContext(ControlsContext);
  const handleUpload = () => {};
  return type !== "notepopup" ? null : (
    <StyledControlsIcons
      onClick={handleUpload}
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
  const { containerRef } = useContext(ControlsContext);

  return (
    <>
      <StyledControlsIcons
        show={true}
        ref={iconRef}
        img={threedot}
        onClick={handleClick}
      ></StyledControlsIcons>
      {/* <NoteOptions
        containerRef={containerRef}
        iconRef={iconRef}
        optionButtonRef={optionButtonRef}
      /> */}
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

export default Controls;
