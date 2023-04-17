import { useState, useRef, useContext } from "react";
import styled from "styled-components";

import {
  useNoteLabels,
  useGetLabelList,
  useFormGetLabelList,
} from "../Hooks/useLabels";
import { ContainerContext } from "../Container";

import checkboxfalse from "../Resources/checkboxfalse.svg";
import checkboxtrue from "../Resources/checkboxtrue.svg";
import plus from "../Resources/plus.svg";

function LabelForForm({ cords, showLabel, labelRef }) {
  console.log("Label has been shown?,", showLabel);

  const inputRef = useRef(null);
  const { addLabel, labels } = useContext(ContainerContext);
  const { labelList, setLabelList } = useFormGetLabelList(labels);

  const [searchLabelList, setSearchLabelList] = useState(null);

  const handleLabelSubmit = async (e) => {
    const name = inputRef.current.value;
    const newLabel = await addLabel(name);
    console.log(newLabel);
    console.log(labelList);
    setLabelList(
      labelList.concat({ name: newLabel.name, id: newLabel._id, checked: true })
    );
    setSearchLabelList(null);
    inputRef.current.value = "";
  };

  const toggleCheck = ({ id }) => {
    const newLabelList = labelList.map((label) =>
      label.id === id ? { ...label, checked: !label.checked } : label
    );

    setLabelList(newLabelList);

    if (!searchLabelList) return;

    const newSearchList = searchLabelList.map((label) =>
      label.id === id ? { ...label, checked: !label.checked } : label
    );

    setSearchLabelList(newSearchList);
  };

  const searchLabel = (searchText) => {
    const filteredLabels = labelList.filter(({ name }) =>
      name.toUpperCase().includes(searchText.toUpperCase())
    );

    if (searchText === "") setSearchLabelList(null);
    else setSearchLabelList(filteredLabels);
  };

  return (
    <LabelWrapper ref={labelRef} showLabel={showLabel} cords={cords}>
      <LabelHeader>Label note</LabelHeader>
      <Search searchLabel={searchLabel} inputRef={inputRef} />
      <Display
        labelList={searchLabelList ? searchLabelList : labelList}
        toggleCheck={toggleCheck}
      />
      {searchLabelList && searchLabelList.length === 0 ? (
        <NewLabelButton
          labelList={labelList}
          handleLabelSubmit={handleLabelSubmit}
          inputRef={inputRef}
        />
      ) : null}
    </LabelWrapper>
  );
}

function Label({ note, labels, addLabel }) {
  const inputRef = useRef(null);

  const { updateNoteLabels, noteLabels } = useNoteLabels(note);
  const labelList = useGetLabelList(labels, noteLabels);

  const [searchLabelList, setSearchLabelList] = useState(null);

  const handleLabelSubmit = async (e) => {
    const name = inputRef.current.value;
    const newLabel = await addLabel(name);
    updateNoteLabels(note._id, newLabel._id, false);
    setSearchLabelList(null);
    inputRef.current.value = "";
  };

  const toggleCheck = ({ id, checked }) => {
    updateNoteLabels(note._id, id, checked);

    if (!searchLabelList) return;

    const newSearchList = searchLabelList.map((label) =>
      label.id === id ? { ...label, checked: !label.checked } : label
    );

    setSearchLabelList(newSearchList);
  };

  const searchLabel = (searchText) => {
    const filteredLabels = labelList.filter(({ name }) =>
      name.toUpperCase().includes(searchText.toUpperCase())
    );

    if (searchText === "") setSearchLabelList(null);
    else setSearchLabelList(filteredLabels);
  };

  return (
    <LabelWrapper>
      <LabelHeader>Label note</LabelHeader>
      <Search searchLabel={searchLabel} inputRef={inputRef} />
      <Display
        labelList={searchLabelList ? searchLabelList : labelList}
        toggleCheck={toggleCheck}
      />
      {searchLabelList && searchLabelList.length === 0 ? (
        <NewLabelButton
          labelList={labelList}
          handleLabelSubmit={handleLabelSubmit}
          inputRef={inputRef}
        />
      ) : null}
    </LabelWrapper>
  );
}

const Display = ({ labelList, toggleCheck }) => {
  return (
    <StyledLabelDisplay>
      {labelList.map((label) => {
        return (
          <MenuItemCheckbox
            key={label.id}
            label={label}
            toggleCheck={toggleCheck}
          />
        );
      })}
    </StyledLabelDisplay>
  );
};

const MenuItemCheckbox = ({ label, toggleCheck }) => {
  const handleClick = () => {
    toggleCheck(label);
  };

  return (
    <StyledMenuItemCheckbox onClick={handleClick} selected={label.checked}>
      <StyledCheckBox
        checkbox={label.checked ? checkboxtrue : checkboxfalse}
      ></StyledCheckBox>
      <StyledLabelName>{label.name}</StyledLabelName>
    </StyledMenuItemCheckbox>
  );
};

const Search = ({ searchLabel, inputRef }) => {
  const handleChange = (e) => {
    searchLabel(e.target.value);
    //lol interesting console.log(e.target === inputRef.current) returns true
  };

  return (
    <StyledSearchContainer>
      <StyledSearchIcon></StyledSearchIcon>
      <StyledearchInput
        onChange={handleChange}
        placeholder="Enter label name"
        ref={inputRef}
      ></StyledearchInput>
    </StyledSearchContainer>
  );
};

