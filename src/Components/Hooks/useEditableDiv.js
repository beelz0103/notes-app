import { useState, useEffect, useRef } from "react";

const useEditableDiv = () => {
  const [value, setValue] = useState("Test");
  const ref = useRef(null);

  const handleOnInput = (event) => {
    console.log(event.target.textContent.trim() === "");
    setValue(event.target.innerHTML);
  };

  const handleOnBlur = (event) => {
    console.log(event.target.textContent.trim() === "");
    setValue(event.target.innerHTML);
  };

  const resetValue = () => {
    setValue("");
    ref.current.textContent = "";
  };

  const props = {
    ref: ref,
    onInput: handleOnInput,
    onBlur: handleOnBlur,
    className: "editable-div",
    role: "textbox",
    contentEditable: true,
    "data-placeholder": "Take a note",
    suppressContentEditableWarning: true,
  };

  return { value, props, resetValue };
};

export default useEditableDiv;
