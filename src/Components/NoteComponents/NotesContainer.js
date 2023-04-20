import { useState, memo, useCallback, useContext, createContext } from "react";
import NotePopup from "./NotePopup";
import Note from "./Note";
import useAnimateDisplay from "../Hooks/useAnimateDisplay";

const NoteContainerContext = createContext(0);

export { NoteContainerContext };

const NotesContainer = ({ notes, updateNote }) => {
  const [display, setDisplay] = useState("none");
  const [popupNote, setPopupNote] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const showModal = useCallback((note) => {
    setDisplay("flex");
    setShowPopup(true);
    setPopupNote(note);
  }, []);

  const hideModal = useCallback(() => {
    setDisplay("none");
    setShowPopup(false);
    setPopupNote({});
  }, []);

  return (
    <NoteContainerContext.Provider value={{ showPopup }}>
      <div className="note-container">
        <NotePopup
          display={display}
          popupNote={popupNote}
          hideModal={hideModal}
          updateNote={updateNote}
        />
        <NoteContainer notes={notes} showModal={showModal} />
      </div>
    </NoteContainerContext.Provider>
  );
};

const NoteContainer = memo(function NoteContainer({ notes, showModal }) {
  return (
    <div style={{ display: "flex", flexDirection: "column-reverse" }}>
      {notes.map((note) => {
        return <Note key={note._id} note={note} showModal={showModal} />;
      })}
    </div>
  );
});

export default NotesContainer;
