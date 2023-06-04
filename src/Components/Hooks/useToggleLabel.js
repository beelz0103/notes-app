import { useRef, useState } from "react";

const useToggleLabel = () => {
  const [displayLabel, setDisplayLabel] = useState({
    name: "Home",
    isSpecial: true,
  });

  const [showForm, setShowForm] = useState(true);

  const updateCurrentLabel = (label) => {
    setDisplayLabel(label);

    if (label.isSpecial && label.name !== "Home") setShowForm(false);
    else setShowForm(true);
  };

  const filterNotes = (notes) => {
    //  if (displayLabel.isSpecial) return notes;
    if (displayLabel.isSpecial) {
      switch (displayLabel.name) {
        case "Home":
          return notes.filter((note) => !note.deleted && !note.archived);
        case "Archive":
          return notes.filter((note) => note.archived);
        case "Bin":
          return notes.filter((note) => note.deleted);
        default:
          return notes;
      }
    }
    return notes.filter(({ labels, archived, deleted }) => {
      return labels.length === 0 && !archived && !deleted
        ? false
        : labels.find((label) => {
            return label._id.toString() === displayLabel._id.toString();
          });
    });
  };

  return { displayLabel, updateCurrentLabel, filterNotes, showForm };
};

export default useToggleLabel;
