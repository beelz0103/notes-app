import { useState, useEffect, useRef } from "react";

const usePreloadImages = (files) => {
  const [srcList, setSrcList] = useState([]);

  useEffect(() => {
    const preloadImages = async () => {
      const sources = files.map((fileObj) => {
        const { file, id } = fileObj;
        return { src: URL.createObjectURL(file), id };
      });

      const srcListPromiseArray = sources.map(({ src, id }) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;

          img.onload = () => resolve({ src, id });
        });
      });

      const loadedSrcList = await Promise.all(srcListPromiseArray);

      setSrcList(loadedSrcList);
    };

    preloadImages();
  }, [files]);

  return srcList;
};

export default usePreloadImages;
