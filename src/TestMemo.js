import { useState, useEffect, memo, useCallback, useRef } from "react";
import styled from "styled-components";

import threedot from "./threedot.svg";

const TestMemo = () => {
  const buttonRef = useRef("null");

  const handleClick = () => {
    console.log("container clicked");
    console.log(buttonRef.current);
    buttonRef.current.click();
  };

  return (
    <div>
      <div onClick={handleClick}>AAAAAAAAAAAAAAAA</div>
      <Button buttonRef={buttonRef} />
    </div>
  );
};

const Button = ({ buttonRef }) => {
  const handleClick = () => {
    console.log("button clicked");
  };

  return (
    <div ref={buttonRef} onClick={handleClick} style={{ display: "none" }}>
      Button
    </div>
  );
};

export default TestMemo;
