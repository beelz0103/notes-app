import styled from "styled-components";
import notecheck from "../Resources/notecheck.svg";
import { useContext } from "react";
import { NoteContext } from "./Note";

const Checkbox = () => {
  const { widgetVisible } = useContext(NoteContext);

  return (
    <StyledCheckbox
      widgetVisible={widgetVisible}
      img={notecheck}
    ></StyledCheckbox>
  );
};

export default Checkbox;
const StyledCheckbox = styled.div`
  user-select: none;

  /* opacity: 1 !important; */

  background-color: #fff;

  background-image: url(${(props) => props.img});

  background-size: 24px 24px;
  border: none;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  height: 20px;
  left: 0;
  /* opacity: 0; */
  position: absolute;
  -webkit-transform: translate(-7px, -7px);
  transform: translate(-7px, -7px);
  -webkit-transition: background-color 0.218s linear, opacity 0.218s linear,
    transform 0.218s linear;
  transition: background-color 0.218s linear, opacity 0.218s linear,
    transform 0.218s linear;
  width: 20px;
  z-index: 201;

  background-position: center;
  background-repeat: no-repeat;

  cursor: pointer;
  display: inline-block;
  outline: none !important;

  pointer-events: auto;

  opacity: ${(props) => (props.widgetVisible ? "1" : "0")};
`;
