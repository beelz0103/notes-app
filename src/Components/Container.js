import { useState, useEffect } from "react";
import FormContainer from "./FormContainer";
import NotesContainer from "./NotesContainer";

const Container = () => {
  const [notes, setNotes] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    (async () => {
      const fetchNotes = await fetch("http://localhost:3001/notes");
      const notesData = await fetchNotes.json();
      console.log(notesData);
      setNotes(notesData);
    })();
  }, [lastUpdate]);

  const addNote = async (noteObj) => {
    const newNotes = notes.concat(noteObj);

    const { title, content, images } = noteObj;

    const textPostResponse = await fetch("http://localhost:3001/submit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ title, content }),
    });

    const textPostData = await textPostResponse.json();

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("file", images[i]);
    }

    const imgPostResponse = await fetch(
      "http://localhost:3001/upload/" + textPostData._id,
      {
        method: "POST",
        body: formData,
      }
    );

    const imgPostData = await imgPostResponse.json();
    setLastUpdate(Date.now());
    // console.log(imgPostData);
  };

  return (
    <div className="container">
      <FormContainer addNote={addNote} />
      <NotesContainer notes={notes} />
    </div>
  );
};

export default Container;
