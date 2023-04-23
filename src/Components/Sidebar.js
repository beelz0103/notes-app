import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useSidebarDimensions from "./Hooks/useSidebarDimensions";
import { createContext, useContext } from "react";

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
      <HomeItem />
      <LabelContainer />
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
        <Icon
          name={label.name}
          pathString="M 17.63 5.84 C 17.27 5.33 16.67 5 16 5 L 5 5.01 C 3.9 5.01 3 5.9 3 7 v 10 c 0 1.1 0.9 1.99 2 1.99 L 16 19 c 0.67 0 1.27 -0.33 1.63 -0.84 L 22 12 l -4.37 -6.16 Z M 16 17 H 5 V 7 h 11 l 3.55 5 L 16 17 Z"
        ></Icon>
      </StyledItem>
    </Link>
  );
};

const HomeItem = () => {
  const { mediaWidth, width, toggleLabel } = useContext(SidebarContext);

  const handleClick = () => {
    toggleLabel.updateCurrentLabel(null);
  };

  return (
    <Link to={"#home"} style={{ textDecoration: "none" }}>
      <StyledItem
        onClick={handleClick}
        mediaWidth={mediaWidth}
        width={width}
        backgroundProp={toggleLabel.displayLabel === null ? "#feefc3" : ""}
      >
        <Icon
          name={"Notes"}
          pathString="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"
        />
      </StyledItem>
    </Link>
  );
};

const Icon = ({ pathString, name }) => {
  return (
    <>
      <StyledSvg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d={pathString}></path>
      </StyledSvg>
      <StyledSpan>{name}</StyledSpan>
    </>
  );
};

const StyledSpan = styled.span`
  pointer-events: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 20px;
`;

const StyledSvg = styled.svg`
  pointer-events: none;
  flex-shrink: 0;
  padding: 0 12px;
  fill: #202124;
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
  overflow: hidden;
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

  @media only screen and (max-width: ${(props) => props.mediaWidth}) {
    width: 80px;
  }
`;

export default Sidebar;
