import styled from "styled-components";

const Modal = styled.div`
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  background-color: #202124;

  position: fixed;

  z-index: 10;

  display: none;

  opacity: ${(props) => (props.display === "flex" ? 0.6 : 0)};
  transition: opacity 0.218s ease-in;
`;

export { Modal };
