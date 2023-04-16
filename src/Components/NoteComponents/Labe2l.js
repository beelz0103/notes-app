import { useState, memo, useCallback, useRef } from "react";
import styled from "styled-components";
import checkboxfalse from "../checkboxfalse.svg";
import checkboxtrue from "../checkboxtrue.svg";
import plus from "../plus.svg";
import useGetNotes from "../Hooks/useGetNotes";
import usePostData from "../Hooks/usePostData";
import {
  useGetLabels,
  usePostLabel,
  useNoteLabels,
  useGetAllLabels,
  useGetLabelList,
} from "../Hooks/useLabels";

const Label = () => {
  const [lastUpdate, setLastUpdate] = useState({});
  const notes = useGetNotes(lastUpdate.notes);
  const labels = useGetAllLabels(lastUpdate.labels);
  const { postLabel } = usePostLabel();

  const addLabel = async (label) => {
    const newLabel = await postLabel(
      "http://localhost:3001/label/create",
      label
    );
    setLastUpdate({ ...lastUpdate, labels: Date.now() });
    return newLabel;
  };

  return <Label2 note={notes[1]} labels={labels} addLabel={addLabel} />;
};

function Label2({ note, labels, addLabel }) {
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

  console.log(labelList);

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
    <StyledLabelContainer>
      <StyledWrapperTitle>Label note</StyledWrapperTitle>
      <LabelSearch searchLabel={searchLabel} inputRef={inputRef} />
      <LabelDisplay
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
    </StyledLabelContainer>
  );
}

const LabelDisplay = ({ labelList, toggleCheck }) => {
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

const LabelSearch = ({ searchLabel, inputRef }) => {
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
      <StyledPlusIcon></StyledPlusIcon>
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
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDAwIj4KICA8cGF0aCBkPSJNMTkgNXYxNEg1VjVoMTRtMC0ySDVjLTEuMSAwLTIgLjktMiAydjE0YzAgMS4xLjkgMiAyIDJoMTRjMS4xIDAgMi0uOSAyLTJWNWMwLTEuMS0uOS0yLTItMnoiLz4KPC9zdmc+Cg==);
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDAwIj4KICA8cGF0aCBkPSJNMTkgNXYxNEg1VjVoMTRtMC0ySDVjLTEuMSAwLTIgLjktMiAydjE0YzAgMS4xLjkgMiAyIDJoMTRjMS4xIDAgMi0uOSAyLTJWNWMwLTEuMS0uOS0yLTItMnoiLz4KPC9zdmc+Cg==);
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMTkgM0g1Yy0xLjEgMC0yIC45LTIgMnYxNGMwIDEuMS45IDIgMiAyaDE0YzEuMSAwIDItLjkgMi0yVjVjMC0xLjEtLjktMi0yLTJ6bTAgMTZINVY1aDE0djE0eiIvPgogIDxwYXRoIGQ9Ik0xOCA5bC0xLjQtMS40LTYuNiA2LjYtMi42LTIuNkw2IDEzbDQgNHoiLz4KPC9zdmc+Cg==);
  -webkit-background-size: 18px 18px;
  background-image: url(${(props) => props.checkbox});
  background-size: 18px 18px; ;;
`;

const StyledLabelDisplay = styled.div`
  max-height: 250px;
  overflow-y: auto;
  padding: 6px 0;
  position: relative;
  width: 100%;
`;

const StyledPlusIcon = styled.div`
  background: url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE4cHgiIHdpZHRoPSIxOHB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0iIzAwMDAwMCI+CiA8cGF0aCBkPSJtMzggMjZoLTEydjEyaC00di0xMmgtMTJ2LTRoMTJ2LTEyaDR2MTJoMTJ2NHoiLz4KIDxwYXRoIGQ9Im0wIDBoNDh2NDhoLTQ4eiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K)
    no-repeat center;
  display: inline-block;
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

const StyledLabelContainer = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&family=Roboto&display=swap");

  background-color: #fff;
  -webkit-border-radius: 2px;
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
`;

const StyledWrapperTitle = styled.div`
  cursor: default;
  font-size: 14px;
  padding: 0 12px;
`;

export default Label;
