import { useState, useEffect } from "react";
import FormContainer from "./FormContainer";
import NotesContainer from "./NotesContainer";
import useGetNotes from "./Hooks/useGetNotes";
import usePostData from "./Hooks/usePostData";
import usePostImage from "./Hooks/usePostImage";

const Container = () => {
  const [lastUpdate, setLastUpdate] = useState(null);
  const notes = useGetNotes(lastUpdate);
  const { postText } = usePostData();
  const { postImage, isLoading, error } = usePostImage();

  const addNote = async (noteObj) => {
    const { title, content, images } = noteObj;

    const textPostData = await postText("http://localhost:3001/submit-form", {
      title,
      content,
    });

    const imagePostData = await postImage(
      "http://localhost:3001/upload/",
      images,
      textPostData
    );
    console.log(imagePostData);
    setLastUpdate(Date.now());
  };

  return (
    <div className="container">
      <FormContainer addNote={addNote} />
      <NotesContainer notes={notes} />
    </div>
  );
};

export default Container;
