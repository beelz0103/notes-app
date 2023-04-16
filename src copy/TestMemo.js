import { useState, useEffect, memo, useCallback, useRef } from "react";
import styled from "styled-components";
import threedot from "./threedot.svg";
import TestMemoCopy from "./TestMemo copy 2";
import Label from "./Components/NoteComponents/Label";

const TestMemo = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "40px",
        margin: "100px",
        alignItems: "center",
      }}
    >
      <TestMemoCopy></TestMemoCopy>
      <Label></Label>
    </div>
  );
};

export default TestMemo;
