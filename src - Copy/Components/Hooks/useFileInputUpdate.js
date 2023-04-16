import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import useFileInput from "./useFileInput";

const useFileInputUpdate = (imagesArray) => {
  const fileInput = useFileInput();

  useEffect(() => {
    const imageToFile = async (imageObj) => {
      const ext = imageObj.url.split(".").pop();
      const imageUrl = "http://localhost:3001/" + imageObj.url;
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], `id_${imageObj._id}`, {
        type: `image/${ext}`,
      });
      return file;
    };

    const createFileList = async (imagesArray) => {
      const fileList = await Promise.all(
        imagesArray.map(async (imageObj) => {
          const file = await imageToFile(imageObj);
          return { id: file.name, file };
        })
      );

      return fileList;
    };

    createFileList(imagesArray).then((fileList) => {
      fileInput.setFiles(fileList);
    });
  }, []);

  return { fileInput };
};

export default useFileInputUpdate;
