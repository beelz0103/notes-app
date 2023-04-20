import { useState, useEffect, memo, useCallback, useRef } from "react";
import styled from "styled-components";
import TestChild from "./TestChild";

import { LabelForForm } from "./Components/NoteComponents/Label";
import bg from "./Components/Resources/video_light_0609.svg";

function Test() {
  const [show, setShow] = useState(true);
  const [opacity, setOpacity] = useState(true);

  useEffect(() => {
    if (show) setOpacity(true);
  }, [show]);

  useEffect(() => {
    if (!opacity) {
      setTimeout(() => {
        setShow(false);
      }, 500);
    }
  }, [opacity]);

  const handleClick = () => {
    if (!opacity) setShow(true);
    setOpacity(false);
    //  if (show) setOpacity(false);
  };

  return (
    <>
      <NoteCont show={show} opa={opacity} onClick={handleClick}></NoteCont>
      <button
        style={{ display: show ? "none" : "block" }}
        onClick={handleClick}
      >
        Show
      </button>
    </>
  );
}

const NoteCont = styled.div`
  width: 600px;
  display: ${(props) => (props.show ? "block" : "none")};
  opacity: ${(props) => (props.opa ? "1" : "0")};
  transition-property: opacity, transform;
  margin: 16px;
  position: absolute;
  height: 180px;
  background-color: lightblue;
  box-sizing: border-box;
  box-shadow: none;
  position: relative;
  border-radius: 8px;
  transition-duration: 1s;
  transition-property: opacity;
`;

export default Test;
