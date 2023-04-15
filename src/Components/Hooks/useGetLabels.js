import { useEffect, useState } from "react";

const useGetLabels = (labelUpdate, note = {}) => {
  const [labels, setLabels] = useState([]);
  const [allLabels, setAllLabels] = useState([]);

  useEffect(() => {
    console.log("updating notes...");
    const id = note._id;
    const newNoteLabelsId = labels
      .filter((label) => {
        return label.checked === true;
      })
      .map((label) => {
        return label.id;
      });

    const url = `http://localhost:3001/note/${id}/labelupdate`;

    const updateNoteLables = async (url) => {
      console.log("posting image data", newNoteLabelsId);

      const formData = new FormData();

      for (let i = 0; i < newNoteLabelsId.length; i++) {
        formData.append("labelIds", newNoteLabelsId[i]);
      }

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      return data;
    };

    if (labelUpdate) updateNoteLables(url);
  }, [labelUpdate]);

  useEffect(() => {
    const createLabelList = (note, labelsData) => {
      if (Object.keys(note).length === 0) return [];

      const noteLabelsIds = note.labels.map((noteLabel) =>
        noteLabel._id.toString()
      );
      const labelsList = labelsData.map((label) => {
        const checked = noteLabelsIds.includes(label._id.toString());
        return { name: label.name, id: label._id, checked: checked };
      });
      return labelsList;
    };

    const fetchAllLabels = async () => {
      console.log("fetching labels...");
      try {
        const response = await fetch("http://localhost:3001/labels");
        const labelsData = await response.json();
        setAllLabels(labelsData);
        const labelsList = createLabelList(note, labelsData);
        setLabels(labelsList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllLabels();
  }, [note]);

  return { labelList: labels, setLabelList: setLabels };
};

export default useGetLabels;
