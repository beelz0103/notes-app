import usePreloadImages from "../Hooks/usePreloadImages";
import { v4 as uuidv4 } from "uuid";

const FormImageContainer = ({ files, removeSingleFile }) => {
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

  const removedImage = (event) => {
    const id = event.target.id;
    removeSingleFile(id);
  };

  return (
    <div>
      {srcList.map(({ src, id }) => {
        return (
          <div key={id}>
            <img src={src} alt="error" />
            <button id={id} onClick={removedImage}>
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FormImageContainer;
