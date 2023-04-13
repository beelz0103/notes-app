import { useState } from "react";
import FormContainer from "./FormContainer";
import NotesContainer from "./NoteComponents/NotesContainer";
import useGetNotes from "./Hooks/useGetNotes";
import usePostData from "./Hooks/usePostData";
import { Modal } from "./StyledComponents/Modal";

const Container = () => {
  const [lastUpdate, setLastUpdate] = useState(null);
  const notes = useGetNotes(lastUpdate);
  const { postData, isLoading, error } = usePostData();

  const addNote = async (note) => {
    console.log(note);
    await postData("http://localhost:3001/note/create", note);
    setLastUpdate(Date.now());
  };

  const updateNote = async (note, _id) => {
    await postData(`http://localhost:3001/note/${_id}/update`, note);
    setLastUpdate(Date.now());
  };

  return (
    <div className="container">
      <FormContainer addNote={addNote} />
      <NotesContainer notes={notes} updateNote={updateNote} />
    </div>
  );
};

export default Container;
