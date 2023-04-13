import { useState, memo, useCallback } from "react";

function TestMemo() {
  const [dummy, setDummy] = useState(Date.now);
  const [render, setRender] = useState(Date.now);

  const handleUpdate = useCallback(() => {
    setDummy(Date.now());
  }, []);

  const handleReRender = useCallback(() => {
    setRender(Date.now());
  }, []);

  return (
    <div>
      <Container
        dummy={dummy}
        render={render}
        handleUpdate={handleUpdate}
        handleReRender={handleReRender}
      />
    </div>
  );
}

function Container({ dummy, handleUpdate, handleReRender, render }) {
  return (
    <div>
      <RenderThis dummy={dummy} />
      <DoNotRender
        handleReRender={handleReRender}
        render={render}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}

function RenderThis({ dummy }) {
  return <div>Render {dummy}</div>;
}

const DoNotRender = memo(function DoNotRender({
  render,
  handleReRender,
  handleUpdate,
}) {
  console.log("rerendered");

  return (
    <div>
      <button onClick={handleUpdate}>Change Dummy</button>
      <button onClick={handleReRender}>Render on click{render}</button>
    </div>
  );
});

export default TestMemo;
