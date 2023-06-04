import styled from "styled-components";
import pin from "../Resources/pin.svg";
import { useContext, useState } from "react";
import { NoteContext } from "./Note";

const Pin = () => {
  const { widgetVisible, handlePin } = useContext(NoteContext);
  const [showPin, setShowPin] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setShowPin(!showPin);
    handlePin();
  };

  return (
    <>
      <StyledPin
        onClick={handleClick}
        widgetVisible={widgetVisible}
        showPin={showPin}
        img={pin}
      ></StyledPin>
      <StlyledPlaceholder></StlyledPlaceholder>
    </>
  );
};

const StlyledPlaceholder = styled.div`
  width: 42px;
  height: 36px;
  float: right;
`;

const StyledPin = styled.div`
  user-select: none;

  opacity: 0.54;

  -webkit-background-size: 24px 24px;
  background-size: 24px 24px;
  height: 32px;
  width: 32px;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICA8cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDB6Ii8+CiAgPHBhdGggZmlsbD0iIzAwMCIgZD0iTTE3IDR2N2wyIDN2MmgtNnY1bC0xIDEtMS0xdi01SDV2LTJsMi0zVjRjMC0xLjEuOS0yIDItMmg2YzEuMTEgMCAyIC44OSAyIDJ6TTkgNHY3Ljc1TDcuNSAxNGg5TDE1IDExLjc1VjRIOXoiLz4KPC9zdmc+Cg==);
  opacity: 0;
  right: 12px;
  top: 6px;
  -webkit-transition: opacity 0.218s ease-in;
  transition: opacity 0.218s ease-in;

  opacity: 0;
  position: absolute;

  z-index: 201;

  background-position: center;
  background-repeat: no-repeat;

  border-radius: 50%;
  border: 1px solid transparent;

  cursor: pointer;
  display: inline-block;
  outline: none !important;

  pointer-events: auto;

  opacity: ${(props) => (props.widgetVisible ? "0.54" : "0")};
  opacity: ${(props) => (props.showPin ? "0.87" : "")};
  background-color: ${(props) =>
    props.showPin ? "rgba(95, 99, 104, 0.157)" : ""};

  &:hover {
    opacity: 0.87;
    background-color: rgba(95, 99, 104, 0.157);
  }
`;

export default Pin;
