import { useState, useEffect } from "react";
import FormContainer from "./FormContainer";
import NotesContainer from "./NotesContainer";
import useGetNotes from "./Hooks/useGetNotes";
import usePostData from "./Hooks/usePostData";

const Container = () => {
  const [lastUpdate, setLastUpdate] = useState(null);
  const notes = useGetNotes(lastUpdate);
  const { postData, isLoading, error } = usePostData();

  const addNote = async (noteObj) => {
    const { title, content, images } = noteObj;

    const data = await postData("http://localhost:3001/note/create", {
      title,
      content,
      images,
    });

    console.log(data);

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
