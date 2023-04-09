import { useState, useEffect, useRef } from "react";

const useFileInput = () => {
  const [files, setFiles] = useState([]);

  const style = { display: "none" };

  const resetFiles = () => {
    setFiles([]);
  };

  const handleClick = (event) => {
    event.target.value = null;
  };

  const handleChange = (event) => {
    setFiles([...files, ...Array.from(event.target.files)]);
    console.log([...files, ...Array.from(event.target.files)]);
  };

  const inputProps = {
    type: "file",
    multiple: true,
    style: style,
    onChange: handleChange,
    onClick: handleClick,
  };

  return { inputProps, props: inputProps, files, setFiles, resetFiles };
};

export default useFileInput;
