import { useState, useEffect, memo, useCallback, useRef } from "react";

const TestMemo = () => {
  const ref = useRef(null);

  const handleClick = () => {
    console.log(Date.now());
    console.log(ref.current.click());
  };

  return (
    <div>
      <Form handleClick={handleClick} reference={ref} />
      <UpdateButton handleClick={handleClick} />
    </div>
  );
};

const UpdateButton = ({ handleClick }) => {
  return <button onClick={handleClick}>Update</button>;
};

const Form = ({ handleClick, reference }) => {
  const [a, setA] = useState(Date.now());

  const updateHandler = () => {
    console.log("updated");
    setA(Date.now());
  };

  return (
    <div>
      {a}
      <button
        ref={reference}
        onClick={updateHandler}
        style={{ display: "none" }}
      >
        Handle
      </button>
    </div>
  );
};

export default TestMemo;
