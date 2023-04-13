import { useState, useEffect, memo, useCallback } from "react";

const useEditableDivUpdate = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  console.log("initial value parameter: ", initialValue);
  console.log("value state: ", value);

  return { value };
};

const TestMemo = () => {
  const [value, setValue] = useState(Date.now());

  const updateValue = () => {
    setValue(Date.now());
  };

  return (
    <div>
      <button onClick={updateValue}>Update</button>
      <TestMemoChild value={value} />
    </div>
  );
};

const TestMemoChild = ({ value }) => {
  const memoDiv = useEditableDivUpdate(value);

  return <div>{memoDiv.value}</div>;
};

export default TestMemo;
