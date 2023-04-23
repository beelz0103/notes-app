import styled from "styled-components";
import Container from "./Container";
import Sidebar from "./Sidebar";
import { useRef } from "react";
import { useGetAllLabels } from "./Hooks/useLabels";
import { useState } from "react";

const NotesContainer = ({ sidebarRef, toggleLabel }) => {
  const [lastUpdate, setLastUpdate] = useState({});
  const labels = useGetAllLabels(lastUpdate);

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
        <Container
          toggleLabel={toggleLabel}
          labels={labels}
          lastUpdate={lastUpdate}
          setLastUpdate={setLastUpdate}
        />
      </div>
    </div>
  );
};

export default NotesContainer;
