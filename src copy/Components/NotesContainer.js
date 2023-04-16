import styled from "styled-components";
import Container from "./Container";
import Sidebar from "./Sidebar";
import { useRef } from "react";

const NotesContainer = ({ sidebarRef }) => {
  return (
    <div>
      {/* implement select note header later */}
      <div className="select-note-header"></div>
      <div style={{ display: "flex" }}>
        <Sidebar sidebarRef={sidebarRef} />
        <Container />
      </div>
    </div>
  );
};

export default NotesContainer;
