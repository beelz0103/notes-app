const DivInput = ({ props, className }) => {
  return (
    <div className="editable-div-container">
      <div {...props}></div>
    </div>
  );
};

export default DivInput;
