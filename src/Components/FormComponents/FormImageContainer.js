import usePreloadImages from "../Hooks/usePreloadImages";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

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

const Images = ({ files, removeSingleFile }) => {
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

const ImageDiv = ({ id, aspectRatio, src, removeSingleFile, isOne }) => {
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

export default FormImageContainer;
