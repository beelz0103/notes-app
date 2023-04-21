import { useState } from "react";
import FormContainer from "./FormContainer";
import NotesContainer from "./NoteComponents/NotesContainer";
import useGetNotes from "./Hooks/useGetNotes";
import usePostData from "./Hooks/usePostData";
import { useGetAllLabels, usePostLabel } from "./Hooks/useLabels";
import { useContext, createContext } from "react";
import { createFormData } from "./JSModules/helperFunctions";

const ContainerContext = createContext(null);

export { ContainerContext };

const Container = () => {
  const [lastUpdate, setLastUpdate] = useState({});
  const notes = useGetNotes(lastUpdate);
  const labels = useGetAllLabels(lastUpdate);
  const { postData, isLoading, error } = usePostData();
  const { postLabel } = usePostLabel();

  const addNote = async (note) => {
    const formData = createFormData(note);
    await postData("http://localhost:3001/note/create", formData);
    setLastUpdate(Date.now());
  };

  const addLabel = async (label) => {
    const newLabel = await postLabel(
      "http://localhost:3001/label/create",
      label
    );
    setLastUpdate(Date.now());
    return newLabel;
  };

  const updateNote = async (note, _id) => {
    const formData = createFormData(note);
    await postData(`http://localhost:3001/note/${_id}/update`, formData);
    setLastUpdate(Date.now());
  };

  return (
    <div className="container">
      <ContainerContext.Provider
        value={{ addNote, updateNote, addLabel, labels, setLastUpdate }}
      >
        <FormContainer addNote={addNote} labels={labels} addLabel={addLabel} />
        <NotesContainer
          notes={notes}
          labels={labels}
          addLabel={addLabel}
          updateNote={updateNote}
        />
      </ContainerContext.Provider>
    </div>
  );
};

export default Container;
