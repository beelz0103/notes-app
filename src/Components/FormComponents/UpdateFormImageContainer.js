import usePreloadImages from "../Hooks/usePreloadImages";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const UpdateFormImageContainer = ({ images, updatable = false, fromPopup }) => {
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    const preloadImages = async () => {
      if (images.length !== 0) {
        const srcListPromiseArray = images.map(({ url, _id }) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = "http://localhost:3001/" + url;

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
        src={"http://localhost:3001/" + url}
        alt="error"
        style={{ borderRadius: "5px" }}
      />
    </div>
  );
};

const FormImageContainer = ({ files, removeSingleFile }) => {
  if (files)
    return (
      <div className="image-container">
        {files.length === 0 ? null : (
          <Images files={files} removeSingleFile={removeSingleFile} />
        )}
      </div>
    );
};

const Images1 = ({ files, removeSingleFile }) => {
  const srcList = usePreloadImages(files);

  return (
    <>
      {srcList.map(({ chunkedArray, chunkedId }) => {
        return (
          <div key={chunkedId} className="chunk-container">
            {chunkedArray.map((srcListObj) => {
              return (
                <ImageDiv
                  {...srcListObj}
                  removeSingleFile={removeSingleFile}
                  isOne={chunkedArray.length}
                  key={srcListObj.id}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
};

const ImageDiv1 = ({ id, aspectRatio, src, removeSingleFile, isOne }) => {
  const removeImage = (event) => {
    const id = event.target.id;
    removeSingleFile(id);
  };

  const showDeleteButton = () => {
    document.querySelector(`#${id}`).classList.add("show-btn");
    document.querySelector(`#${id}`).classList.remove("hide-btn");
  };

  const hideDeleteButton = () => {
    document.querySelector(`#${id}`).classList.remove("show-btn");
    document.querySelector(`#${id}`).classList.add("hide-btn");
  };

  const divStyle = isOne === 1 ? {} : { flex: aspectRatio };

  const buttonClass = "uplimg-delt-btn hide-btn";

  return (
    <div
      className="upload-image-div"
      onMouseEnter={showDeleteButton}
      onMouseLeave={hideDeleteButton}
      style={divStyle}
    >
      <img src={src} alt="error" />
      <div id={id} onClick={removeImage} className={buttonClass}>
        <FontAwesomeIcon className="uplimg-delt-icon" icon={faTrash} />
      </div>
    </div>
  );
};

export default UpdateFormImageContainer;
