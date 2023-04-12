import { useState } from "react";
import NotePopup from "./NotePopup";
import Note from "./Note";

const NotesContainer = ({ notes, updateNote }) => {
  const [display, setDisplay] = useState("none");
  const [popupNote, setPopupNote] = useState({});

  const showModal = (note) => {
    setDisplay("flex");
    setPopupNote(note);
  };

  const hideModal = () => {
    setDisplay("none");
    setPopupNote({});
  };

  return (
    <div className="note-container">
      <NotePopup
        display={display}
        popupNote={popupNote}
        hideModal={hideModal}
        updateNote={updateNote}
      />
      <div>
        {notes.map((note) => {
          return <Note key={note._id} note={note} showModal={showModal} />;
        })}
      </div>
    </div>
  );
};

export default NotesContainer;
