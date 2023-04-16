import { useState, useEffect, memo, useCallback, useRef } from "react";
import styled from "styled-components";

const NoteOptions = ({
  containerRef,
  iconRef,
  optionButtonRef,
  isNote = true,
}) => {
  const [show, setShow] = useState(false);
  const [cords, setCords] = useState({});

  const handleClick = (e) => {
    console.log(e);
    e.stopPropagation();

    const showOptions = () => {
      setShow(false);
      window.removeEventListener("resize", showOptions);
    };

    window.addEventListener("resize", showOptions);

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
    <>
      <button
        ref={optionButtonRef}
        onClick={handleClick}
        style={{ display: "none" }}
      ></button>
      {isNote ? (
        <NoteOptionDropdown show={show} cords={cords} />
      ) : (
        <FormOptionDropdown show={show} cords={cords} />
      )}
    </>
  );
};

const NoteOptionDropdown = ({ show, cords }) => {
  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <StyledOptionDropDown
      show={show}
      cords={cords}
      height={"102px"}
      onClick={handleClick}
    >
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

const FormOptionDropdown = ({ show, cords }) => {
  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <StyledOptionDropDown
      show={show}
      cords={cords}
      height={"42px"}
      onClick={handleClick}
    >
      <StyledOptionsDiv>
        <StyledOptionsContentDiv>Add label</StyledOptionsContentDiv>
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
  height: ${(props) => props.height} // 30px for each option item
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
`;

export default NoteOptions;
