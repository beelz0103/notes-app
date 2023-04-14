import styled from "styled-components";
import { useState, useRef, useEffect } from "react";

const Sidebar = ({ sidebarRef }) => {
  const [mediaWidth, setMediaWidth] = useState("620px");
  const [width, setWidth] = useState("280px");
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    if (window.innerWidth <= 620) {
      if (open) {
        console.log("280px");
        setWidth("280px");
        setMediaWidth("0px");
        return;
      }
    }
    if (open) {
      setOpen(false);
      setMediaWidth(window.innerWidth + "px");
    } else {
      setOpen(true);
      setMediaWidth("620px");
    }
  };

  return (
    <div ref={sidebarRef} className="sidebar-container">
      <StyledPlaceholder
        mediaWidth={mediaWidth}
        width={width}
      ></StyledPlaceholder>
      <StyledSidebar mediaWidth={mediaWidth} width={width}>
        <NotesIcon mediaWidth={mediaWidth} width={width} />
        <button onClick={handleClick}>Open</button>
      </StyledSidebar>
    </div>
  );
};

const StyledPlaceholder = styled.div`
  background: transparent;
  position: relative;
  width: ${(props) => props.width};
  z-index: 984;

  @media only screen and (max-width: ${(props) => props.mediaWidth}) {
    min-width: 80px;
  }
`;

const StyledItem = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&family=Roboto&display=swap");

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
  background-color: #feefc3;

  /* @media only screen and (max-width: ${(props) => props.mediaWidth}) {
    border-radius: 50%;
    margin-left: 12px;
    padding: 0;
    width: 48px;
  } */
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
  z-index: 985;

  @media only screen and (max-width: ${(props) => props.mediaWidth}) {
    // width: 80px;
  }
`;

const NotesIcon = ({ mediaWidth }) => {
  return (
    <StyledItem mediaWidth={mediaWidth}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style={{
          flexShrink: 0,
          padding: "0 12px",
          fill: "#202124", //fill: #5f6368;
        }}
      >
        <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path>
      </svg>
      <span
        class="PvRhvb-ibnC6b-V67aGc"
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          marginLeft: "20px",
        }}
      >
        Notes
      </span>
    </StyledItem>
  );
};

export default Sidebar;
