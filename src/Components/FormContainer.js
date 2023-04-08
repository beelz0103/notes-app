import { useState, useEffect, useRef } from "react";

const FormContainer = ({ addNote }) => {
  const [title, setTitle] = useState("Test"); //set this to "" later
  const [content, setContent] = useState("Test Content"); //set this to "" later
  const [allFiles, setAllFiles] = useState([]);
  const editableDivRef = useRef("");

  const submitHandler = () => {
    const note = {
      title,
      content,
      images: allFiles,
    };

    addNote(note);
    setTitle("");
    setContent("");
    setAllFiles([]);
    editableDivRef.current.textContent = "";
  };

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const contentChangeHandler = (event) => {
    setContent(event.target.innerHTML);
  };

  return (
    <div className="form">
      <div>
        <input
          value={title}
          onChange={titleChangeHandler}
          placeholder="title"
        />
      </div>

      <div>
        <div
          ref={editableDivRef}
          onInput={contentChangeHandler}
          onBlur={contentChangeHandler}
          className="text-area"
          role="textbox"
          contentEditable={true}
          data-placeholder="Take a note"
          suppressContentEditableWarning
        >
          Test Content
          {/* remove later Test Content  */}
        </div>
      </div>
      <ImageUploader allFiles={allFiles} setAllFiles={setAllFiles} />
      <button onClick={submitHandler}>Add</button>
    </div>
  );
};

export default FormContainer;

const ImageUploader = ({ allFiles, setAllFiles }) => {
  const fileInput = useRef(null);

  const handleFileUpload = (event) => {
    setAllFiles([...allFiles, ...Array.from(event.target.files)]);
  };

  return (
    <div className="image-uploader">
      <button className="upload-btn" onClick={() => fileInput.current.click()}>
        Choose File
      </button>
      <input
        onChange={handleFileUpload}
        type="file"
        multiple
        onClick={(event) => (event.target.value = null)}
        style={{ display: "none" }}
        ref={fileInput}
      />
      <div className="image-container">
        {allFiles.length === 0 ? null : <ImageThumbnail fileList={allFiles} />}
      </div>
    </div>
  );
};

const ImageThumbnail = ({ fileList }) => {
  return (
    <div>
      {fileList.map((val, index) => {
        const source = URL.createObjectURL(val);
        return (
          <img
            key={index}
            src={source}
            onClick={(event) => (event.target.value = null)}
            alt="img"
          />
        );
      })}
    </div>
  );
};
