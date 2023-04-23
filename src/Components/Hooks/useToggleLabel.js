import { useRef, useState } from "react";

const useToggleLabel = () => {
  const [displayLabel, setDisplayLabel] = useState(null);

  const updateCurrentLabel = (label) => {
    setDisplayLabel(label);
  };

  const filterNotes = (notes) => {
    if (!displayLabel) return notes;
    return notes.filter(({ labels }) => {
      console.log(labels);
      return labels.length === 0
        ? false
        : labels.find((label) => {
            return label._id.toString() === displayLabel._id.toString();
          });
    });
  };

  return { displayLabel, updateCurrentLabel, filterNotes };
};

export default useToggleLabel;
