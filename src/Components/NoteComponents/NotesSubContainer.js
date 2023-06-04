import { useState, memo, useCallback, useContext, createContext } from "react";
import NotePopup from "./NotePopup";
import Note from "./Note";
import useAnimateDisplay from "../Hooks/useAnimateDisplay";

const NoteContainerContext = createContext(null);

export { NoteContainerContext };

const NotesSubContainer = ({ notes, updateNote }) => {
  const [display, setDisplay] = useState("none");
  const [popupNote, setPopupNote] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [showNote, setShowNote] = useState(true);

  const showModal = useCallback((note) => {
    setDisplay("flex");
    setShowPopup(true);
    setPopupNote(note);
    setShowNote(false);
  }, []);

  const hideModal = useCallback(() => {
    setDisplay("none");
    setShowPopup(false);
    setPopupNote({});
    setShowNote(true);
  }, []);

  return (
    <NoteContainerContext.Provider
      value={{ showPopup, notes, showModal, popupNote, showNote }}
    >
      <div className="note-container">
        <NotePopup
          display={display}
          popupNote={popupNote}
          hideModal={hideModal}
          updateNote={updateNote}
        />
        <NoteContainer />
      </div>
    </NoteContainerContext.Provider>
  );
};

const NoteContainer = memo(function NoteContainer() {
  const { notes } = useContext(NoteContainerContext);

  return notes.some((notes) => notes.pinned) ? (
    <>
      <PinnedContainer pinnedNotes={notes.filter(({ pinned }) => pinned)} />
      <OthersContainer otherNotes={notes.filter(({ pinned }) => !pinned)} />
    </>
  ) : (
    <NoPinContainer />
  );
});

const NoPinContainer = () => {
  const { notes, showModal, popupNote, showNote } =
    useContext(NoteContainerContext);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column-reverse" }}>
        {notes.map((note) => {
          return (
            <Note
              key={note._id}
              note={note}
              showModal={showModal}
              showNote={popupNote._id === note._id ? showNote : true}
            />
          );
        })}
      </div>
    </>
  );
};

const PinnedContainer = ({ pinnedNotes }) => {
  const { showModal, popupNote, showNote } = useContext(NoteContainerContext);
  return (
    <>
      <div>Pinned</div>
      <div style={{ display: "flex", flexDirection: "column-reverse" }}>
        {pinnedNotes.map((note) => {
          return (
            <Note
              key={note._id}
              note={note}
              showModal={showModal}
              showNote={popupNote._id === note._id ? showNote : true}
            />
          );
        })}
      </div>
    </>
  );
};

const OthersContainer = ({ otherNotes }) => {
  const { showModal, popupNote, showNote } = useContext(NoteContainerContext);
  return otherNotes.length === 0 ? null : (
    <>
      <div>Others</div>
      <div style={{ display: "flex", flexDirection: "column-reverse" }}>
        {otherNotes.map((note) => {
          return (
            <Note
              key={note._id}
              note={note}
              showModal={showModal}
              showNote={popupNote._id === note._id ? showNote : true}
            />
          );
        })}
      </div>
    </>
  );
};

export default NotesSubContainer;
