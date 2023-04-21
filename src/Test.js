import { useState, useEffect, memo, useCallback, useRef } from "react";
import styled from "styled-components";
import TestChild from "./TestChild";

import { LabelForForm } from "./Components/NoteComponents/Label";
import bg from "./Components/Resources/video_light_0609.svg";

function Test() {
  return (
    <PopupContainer>
      <StyledDiv></StyledDiv>
    </PopupContainer>
  );
}

const StyledDiv = styled.div`
  height: 200px;
  width: 100px;
  background-color: darkcyan;
  position: absolute;
  top: 200px;
`;

const PopupContainer = styled.div`
  margin: 20px;
  min-width: 600px;
  height: 200px;
  position: fixed;
  background-color: gray;
`;

export default Test;
