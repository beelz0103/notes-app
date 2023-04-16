import "./App.css";
import Container from "./Components/Container";

import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import NotesContainer from "./Components/NotesContainer";
import { useRef } from "react";
import TestMemoCopy from "./TestMemo copy 2";
import TestMemo from "./TestMemo.js";

function App() {
  //return <TestMemoCopy />;
  return <TestMemo />;
  const sidebarRef = useRef(null);

  return (
    <div>
      <Header sidebarRef={sidebarRef} />
      <NotesContainer sidebarRef={sidebarRef} />
    </div>
  );
}

export default App;
