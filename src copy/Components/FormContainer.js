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
import threedot from "./threedot.svg";

import NoteOptions from "./NoteComponents/NoteOptions";
import uploadIcon from "./image.svg";

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
    <FormWrapper>
      <StyledFormContainer ref={formContainerRef}>
        <FormImageContainer
          files={fileInput.files}
          removeSingleFile={fileInput.removeSingleFile}
        />
        {/* renmae note content info to something meaningul later */}
        <NoteContentInfo>
          <div>
            <div>
              <TitleDiv
                {...titleInputDiv.props}
                style={{ padding: "10px 15px" }}
              ></TitleDiv>
            </div>
            <div>
              <ContentDiv
                {...contentInputDiv.props}
                style={{ padding: "12px 16px" }}
              ></ContentDiv>
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
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
    0 2px 6px 2px rgba(60, 64, 67, 0.149);
  border-radius: 6px;
  box-sizing: border-box;
  margin: 16px;
`;

const StyledFormContainer = styled.div`
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  border: 1px solid transparent;
  border-radius: 6px;
  box-sizing: border-box;
  position: relative;
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
      <AddButton handleSubmit={handleSubmit} />
    </ControlsContainerStyled>
  );
};

const AddButton = ({ handleSubmit }) => {
  return (
    <StyledButton onClick={handleSubmit} style={{ marginRight: "16px" }}>
      Add
    </StyledButton>
  );
};

const Widgets = ({ uploadBtnRef, formContainerRef }) => {
  return (
    <StyledWidgetWrapper>
      <ImageUploaderIconContainer uploadBtnRef={uploadBtnRef} />
      <NoteOptionsIconContainer containerRef={formContainerRef} />
    </StyledWidgetWrapper>
  );
};

const ImageUploaderIconContainer = ({ uploadBtnRef }) => {
  const handleClick = () => {
    uploadBtnRef.current.click();
  };

  return (
    <StyledControlsIcons
      img={uploadIcon}
      className="image-uploader"
      onClick={handleClick}
    ></StyledControlsIcons>
  );
};

const NoteOptionsIconContainer = ({ containerRef }) => {
  const iconRef = useRef(null);
  const optionButtonRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();
    optionButtonRef.current.click();
  };

  return (
    <>
      <StyledControlsIcons
        ref={iconRef}
        img={threedot}
        onClick={handleClick}
      ></StyledControlsIcons>
      <NoteOptions
        containerRef={containerRef}
        iconRef={iconRef}
        optionButtonRef={optionButtonRef}
        isNote={false}
      />
    </>
  );
};

const StyledWidgetWrapper = styled.div`
  display: flex;
`;

const StyledControlsIcons = styled.div`
  width: 32px;
  height: 32px;
  margin: 0 8px;

  color: #202124;
  opacity: 0.71;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 18px 18px;
  border-radius: 50%;
  border: 1px solid transparent;
  cursor: pointer;
  background-image: url(${(props) => props.img});

  &:hover {
    border-radius: 50%;
    background-color: gray;
    opacity: 0.87;
    background-color: rgba(95, 99, 104, 0.157);
  }
`;

export default FormContainer;