import { useState, useEffect, memo, useCallback, useRef } from "react";
import styled from "styled-components";
import TestChild from "./TestChild";

import { LabelForForm } from "./Components/NoteComponents/Label";

const Test = () => {
  return (
    <div>
      <TestChild></TestChild>
    </div>
  );
};

export default Test;
