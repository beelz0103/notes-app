import styled from "styled-components";
import Container from "./Container";
import Sidebar from "./Sidebar";
import { useRef } from "react";
import { useGetAllLabels } from "./Hooks/useLabels";
import Tooltip from "./Tootip";
import { useState } from "react";

const NotesContainer = ({ sidebarRef, toggleLabel }) => {
  const labels = useGetAllLabels();

  return (
    <div>
      {/* implement select note header later */}
      <div className="select-note-header"></div>
      <div style={{ display: "flex" }}>
        <Sidebar
          sidebarRef={sidebarRef}
          toggleLabel={toggleLabel}
          labels={labels}
        />
        <Container toggleLabel={toggleLabel} labels={labels} />
      </div>
    </div>
  );
};

export default NotesContainer;
