import { useRef } from "react";
import styled from "styled-components";
import AppLogo from "./AppLogo";
import SearchContainer from "./SearchContainer";
import { useState } from "react";
import Tooltip from "./Tootip";

const Header = ({ sidebarRef, toggleLabel }) => {
  const handleClick = () => {
    sidebarRef.current.click();
  };

  return (
    <div>
      <StyledHeader>
        <div style={{ display: "flex", alignItems: "center" }}>
          <HamburgerIcon handleClick={handleClick} />
          <AppLogo toggleLabel={toggleLabel} />
        </div>

        <SearchContainer />
      </StyledHeader>
      <div style={{ height: "64px" }}></div>
    </div>
  );
};

const HamburgerIcon = ({ handleClick }) => {
  const [fill, setFill] = useState("#5f6368");

  return (
    <StyledIcon onClick={handleClick}>
      <svg focusable="false" viewBox="0 0 24 24">
        <path
          style={{ fill: fill }}
          d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
        ></path>
      </svg>
    </StyledIcon>
  );
};

const StyledIcon = styled.div`
  border-radius: 50%;
  display: inline-block;
  margin: 0 4px;
  padding: 12px;
  overflow: hidden;
  vertical-align: middle;
  cursor: pointer;
  height: 24px;
  width: 24px;
  color: #5f6368;
  flex: 0 0 auto;
  color: aqua;

  &:hover {
    border-radius: 50%;
    background-color: gray;
    opacity: 0.87;
    background-color: rgba(95, 99, 104, 0.157);
  }
`;

const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 64px;
  box-shadow: inset 0 -1px 0 0 #dadce0;
  padding: 8px;
  box-sizing: border-box;
  color: #5f6368;
  background-color: white;
  z-index: 3;
`;

export default Header;
