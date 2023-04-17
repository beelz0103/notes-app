import { useState, useEffect, memo, useCallback, useRef } from "react";
import styled from "styled-components";

import threedot from "./Components/Resources/threedot.svg";

const TestChild = () => {
  return <ThreeDot />;
};

const ThreeDot = () => {
  const iconRef = useRef(null);
  const containerRef = useRef(null);
  const [show, setShow] = useState(false);
  const [cords, setCords] = useState({});

  const showOptions = () => {
    setShow(false);
    window.removeEventListener("resize", showOptions);
  };

  window.addEventListener("resize", showOptions);

  const handleClick = (e) => {
    e.stopPropagation();
    const hideOptions = (e) => {
      console.log(e);

      setShow(false);
      document.removeEventListener("click", hideOptions);
    };

    document.addEventListener("click", hideOptions);

    const iconCords = iconRef.current.getBoundingClientRect();
    const containerCords = containerRef.current.getBoundingClientRect();
    const iconX = iconCords.x - containerCords.x;
    const iconY = iconCords.y - containerCords.y;
    const windowHeight = window.innerHeight;

    if (windowHeight - iconCords.bottom >= 102) {
      const top = `${iconY + iconCords.height}px`;
      const left = `${iconX}px`;
      setCords({ top, left });
    } else {
      const top = `${iconY - 102}px`;
      const left = `${iconX}px`;
      setCords({ top, left });
    }
    setShow(!show);
  };

  return (
    <div
      ref={containerRef}
      style={{
        height: "300px",
        width: "300px",
        boxShadow:
          "0 1px 2px 0 rgba(60, 64, 67, 0.302), 0 2px 6px 2px rgba(60, 64, 67, 0.149)",
        position: "relative",
      }}
    >
      <div>
        <ControlButton
          ref={iconRef}
          onClick={handleClick}
          img={threedot}
        ></ControlButton>
        <OptionDropdown show={show} cords={cords} />
      </div>
    </div>
  );
};

const OptionDropdown = ({ show, cords }) => {
  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <StyledOptionDropDown show={show} cords={cords} onClick={handleClick}>
      <StyledOptionsDiv>
        <StyledOptionsContentDiv>Delete note</StyledOptionsContentDiv>
      </StyledOptionsDiv>
      <StyledOptionsDiv>
        <StyledOptionsContentDiv>Add label</StyledOptionsContentDiv>
      </StyledOptionsDiv>
      <StyledOptionsDiv>
        <StyledOptionsContentDiv>Made a copy</StyledOptionsContentDiv>
      </StyledOptionsDiv>
    </StyledOptionDropDown>
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
  height: 102px; //30px for each option item
  box-sizing: border-box;

  background-color: #fff;
  border-width: 0;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
    0 2px 6px 2px rgba(60, 64, 67, 0.149);
  border-radius: 4px;
  position: absolute;
  display: ${(props) => (props.show ? "block" : "none")};
  top: ${(props) => props.cords.top};
  left: ${(props) => props.cords.left};
`;

const ControlButton = styled.div`
  background-image: url(${(props) => props.img});
  width: 32px;
  height: 32px;
  margin: 0 8px;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 18px 18px;
  border-radius: 50%;
  border: 1px solid transparent;
  cursor: pointer;

  font-size: 18px;
  color: "#757575";
  opacity: 0.53;

  &:hover {
    border-radius: 50%;
    background-color: gray;
    opacity: 0.87;
    background-color: rgba(95, 99, 104, 0.157);
  }
`;

export default TestChild;