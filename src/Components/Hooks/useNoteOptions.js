import { useState, useRef, useEffect, useContext } from "react";
import { NoteContext } from "../NoteComponents/Note";
import { OptionsContext } from "../NoteComponents/NoteOptions";

const useNoteOptions = (containerRef, iconRef, isNote) => {
  const [show, setShow] = useState(false);
  const [cords, setCords] = useState({});
  const [showLabel, setShowLabel] = useState(false);
  const noteContext = useContext(NoteContext);

  const handleOptionsClick = (e) => {
    e.stopPropagation();

    if (showLabel) setShowLabel(!showLabel);
    if (noteContext !== null) noteContext.setOptionsClicked(true);

    const showOptions = () => {
      setShow(false);
      if (noteContext !== null) noteContext.setOptionsClicked(false);
      window.removeEventListener("resize", showOptions);
    };

    window.addEventListener("resize", showOptions);

    const hideOptions = (e) => {
      setShow(false);
      if (noteContext !== null) noteContext.setOptionsClicked(false);
      document.removeEventListener("click", hideOptions);
    };

    document.addEventListener("click", hideOptions);

    const iconCords = iconRef.current.getBoundingClientRect();

    const containerCords = containerRef.current.getBoundingClientRect();
    const iconX = iconCords.x - containerCords.x;
    const iconY = iconCords.y - containerCords.y;
    const windowHeight = window.innerHeight;

    const difference = isNote ? 102 : 42;

    if (windowHeight - iconCords.bottom >= difference) {
      const top = `${iconY + iconCords.height}px`;
      const left = `${iconX}px`;
      setCords({ top, left });
    } else {
      const top = `${iconY - difference}px`;
      const left = `${iconX}px`;
      setCords({ top, left });
    }

    setShow(!show);
  };

  return { show, cords, showLabel, setShow, setShowLabel, handleOptionsClick };
};

const useDropdown = () => {
  const {
    iconRef,
    containerRef,
    setShow,
    setShowLabel,
    show,
    cords,
    showLabel,
    labelList,
    setLabelList,
    type,
    isNote,
  } = useContext(OptionsContext);

  const [labelCords, setLabelCords] = useState(cords);
  const labelRef = useRef(null);
  const noteContext = useContext(NoteContext);
  const noteLabelList = noteContext ? noteContext.labelList : [];

  //prevents dialog from closing on click
  const handleOptionDialogClick = (e) => {
    e.stopPropagation();
  };

  const handleLabelButtonClick = (e) => {
    e.stopPropagation();

    const showOptions = (e) => {
      e.stopPropagation();
      setShowLabel(false);

      window.removeEventListener("resize", showOptions);
    };

    window.addEventListener("resize", showOptions);

    const hideOptions = (e) => {
      e.stopPropagation();

      setShowLabel(false);

      document.removeEventListener("click", hideOptions);
    };

    document.addEventListener("click", hideOptions);

    labelRef.current.style.display = "block"; //to get the size
    const labelCords = labelRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    labelRef.current.style.display = ""; // to return control back to the styled component

    const iconCords = iconRef.current.getBoundingClientRect();
    const containerCords = containerRef.current.getBoundingClientRect();
    const iconX = iconCords.x - containerCords.x;
    const iconY = iconCords.y - containerCords.y;

    if (windowHeight - iconCords.bottom >= labelCords.height) {
      const top = `${iconY + iconCords.height}px`;
      const left = `${iconX}px`;

      setLabelCords({ top, left });
    } else {
      const top = `${iconY - labelCords.height}px`;
      const left = `${iconX}px`;

      setLabelCords({ top, left });
    }

    setShow(!show);
    setShowLabel(!showLabel);
  };

  const labelProps = {
    labelRef,
    setLabelList,
    labelCords,
    type,
  };

  return {
    labelCords,
    labelRef,
    handleOptionDialogClick,
    handleLabelButtonClick,
    show,
    cords,
    showLabel,
    labelList: isNote ? noteLabelList : labelList,
    setLabelList,
    type,
    isNote,
    labelProps,
  };
};

export default useNoteOptions;

export { useDropdown };
