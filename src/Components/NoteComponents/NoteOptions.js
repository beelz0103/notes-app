import { useState, useContext, createContext, useRef } from "react";
import styled from "styled-components";
import { LabelForForm, LabelForNote } from "./Label";
import { FormContext } from "../FormContainer";
import { NoteContext } from "./Note";
import useNoteOptions, { useDropdown } from "../Hooks/useNoteOptions";

const OptionsContext = createContext(null);

export { OptionsContext };

const NoteOptions = ({
  containerRef,
  iconRef,
  optionButtonRef,
  isNote = true,
  labelList,
  setLabelList,
  handleDelete,
  type,
}) => {
  const { show, cords, showLabel, setShow, setShowLabel, handleOptionsClick } =
    useNoteOptions(containerRef, iconRef, isNote);

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
          type,
          isNote,
        }}
      >
        <button
          ref={optionButtonRef}
          onClick={handleOptionsClick}
          style={{ display: "none" }}
        ></button>
        {isNote ? (
          <NoteOptionDropdown />
        ) : type === "form" ? (
          <FormOptionDropdown />
        ) : (
          <PopupOptionDropdown />
        )}
      </OptionsContext.Provider>
    </>
  );
};

const PopupOptionDropdown = () => {
  const {
    labelCords,
    labelRef,
    handleOptionDialogClick,
    handleLabelButtonClick,
    show,
    cords,
    showLabel,
    labelList,
    setLabelList,
  } = useDropdown();

  const { handleDelete } = useContext(OptionsContext);

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
        height={"102px"}
        onClick={handleOptionDialogClick}
      >
        <StyledOptionsDiv onClick={handleDelete}>
          <StyledOptionsContentDiv>Delete note</StyledOptionsContentDiv>
        </StyledOptionsDiv>
        <StyledOptionsDiv>
          <StyledOptionsContentDiv onClick={handleLabelButtonClick}>
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

const NoteOptionDropdown = () => {
  const {
    labelCords,
    labelRef,
    handleOptionDialogClick,
    handleLabelButtonClick,
    show,
    cords,
    showLabel,
    setLabelList,
    type,
    labelList,
  } = useDropdown();

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
        onClick={handleOptionDialogClick}
      >
        <StyledOptionsDiv onClick={handleDelete}>
          <StyledOptionsContentDiv>Delete note</StyledOptionsContentDiv>
        </StyledOptionsDiv>
        <StyledOptionsDiv>
          <StyledOptionsContentDiv onClick={handleLabelButtonClick}>
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
    labelCords,
    labelRef,
    handleOptionDialogClick,
    handleLabelButtonClick,
    show,
    cords,
    showLabel,
    labelList,
    setLabelList,
    type,
  } = useDropdown();

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
        onClick={handleOptionDialogClick}
      >
        <StyledOptionsDiv>
          <StyledOptionsContentDiv onClick={handleLabelButtonClick}>
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
