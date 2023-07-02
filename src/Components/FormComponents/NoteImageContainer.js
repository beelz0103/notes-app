import usePreloadImages from "../Hooks/usePreloadImages";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const NoteImageContainer = ({ images, updatable = false, fromPopup }) => {
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    const preloadImages = async () => {
      if (images.length !== 0) {
        const srcListPromiseArray = images.map(({ url, _id }) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = process.env.REACT_APP_API_URL + "/" + url;

            img.onload = () => {
              const aspectRatio = img.width / img.height;
              return resolve({ url, _id, aspectRatio });
            };
          });
        });
        const loadedSrcList = await Promise.all(srcListPromiseArray);
        setNewImages(loadedSrcList);
      }
    };

    preloadImages();
  }, [images]);

  return (
    <div className="image-container">
      {images.length === 0 ? null : <Images images={newImages} />}
    </div>
  );
};

const Images = ({ images }) => {
  function chunkArray(arr, n) {
    let chunks = [];
    for (let i = 0; i < arr.length; i += n) {
      const chunkedId = "id_" + uuidv4();
      chunks.push({ chunkedArray: arr.slice(i, i + n), chunkedId });
    }
    return chunks;
  }

  const srcList = chunkArray(images, 3);

  return (
    <>
      {srcList.map(({ chunkedArray, chunkedId }) => {
        return (
          <div key={chunkedId} className="chunk-container">
            {chunkedArray.map((imageObj) => {
              return (
                <ImageDiv
                  {...imageObj}
                  isOne={chunkedArray.length}
                  key={imageObj._id}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
};

const ImageDiv = ({ aspectRatio, url, isOne }) => {
  const divStyle = isOne === 1 ? {} : { flex: aspectRatio };

  return (
    <div className="upload-image-div" style={divStyle}>
      <img
        src={process.env.REACT_APP_API_URL + "/" + url}
        alt="error"
        style={{ borderRadius: "5px" }}
      />
    </div>
  );
};

export default NoteImageContainer;
