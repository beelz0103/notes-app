import "./App.css";
import Header from "./Components/Header";
import NotesContainer from "./Components/NotesContainer";
import { useRef } from "react";
import Test from "./Test";

function App() {
  // return <Test />;
  const sidebarRef = useRef(null);

  return (
    <div>
      <Header sidebarRef={sidebarRef} />
      <NotesContainer sidebarRef={sidebarRef} />
    </div>
  );
}

export default App;
