import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const usePreloadImages = (files = null, images = null) => {
  const [srcList, setSrcList] = useState([]);

  function chunkArray(arr, n) {
    let chunks = [];
    for (let i = 0; i < arr.length; i += n) {
      const chunkedId = "id_" + uuidv4();
      chunks.push({ chunkedArray: arr.slice(i, i + n), chunkedId });
    }
    return chunks;
  }

  useEffect(() => {
    const preloadImages = async () => {
      const sources = files.map((fileObj) => {
        const { file, id } = fileObj;
        console.log(fileObj);
        return { src: URL.createObjectURL(file), id };
      });

      const srcListPromiseArray = sources.map(({ src, id }) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;

          img.onload = () => {
            const aspectRatio = img.width / img.height;
            return resolve({ src, id, aspectRatio });
          };
        });
      });

      const loadedSrcList = await Promise.all(srcListPromiseArray);
      const chunkedArray = chunkArray(loadedSrcList, 3);

      setSrcList(chunkedArray);
    };

    preloadImages();
  }, [files]);

  return srcList;
};

export default usePreloadImages;
