import usePreloadImages from "../Hooks/usePreloadImages";

const FormImageContainer = ({ files }) => {
  return (
    <div className="image-container">
      {files.length === 0 ? null : <Images files={files} />}
    </div>
  );
};

const Images = ({ files }) => {
  const srcList = usePreloadImages(files);

  return (
    <div>
      {srcList.map((src, index) => {
        return <img key={index} src={src} alt="error" />;
      })}
    </div>
  );
};

export default FormImageContainer;
