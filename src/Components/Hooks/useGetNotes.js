import { useEffect, useState } from "react";

const useGetNotes = (lastUpdate) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchAllNotes = async () => {
      console.log("fetching notes...");
      try {
        const response = await fetch("http://localhost:3001/notes");
        const data = await response.json();
        console.log(data);
        setNotes(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllNotes();
  }, [lastUpdate]);

  return notes;
};

export default useGetNotes;
