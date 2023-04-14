import "./App.css";
import Container from "./Components/Container";
import TestMemo from "./TestMemo";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import NotesContainer from "./Components/NotesContainer";
import { useRef } from "react";

function App() {
  //return <TestMemo />;
  const sidebarRef = useRef(null);

  return (
    <div>
      <Header sidebarRef={sidebarRef} />
      <NotesContainer sidebarRef={sidebarRef} />
    </div>
  );
}

export default App;
