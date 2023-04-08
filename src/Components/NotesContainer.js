import { useState, useEffect } from "react";
import parse from "html-react-parser";

const NotesContainer = ({ notes }) => {
  return (
    <div>
      {notes.map((value, index) => (
        <Note note={value} key={index} />
      ))}
    </div>
  );
};

const Note = ({ note }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        width: "200px",
        margin: "10px",
      }}
    >
      <div>{note.title}</div>
      <div>{parse(note.content)}</div>
      <div>
        {note.images.length === 0
          ? "no images"
          : note.images.map((img) => {
              return <Image url={img.url} key={img._id} />;
            })}
      </div>
    </div>
  );
};

const Image = ({ url }) => {
  const source = "http://localhost:3001/" + url;
  return <img src={source}></img>;
};

export default NotesContainer;
