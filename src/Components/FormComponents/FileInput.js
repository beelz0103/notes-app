const FileInput = ({ inputProps, uploadBtnRef }) => {
  return (
    <div className="upload-container">
      <input ref={uploadBtnRef} {...inputProps}></input>
    </div>
  );
};

export default FileInput;
