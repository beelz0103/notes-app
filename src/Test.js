import { useState, useEffect, memo, useCallback, useRef } from "react";
import styled from "styled-components";
import TestChild from "./TestChild";

import { LabelForForm } from "./Components/NoteComponents/Label";
import bg from "./Components/Resources/video_light_0609.svg";

function Test() {
  return <PopupContainer></PopupContainer>;
}

const PopupContainer = styled.div`
  margin: 20px;
  min-width: 600px;

  height: 200px;

  position: fixed;

  background-color: gray;
`;

export default Test;
