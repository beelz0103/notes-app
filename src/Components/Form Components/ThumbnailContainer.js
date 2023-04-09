import usePreloadImages from "../Hooks/usePreloadImages";

const ThumbnailContainer = ({ files }) => {
  return (
    <div className="thumbnail-container">
      {files.length === 0 ? null : <Thumbnail files={files} />}
    </div>
  );
};

const Thumbnail = ({ files }) => {
  const srcList = usePreloadImages(files);

  return (
    <div>
      {srcList.map((src, index) => {
        return <img key={index} src={src} alt="error" />;
      })}
    </div>
  );
};

export default ThumbnailContainer;
