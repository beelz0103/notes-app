import { useEffect, useState } from "react";

const useGetNotes = (lastUpdate) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchAllNotes = async () => {
      console.log("fetching notes...");
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/notes");
        const data = await response.json();
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
