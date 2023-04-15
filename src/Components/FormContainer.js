import { useState, useEffect, useRef } from "react";
import useFileInput from "./Hooks/useFileInput";
import useEditableDiv from "./Hooks/useEditableDiv";
import FileInput from "./FormComponents/FileInput";
import DivInput from "./FormComponents/DivInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FormImageContainer from "./FormComponents/FormImageContainer";
import styled from "styled-components";
import { StyledButton } from "./StyledComponents/StyledPopupComponents";
import {
  StyledContentDiv,
  StyledTitleDiv,
} from "./StyledComponents/StyledPopupComponents";
import {
  TitleDiv,
  ContentDiv,
  FooterDiv,
  NoteContentInfo,
} from "../Components/StyledComponents/StyledComponents";

import NoteOptions from "./NoteComponents/NoteOptions";

const FormContainer = ({ addNote }) => {
  const fileInput = useFileInput();
  const contentInputDiv = useEditableDiv("content");
  const titleInputDiv = useEditableDiv("title");
  const uploadBtnRef = useRef(null);
  const formContainerRef = useRef(null);

  const handleSubmit = () => {
    if (titleInputDiv.empty || contentInputDiv.empty) {
      console.log("input fields cant be empty"); //I dont want to implement input errors now
      return;
    }

    addNote({
      title: titleInputDiv.value,
      content: contentInputDiv.value,
      images: fileInput.files,
    });

    contentInputDiv.resetValue();
    titleInputDiv.resetValue();
    fileInput.resetFiles();
  };

  return (
    <StyledFormContainer ref={formContainerRef}>
      <FormImageContainer
        files={fileInput.files}
        removeSingleFile={fileInput.removeSingleFile}
      />
      {/* renmae note content info to something meaningul later */}
      <NoteContentInfo>
        <div>
          <div>
            <TitleDiv {...titleInputDiv.props}></TitleDiv>
          </div>
          <div>
            <ContentDiv {...contentInputDiv.props}></ContentDiv>
          </div>
        </div>
        <FooterDiv></FooterDiv>
      </NoteContentInfo>
      <FileInput inputProps={fileInput.props} uploadBtnRef={uploadBtnRef} />
      <Controls
        formContainerRef={formContainerRef}
        handleSubmit={handleSubmit}
        uploadBtnRef={uploadBtnRef}
      />
    </StyledFormContainer>
  );
};

const StyledFormContainer = styled.div`
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
    0 2px 6px 2px rgba(60, 64, 67, 0.149);
  border: solid transparent;
  border-radius: 6px;
  box-sizing: border-box;
  margin: 16px;
`;

const Controls = ({ handleSubmit, uploadBtnRef, formContainerRef }) => {
  return (
    <ControlWrapper
      formContainerRef={formContainerRef}
      handleSubmit={handleSubmit}
      uploadBtnRef={uploadBtnRef}
    />
  );
};

const ControlsContainerStyled = styled.div`
  margin: 4px 0;
  display: flex;
  justify-content: space-between;

  box-shadow: ${(props) =>
    props.showShadow ? "0 -2px 5px rgba(0,0,0,.2)" : "none"};
`;

const ControlWrapper = ({ handleSubmit, uploadBtnRef, formContainerRef }) => {
  return (
    <ControlsContainerStyled>
      <Widgets
        uploadBtnRef={uploadBtnRef}
        formContainerRef={formContainerRef}
      />
      <div style={{ display: "flex" }}>
        <AddButton handleSubmit={handleSubmit} />
      </div>
    </ControlsContainerStyled>
  );
};

const Widgets = ({ uploadBtnRef, formContainerRef }) => {
  const iconRef = useRef(null);

  return (
    <div className="controllls widgets">
      <div
        className="image-uploader"
        onClick={() => {
          uploadBtnRef.current.click();
        }}
      ></div>
      {/* offSet is from margin */}
      <div ref={iconRef}>
        <NoteOptions
          iconRef={iconRef}
          containerRef={formContainerRef}
          offSet={16}
        />
      </div>
    </div>
  );
};

const AddButton = ({ handleSubmit }) => {
  return (
    <StyledButton onClick={handleSubmit} style={{ margin: 0 }}>
      Add
    </StyledButton>
  );
};

export default FormContainer;
