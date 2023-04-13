import { useState, memo, useCallback } from "react";
import NotePopup from "./NotePopup";
import Note from "./Note";

const NotesContainer = ({ notes, updateNote }) => {
  const [display, setDisplay] = useState("none");
  const [popupNote, setPopupNote] = useState({});

  const showModal = useCallback((note) => {
    console.log("modal showed");
    setDisplay("flex");
    setPopupNote(note);
  }, []);

  const hideModal = useCallback(() => {
    console.log("modal hidden");
    setDisplay("none");
    setPopupNote({});
  }, []);

  return (
    <div className="note-container">
      <NotePopup
        display={display}
        popupNote={popupNote}
        hideModal={hideModal}
        updateNote={updateNote}
      />
      <NoteContainer notes={notes} showModal={showModal} />
    </div>
  );
};

const NoteContainer = memo(function NoteContainer({ notes, showModal }) {
  return (
    <div>
      {notes.map((note) => {
        return <Note key={note._id} note={note} showModal={showModal} />;
      })}
    </div>
  );
});

export default NotesContainer;
