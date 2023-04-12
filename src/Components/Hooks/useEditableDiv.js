import { useState, useEffect, useRef } from "react";

const useEditableDiv = (divClass, initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const [empty, setEmpty] = useState(initialValue === "" ? true : false);
  const ref = useRef(null);

  const fieldEmpty = () => {
    if (ref.current.textContent.trim() === "") {
      setEmpty(true);
      return true;
    } else {
      setEmpty(false);
      return false;
    }
  };

  const handleOnInput = () => {
    if (fieldEmpty(ref.current.textContent)) {
      setValue("");
      console.log("");
    } else {
      setValue(ref.current.innerHTML);
      console.log(ref.current.innerHTML);
    }
  };

  const handleOnBlur = () => {
    if (fieldEmpty(ref.current.textContent)) {
      setValue("");
      console.log("");
    } else {
      setValue(ref.current.innerHTML);
      console.log(ref.current.innerHTML);
    }
  };

  const resetValue = () => {
    setValue("");
    ref.current.textContent = "";
    setEmpty(true);
  };

  const props = {
    ref: ref,
    onInput: handleOnInput,
    onBlur: handleOnBlur,
    className: `editable-div ${divClass}`,
    role: "textbox",
    contentEditable: true,
    "data-placeholder": "Take a note",
    suppressContentEditableWarning: true,
  };

  return { value, empty, props, resetValue };
};

export default useEditableDiv;
