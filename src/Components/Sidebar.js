import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useSidebarDimensions from "./Hooks/useSidebarDimensions";
import { createContext, useContext } from "react";
import pathStrings from "./pathstrings";
import GoogleSans from "./Resources/google-sans-cufonfonts-webfont/ProductSans-Medium.woff";

const SidebarContext = createContext(null);

const Sidebar = ({ sidebarRef, toggleLabel, labels }) => {
  const {
    handleClick,
    handleMouseLeave,
    handleMouseOver,
    mainSidebarRef,
    mediaWidth,
    minWidth,
    width,
  } = useSidebarDimensions();

  return (
    <div>
      <SidebarContext.Provider
        value={{ mediaWidth, minWidth, width, toggleLabel, labels }}
      >
        <StyledWrapped
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          <ToggleButton sidebarRef={sidebarRef} handleClick={handleClick} />
          <StyledPlaceholder
            mediaWidth={mediaWidth}
            minWidth={minWidth}
          ></StyledPlaceholder>
          <StyledSidebar
            ref={mainSidebarRef}
            mediaWidth={mediaWidth}
            width={width}
          >
            <ItemContainer mediaWidth={mediaWidth} width={width} />
          </StyledSidebar>
        </StyledWrapped>
      </SidebarContext.Provider>
    </div>
  );
};

const ItemContainer = () => {
  return (
    <>
      <SpecialItem label={{ name: "Home", isSpecial: true }} />
      <LabelContainer />
      <SpecialItem label={{ name: "Archive", isSpecial: true }} />
      <SpecialItem label={{ name: "Bin", isSpecial: true }} />
    </>
  );
};

const ToggleButton = ({ sidebarRef, handleClick }) => (
  <HiddenButton ref={sidebarRef} onClick={handleClick}></HiddenButton>
);

const HiddenButton = styled.button`
  display: none;
`;

const LabelContainer = () => {
  const { labels } = useContext(SidebarContext);
  return (
    <>
      {labels.map((label) => (
        <LabelItem key={label._id} label={label} />
      ))}
    </>
  );
};

const LabelItem = ({ label }) => {
  const { mediaWidth, width, toggleLabel } = useContext(SidebarContext);

  const handleClick = () => {
    toggleLabel.updateCurrentLabel(label);
  };

  return (
    <Link to={`#label/${label.name}`} style={{ textDecoration: "none" }}>
      <StyledItem
        onClick={handleClick}
        mediaWidth={mediaWidth}
        width={width}
        backgroundProp={toggleLabel.displayLabel === label ? "#feefc3" : ""}
      >
        <Icon label={label}></Icon>
      </StyledItem>
    </Link>
  );
};

const SpecialItem = ({ label }) => {
  const { mediaWidth, width, toggleLabel } = useContext(SidebarContext);

  const handleClick = () => {
    toggleLabel.updateCurrentLabel(label);
    console.log(label);
  };

  return (
    <Link
      to={`#${label.name.toLowerCase()}`}
      style={{ textDecoration: "none" }}
    >
      <StyledItem
        onClick={handleClick}
        mediaWidth={mediaWidth}
        width={width}
        backgroundProp={
          toggleLabel.displayLabel.name === label.name ? "#feefc3" : ""
        }
      >
        <Icon label={label}></Icon>
      </StyledItem>
    </Link>
  );
};

const Icon = ({ label }) => {
  const { toggleLabel } = useContext(SidebarContext);

  return (
    <>
      <StyledSvg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        pathFill={
          toggleLabel.displayLabel.name === label.name ? "#202124" : "#5f6368"
        }
      >
        <path
          d={label.isSpecial ? pathStrings[label.name] : pathStrings.label}
        ></path>
        <path
          d={label.isSpecial && label.name === "Bin" ? pathStrings["Bin2"] : ""}
        ></path>
      </StyledSvg>
      <StyledSpan fonturl={GoogleSans}>{label.name}</StyledSpan>
    </>
  );
};

const StyledSpan = styled.span`
  @font-face {
    font-family: "Google Sans";
    src: url(${(props) => props.fonturl}) format("woff");
  }

  font-family: "Google Sans";
  pointer-events: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 20px;
  font-weight: 500;
`;

const StyledSvg = styled.svg`
  pointer-events: none;
  flex-shrink: 0;
  padding: 0 12px;
  fill: ${(props) => props.pathFill};
`;

const StyledWrapped = styled.div`
  z-index: 3;
`;

const StyledPlaceholder = styled.div`
  background: transparent;
  position: relative;
  min-width: ${(props) => props.minWidth};
  z-index: 1;

  @media only screen and (max-width: ${(props) => props.mediaWidth}) {
    min-width: 80px;
  }
`;

const StyledItem = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&family=Roboto&display=swap");

  transition-duration: 150ms;
  transition-property: margin, width, padding, border-radius;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

  cursor: pointer;
  box-sizing: border-box;
  border: 1px solid transparent;
  border-radius: 0 25px 25px 0;
  color: #202124;
  display: flex;
  align-items: center;
  font-family: "Roboto", Arial, sans-serif;
  font-size: 0.875rem;
  height: 48px;
  min-width: 48px;
  overflow: hidden;
  width: 100%;
  padding-left: 12px;
  background-color: ${(props) => props.backgroundProp};

  border-radius: ${(props) =>
    props.width === "280px" ? "0 25px 25px 0" : "50%"};
  margin-left: ${(props) => props.width !== "280px" && "12px"};
  padding: ${(props) => (props.width === "280px" ? "0 0 0 12px" : "0 0 0 0")};
  width: ${(props) => (props.width === "280px" ? "100%" : "48px")};

  @media only screen and (max-width: ${(props) => props.mediaWidth}) {
    border-radius: 50%;
    margin-left: 12px;
    padding: 0;
    width: 48px;
  }
`;

const StyledSidebar = styled.div`
  box-sizing: border-box;
  width: 80px;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: calc(100% - 64px);
  min-height: auto;

  padding-top: 8px;
  position: fixed;
  top: 64px;
  transition-duration: 150ms;
  transition-property: width, box-shadow, border-radius;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  width: ${(props) => props.width};

  -webkit-transition-duration: 150ms;
  transition-duration: 150ms;
  -webkit-transition-property: width, box-shadow, border-radius;
  transition-property: width, box-shadow, border-radius;
  -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

  z-index: 2;

  &:hover {
    overflow-y: scroll;
  }

  @media only screen and (max-width: ${(props) => props.mediaWidth}) {
    width: 80px;

    &:hover {
      overflow-y: hidden;
    }
  }
`;

export default Sidebar;
