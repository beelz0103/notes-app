import "./App.css";
import Header from "./Components/Header";
import NotesContainer from "./Components/NotesContainer";
import { useRef } from "react";
import Test from "./Test";
import useToggleLabel from "./Components/Hooks/useToggleLabel";

function App() {
  //return <Test />;
  const sidebarRef = useRef(null);
  const toggleLabel = useToggleLabel();

  return (
    <div>
      <Header sidebarRef={sidebarRef} toggleLabel={toggleLabel} />
      <NotesContainer sidebarRef={sidebarRef} toggleLabel={toggleLabel} />
    </div>
  );
}

export default App;