const NewLabelButton = ({ handleLabelSubmit, inputRef, labelList }) => {
  const buttonDiv = (
    <div style={{ cursor: "pointer" }} onClick={handleLabelSubmit}>
      <StyledPlusIcon plus={plus}></StyledPlusIcon>
      <StyledAddLabelContent>
        Create ‘<StyledSpan>{inputRef.current.value}</StyledSpan>’
      </StyledAddLabelContent>
    </div>
  );

  const warningDiv = (
    <StyledLimitWarning>
      Label limit reached. Delete an existing label to add a new one.
    </StyledLimitWarning>
  );

  return (
    <StyledNewLabelButton>
      {labelList.length <= 100 ? buttonDiv : warningDiv}
    </StyledNewLabelButton>
  );
};

const StyledMenuItemCheckbox = styled.div`
  cursor: pointer;
  display: block;
  outline: none;
  padding: 5px 10px 3px;
  position: relative;
  background-color: ${(props) =>
    props.selected ? "rgba(95, 94, 104, 0.122)" : "white"};

  &:hover {
    background-color: ${(props) =>
      props.selected ? "rgba(95, 94, 104, 0.157)" : "rgba(95, 94, 104, 0.039)"};
  }
`;

const StyledLabelName = styled.div`
  display: inline-block;
  margin-left: 7px;
  max-width: 160px;
  padding-top: 2px;
  vertical-align: top;
  word-wrap: break-word;
`;

const StyledCheckBox = styled.div`
  display: inline-block;
  height: 18px;
  opacity: 0.54;
  width: 18px;
  background-image: url(${(props) => props.checkbox});
  background-size: 18px 18px;
`;

const StyledLabelDisplay = styled.div`
  max-height: 250px;
  overflow-y: auto;
  padding: 6px 0;
  position: relative;
  width: 100%;
`;

const StyledPlusIcon = styled.div`
  display: inline-block;
  background: url(${(props) => props.plus}) no-repeat center;
  height: 18px;
  opacity: 0.54;
  width: 18px;
`;

const StyledAddLabelContent = styled.div`
  display: inline-block;
  margin-left: 7px;
  max-width: 160px;
  padding-top: 2px;
  vertical-align: top;
  word-wrap: break-word;
`;

const StyledSpan = styled.span`
  font-weight: bold;
  word-break: break-all;
`;

const StyledNewLabelButton = styled.div`
  border-top: 1px solid #dadce0;
  cursor: pointer;
  display: block;
  outline: none;
  padding: 5px 10px 3px;
  position: relative;

  &:hover {
    background-color: rgba(95, 94, 104, 0.039);
    /* 0.122  when selected and 0.157 when hovered on select */
  }
`;

const StyledLimitWarning = styled.span`
  display: inline;

  font-style: italic;
  line-height: 17px;
  cursor: default;
`;

const StyledearchInput = styled.input`
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: auto;
  padding: 2px 22px 2px 2px;
  width: 100%;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid transparent;
  -webkit-box-shadow: none;
  box-shadow: none;
  color: #3c4043;
  font-size: 13px;
  font-family: "Roboto", arial, sans-serif;

  outline: none;
`;

const StyledSearchContainer = styled.div`
  padding: 8px 12px;
  position: relative;
  transition: box-shadow 0.218s;
`;

const StyledSearchIcon = styled.div`
  background: url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE4cHgiIHdpZHRoPSIxOHB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0iIzAwMDAwMCI+CiA8cGF0aCBkPSJtMzEgMjhoLTEuNTlsLTAuNTUtMC41NWMxLjk2LTIuMjcgMy4xNC01LjIyIDMuMTQtOC40NSAwLTcuMTgtNS44Mi0xMy0xMy0xM3MtMTMgNS44Mi0xMyAxMyA1LjgyIDEzIDEzIDEzYzMuMjMgMCA2LjE4LTEuMTggOC40NS0zLjEzbDAuNTUgMC41NXYxLjU4bDEwIDkuOTggMi45OC0yLjk4LTkuOTgtMTB6bS0xMiAwYy00Ljk3IDAtOS00LjAzLTktOXM0LjAzLTkgOS05IDkgNC4wMyA5IDktNC4wMyA5LTkgOXoiLz4KIDxwYXRoIGQ9Im0wIDBoNDh2NDhoLTQ4eiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K)
    no-repeat center;
  -webkit-background-size: 14px 14px;
  background-size: 14px 14px;
  height: 18px;
  opacity: 0.35;
  position: absolute;
  right: 11px;
  top: 8px;
  width: 18px;
`;

const LabelWrapper = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&family=Roboto&display=swap");

  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
    0 2px 6px 2px rgba(60, 64, 67, 0.149);
  font-size: 13px;
  max-width: 225px;
  padding-top: 11px;
  font-family: "Roboto", arial, sans-serif;
  width: 225px;
  z-index: 5003;
  opacity: 1;

  display: ${(props) => (props.showLabel ? "block" : "none")};

  position: absolute;
  top: ${(props) => props.cords.top};
  left: ${(props) => props.cords.left};
`;

const LabelHeader = styled.div`
  cursor: default;
  font-size: 14px;
  padding: 0 12px;
`;

export { Label, LabelForForm };
