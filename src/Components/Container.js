import { useState } from "react";
import FormContainer from "./FormContainer";
import NotesSubContainer from "./NoteComponents/NotesSubContainer";
import useGetNotes from "./Hooks/useGetNotes";
import usePostData from "./Hooks/usePostData";
import { useGetAllLabels, usePostLabel } from "./Hooks/useLabels";
import { useContext, createContext } from "react";
import { createFormData } from "./JSModules/helperFunctions";
import Tooltip from "./Tootip";

const ContainerContext = createContext(null);

export { ContainerContext };

const Container = ({ toggleLabel, labels, lastUpdate, setLastUpdate }) => {
  const notes = useGetNotes(lastUpdate);

  const { postData, isLoading, error } = usePostData();
  const { postLabel } = usePostLabel();

  const addNote = async (note) => {
    const formData = createFormData(note);
    await postData(process.env.REACT_APP_API_URL + "/note/create", formData);
    setLastUpdate(Date.now());
  };

  const addLabel = async (label) => {
    const newLabel = await postLabel(
      process.env.REACT_APP_API_URL + "/label/create",
      label
    );
    setLastUpdate(Date.now());
    return newLabel;
  };

  const updateNote = async (note, _id) => {
    const formData = createFormData(note);
    await postData(
      `${process.env.REACT_APP_API_URL}/note/${_id}/update`,
      formData
    );
    setLastUpdate(Date.now());
  };

  const deleteNote = async (note, _id) => {
    const formData = new FormData();
    formData.append("note", JSON.stringify(note));
    formData.append("deleted", note.deleted);
    await postData(
      `${process.env.REACT_APP_API_URL}/note/${_id}/delete`,
      formData
    );
    setLastUpdate(Date.now());
  };

  const archiveNote = async (note, _id) => {
    const formData = new FormData();
    formData.append("note", JSON.stringify(note));
    formData.append("archive", note.archive);
    await postData(
      `${process.env.REACT_APP_API_URL}/note/${_id}/archive`,
      formData
    );
    setLastUpdate(Date.now());
  };

  const pinNote = async (note, _id) => {
    const formData = new FormData();
    formData.append("note", JSON.stringify(note));
    formData.append("pinned", note.pinned);
    await postData(`process.env.REACT_APP_API_URL/note/${_id}/pin`, formData);
    setLastUpdate(Date.now());
  };

  const deletePermanently = async (note, _id) => {
    const formData = new FormData();
    formData.append("note", JSON.stringify(note));
    await postData(
      `process.env.REACT_APP_API_URL/note/${_id}/delete_permanently`,
      formData
    );
    setLastUpdate(Date.now());
  };

  const restoreNote = async (note, _id) => {
    const formData = new FormData();
    formData.append("note", JSON.stringify(note));
    formData.append("deleted", note.deleted);
    await postData(
      `process.env.REACT_APP_API_URL/note/${_id}/delete`,
      formData
    );
    setLastUpdate(Date.now());
  };

  return (
    <div className="container">
      <ContainerContext.Provider
        value={{
          addNote,
          updateNote,
          addLabel,
          labels,
          setLastUpdate,
          deleteNote,
          toggleLabel,
          pinNote,
          archiveNote,
          deletePermanently,
          restoreNote,
        }}
      >
        {toggleLabel.showForm && (
          <FormContainer
            addNote={addNote}
            labels={labels}
            addLabel={addLabel}
          />
        )}
        <NotesSubContainer
          notes={toggleLabel.filterNotes(notes)}
          labels={labels}
          addLabel={addLabel}
          updateNote={updateNote}
        />
      </ContainerContext.Provider>
    </div>
  );
};

export default Container;
