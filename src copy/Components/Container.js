import { useState } from "react";
import FormContainer from "./FormContainer";
import NotesContainer from "./NoteComponents/NotesContainer";
import useGetNotes from "./Hooks/useGetNotes";
import usePostData from "./Hooks/usePostData";
import { Modal } from "./StyledComponents/Modal";
import { useGetAllLabels } from "./Hooks/useLabels";

const Container = () => {
  const [lastUpdate, setLastUpdate] = useState({});
  const notes = useGetNotes(lastUpdate.notes);
  const labels = useGetAllLabels(lastUpdate.labels);
  const { postData, isLoading, error } = usePostData();

  const addNote = async (note) => {
    await postData("http://localhost:3001/note/create", note);
    setLastUpdate({ ...lastUpdate, notes: Date.now() });
  };

  const addLabel = async (label) => {
    await postData("http://localhost:3001/note/create", label);
    setLastUpdate({ ...lastUpdate, labels: Date.now() });
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
