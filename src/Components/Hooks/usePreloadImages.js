import { useState, useEffect, useRef } from "react";

const usePreloadImages = (files) => {
  const [srcList, setSrcList] = useState([]);

  useEffect(() => {
    const preloadImages = async () => {
      const sources = files.map((file) => URL.createObjectURL(file));

      const srcListPromiseArray = sources.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;

          img.onload = () => resolve(src);
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
