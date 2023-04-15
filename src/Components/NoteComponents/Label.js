import { useState, memo, useCallback } from "react";
import styled from "styled-components";

function Label() {
  return (
    <StyledLabelContainer>
      <StyledWrapperTitle>Label note</StyledWrapperTitle>
      <LabelSearch />
      <LabelDisplay />
      {/* <NewLabelButton /> */}
    </StyledLabelContainer>
  );
}

const LabelDisplay = () => {
  return (
    <StyledLabelDisplay>
      <MenuItemCheckbox />
      <MenuItemCheckbox /> <MenuItemCheckbox /> <MenuItemCheckbox />
      <MenuItemCheckbox /> <MenuItemCheckbox /> <MenuItemCheckbox />
      <MenuItemCheckbox /> <MenuItemCheckbox />
    </StyledLabelDisplay>
  );
};

const MenuItemCheckbox = () => {
  return (
    <StyledMenuItemCheckbox>
      <StyledCheckBox></StyledCheckBox>
      <StyledLabelName>label</StyledLabelName>
    </StyledMenuItemCheckbox>
  );
};

const StyledMenuItemCheckbox = styled.div`
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
  /* background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDAwIj4KICA8cGF0aCBkPSJNMTkgNXYxNEg1VjVoMTRtMC0ySDVjLTEuMSAwLTIgLjktMiAydjE0YzAgMS4xLjkgMiAyIDJoMTRjMS4xIDAgMi0uOSAyLTJWNWMwLTEuMS0uOS0yLTItMnoiLz4KPC9zdmc+Cg==); */
  /* background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMTkgM0g1Yy0xLjEgMC0yIC45LTIgMnYxNGMwIDEuMS45IDIgMiAyaDE0YzEuMSAwIDItLjkgMi0yVjVjMC0xLjEtLjktMi0yLTJ6bTAgMTZINVY1aDE0djE0eiIvPgogIDxwYXRoIGQ9Ik0xOCA5bC0xLjQtMS40LTYuNiA2LjYtMi42LTIuNkw2IDEzbDQgNHoiLz4KPC9zdmc+Cg==); */
  -webkit-background-size: 18px 18px;
  background-size: 18px 18px; ;;
`;

const StyledLabelDisplay = styled.div`
  max-height: 250px;
  overflow-y: auto;
  padding: 6px 0;
  position: relative;
  width: 100%;
`;

const LabelSearch = () => {
  return (
    <StyledSearchContainer>
      <StyledSearchIcon></StyledSearchIcon>
      <StyledearchInput placeholder="Enter label name"></StyledearchInput>
    </StyledSearchContainer>
  );
};

const NewLabelButton = () => {
  return (
    <StyledNewLabelButton>
      <div style={{ cursor: "pointer" }}>
        <StyledPlusIcon></StyledPlusIcon>
        <StyledAddLabelContent>
          Create ‘<StyledSpan>asasa</StyledSpan>’
        </StyledAddLabelContent>
      </div>
      <StyledLimitWarning>
        Label limit reached. Delete an existing label to add a new one.
      </StyledLimitWarning>
    </StyledNewLabelButton>
  );
};

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
