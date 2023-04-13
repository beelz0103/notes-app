import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import useFileInputUpdate from "./useFileInputUpdate";

const useFileInput = (imagesArray) => {
  const [files, setFiles] = useState([]);

  const style = { display: "none" };

  const resetFiles = () => {
    setFiles([]);
  };

  const handleClick = (event) => {
    event.target.value = null;
  };

  const handleChange = (event) => {
    const fileList = Array.from(event.target.files).map((file) => {
      return {
        id: "id_" + uuidv4(),
        file,
      };
    });
    setFiles([...files, ...fileList]);
  };

  const removeSingleFile = (id) => {
    const newFiles = files.filter((file) => file.id !== id);
    setFiles(newFiles);
  };

  const inputProps = {
    type: "file",
    multiple: true,
    style: style,
    onChange: handleChange,
    onClick: handleClick,
  };

  return {
    inputProps,
    props: inputProps,
    files,
    setFiles,
    resetFiles,
    removeSingleFile,
  };
};

export default useFileInput;
