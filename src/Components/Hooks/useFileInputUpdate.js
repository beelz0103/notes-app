import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import useFileInput from "./useFileInput";

const useFileInputUpdate = (imagesArray) => {
  const fileInput = useFileInput();

  useEffect(() => {
    console.log("this ran");
    const imageToFile = async (imageObj) => {
      const ext = imageObj.url.split(".");
      const loadImage = new Promise((resolve) => {
        const image = new Image();
        image.src = "http://localhost:3001/" + imageObj.url;
        image.onload = () => resolve(image);
      });
      const loadedImg = await loadImage;
      const request = new Request(loadedImg);
      const response = await fetch(request);
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
      console.log(fileList);
      fileInput.setFiles(fileList);
    });
  }, []);

  return { fileInput };
};

export default useFileInputUpdate;
