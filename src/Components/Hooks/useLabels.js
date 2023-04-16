import { useEffect, useState } from "react";

const useGetAllLabels = (lastUpdate) => {
  const [allLabels, setAllLabels] = useState([]);

  useEffect(() => {
    const fetchAllLabels = async () => {
      console.log("fetching all labels...");
      try {
        const response = await fetch("http://localhost:3001/labels");
        const labelsData = await response.json();
        setAllLabels(labelsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllLabels();
  }, [lastUpdate]);

  return allLabels;
};

const useGetLabelList = (labels, noteLabels) => {
  const [labelList, setLabelList] = useState([]);

  //console.log("labels and notes", labels, noteLabels);

  useEffect(() => {
    if (!labels || !noteLabels) return;

    console.log(labels, noteLabels);

    const noteLabelsIds = noteLabels.map(({ _id }) => _id);

    const labelList = labels.map(({ _id, name }) => {
      return {
        name: name,
        id: _id,
        checked: noteLabelsIds.includes(_id.toString()),
      };
    });

    setLabelList(labelList);
  }, [labels, noteLabels]);

  return labelList;
};

const usePostLabel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postLabel = async (url, name) => {
    setIsLoading(true);
    console.log("posting label data", name);

    try {
      const formData = new FormData();
      formData.append("name", name);
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setIsLoading(false);
      console.log(data);
      return data;
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  return { postLabel, isLoading, error };
};

const useNoteLabels = (note = {}) => {
  const [noteLabels, setNoteLabels] = useState([]);

  useEffect(() => {
    setNoteLabels(note.labels);
  }, [note]);

  const updateNoteLabels = async (noteId, labelId, checked) => {
    console.log("updating note labels...");

    const formData = new FormData();

    formData.append("labelId", labelId);
    formData.append("checked", !checked);

    const response = await fetch(
      `http://localhost:3001/note/${noteId}/labelupdate`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    console.log("Note updated successfully!");
    setNoteLabels(data.labels);

    return data;
  };

  return { updateNoteLabels, noteLabels };
};

export { usePostLabel, useNoteLabels };
export { useGetAllLabels };
export { useGetLabelList };
