import { useState, useContext, createContext, useRef } from "react";
import styled from "styled-components";
import { LabelForForm, LabelForNote } from "./Label";
import { FormContext } from "../FormContainer";
import { NoteContext } from "./Note";

const OptionsContext = createContext(null);

const NoteOptions = ({
  containerRef,
  iconRef,
  optionButtonRef,
  isNote = true,
  labelList,
  setLabelList,
  handleDelete,
}) => {
  console.log("note options dropdown rendered");
  const [show, setShow] = useState(false);
  const [cords, setCords] = useState({});
  const [showLabel, setShowLabel] = useState(false);

  const noteContext = useContext(NoteContext);

  const handleClick = (e) => {
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

    e.stopPropagation();
  };

  return (
    <>
      <OptionsContext.Provider
        value={{
          show,
          cords,
          setShow,
          showLabel,
          setShowLabel,
          iconRef,
          containerRef,
          labelList,
          setLabelList,
          handleDelete,
        }}
      >
        <button
          ref={optionButtonRef}
          onClick={handleClick}
          style={{ display: "none" }}
        ></button>
        {isNote ? <NoteOptionDropdown /> : <FormOptionDropdown />}
      </OptionsContext.Provider>
    </>
  );
};

const NoteOptionDropdown = () => {
  const {
    show,
    cords,
    setShow,
    showLabel,
    setShowLabel,
    iconRef,
    containerRef,
  } = useContext(OptionsContext);
  const { labelList } = useContext(NoteContext);
  const [labelCords, setLabelCords] = useState(cords);

  const labelRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleLabelClick = (e) => {
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

  const { handleDelete } = useContext(OptionsContext);

  return (
    <>
      <LabelForNote
        labelRef={labelRef}
        cords={labelCords}
        showLabel={showLabel}
      ></LabelForNote>
      <StyledOptionDropDown
        show={show}
        cords={cords}
        height={"102px"}
        onClick={handleClick}
      >
        <StyledOptionsDiv onClick={handleDelete}>
          <StyledOptionsContentDiv>Delete note</StyledOptionsContentDiv>
        </StyledOptionsDiv>
        <StyledOptionsDiv>
          <StyledOptionsContentDiv onClick={handleLabelClick}>
            {labelList.some(({ checked }) => checked)
              ? "Change labels"
              : "Add Label"}
          </StyledOptionsContentDiv>
        </StyledOptionsDiv>
        <StyledOptionsDiv>
          <StyledOptionsContentDiv>Made a copy</StyledOptionsContentDiv>
        </StyledOptionsDiv>
      </StyledOptionDropDown>
    </>
  );
};

const FormOptionDropdown = () => {
  const {
    show,
    cords,
    setShow,
    iconRef,
    containerRef,
    setShowLabel,
    showLabel,
    labelList,
    setLabelList,
  } = useContext(OptionsContext);

  const [labelCords, setLabelCords] = useState(cords);
  const labelRef = useRef(null);

  //prevents dialog from closing on click
  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleLabelClick = (e) => {
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

  return (
    <>
      <LabelForForm
        labelRef={labelRef}
        cords={labelCords}
        showLabel={showLabel}
        labelList={labelList}
        setLabelList={setLabelList}
      />
      <StyledOptionDropDown
        show={show}
        cords={cords}
        height={"42px"}
        onClick={handleClick}
      >
        <StyledOptionsDiv>
          <StyledOptionsContentDiv onClick={handleLabelClick}>
            {labelList.some(({ checked }) => checked)
              ? "Change labels"
              : "Add Label"}
          </StyledOptionsContentDiv>
        </StyledOptionsDiv>
      </StyledOptionDropDown>
    </>
  );
};

const StyledOptionsDiv = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap");

  border: 1px solid transparent;
  letter-spacing: 0.01428571em;
  font-family: "Roboto", Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25rem;
  padding: 5px 10px 5px 17px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const StyledOptionsContentDiv = styled.div`
  color: #3c4043;
  height: 18px;
  vertical-align: top;
`;

const StyledOptionDropDown = styled.div`
  padding: 6px 0;
  width: 164px;
  height: ${(props) => props.height}; // 30px for each option item
  box-sizing: border-box;

  background-color: white;
  border-width: 0;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
    0 2px 6px 2px rgba(60, 64, 67, 0.149);
  border-radius: 4px;
  position: absolute;
  display: ${(props) => (props.show ? "block" : "none")};
  top: ${(props) => props.cords.top};
  left: ${(props) => props.cords.left};

  z-index: 4500;
`;

export default NoteOptions;
