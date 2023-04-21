import { useState, useEffect, useRef, createContext, useContext } from "react";
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
  NoteContentInfo,
} from "../Components/StyledComponents/StyledComponents";

import Controls from "./NoteComponents/Controls";
import {
  StyledFooterWrapper,
  StyledLabelWrapper,
  LastUpdated,
  StyledLabel,
  LabelDeleteButton,
  StyledLabelButton,
} from "./StyledComponents/StyledPopupComponents";

import NoteOptions from "./NoteComponents/NoteOptions";
import uploadIcon from "./Resources/image.svg";
import threedot from "./Resources/threedot.svg";

import { useFormGetLabelList } from "./Hooks/useLabels";
import { ContainerContext } from "./Container";
import Footer from "./NoteComponents/Footer";

const FormContext = createContext(null);

export { FormContext };

const FormContainer = ({ addNote }) => {
  const fileInput = useFileInput();
  const contentInputDiv = useEditableDiv("content");
  const titleInputDiv = useEditableDiv("title");
  const uploadBtnRef = useRef(null);
  const formContainerRef = useRef(null);

  const { labels } = useContext(ContainerContext);
  const { labelList, setLabelList } = useFormGetLabelList(labels);

  const handleSubmit = () => {
    if (titleInputDiv.empty || contentInputDiv.empty) {
      console.log("input fields cant be empty"); //I dont want to implement input errors now
      return;
    }

    addNote({
      title: titleInputDiv.value,
      content: contentInputDiv.value,
      labels: labels.filter((label) => {
        return labelList.find(({ id }) => id === label._id.toString()).checked;
      }),
      images: fileInput.files,
    });

    contentInputDiv.resetValue();
    titleInputDiv.resetValue();
    fileInput.resetFiles();
  };

  return (
    <FormContext.Provider value={{ labelList, setLabelList }}>
      <FormWrapper>
        <StyledFormContainer ref={formContainerRef}>
          <FormImageContainer
            files={fileInput.files}
            removeSingleFile={fileInput.removeSingleFile}
          />
          {/* rename note content info to something meaningul later */}
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
            <Footer labelList={labelList} />
          </NoteContentInfo>
          <FileInput inputProps={fileInput.props} uploadBtnRef={uploadBtnRef} />
          <Controls
            type={"form"}
            uploadBtnRef={uploadBtnRef}
            handleSubmit={handleSubmit}
            containerRef={formContainerRef}
            labelList={labelList}
            setLabelList={setLabelList}
            show={true}
          />
        </StyledFormContainer>
      </FormWrapper>
    </FormContext.Provider>
  );
};

const Footer1 = () => {
  const { labelList } = useContext(FormContext);

  return (
    <StyledFooterWrapper showFooter={true}>
      {labelList.some((label) => label.checked === true)
        ? labelList
            .filter((label) => {
              return label.checked;
            })
            .map((label) => <LabelDisplay key={label.id} label={label} />)
        : null}
    </StyledFooterWrapper>
  );
};

const LabelDisplay = ({ label }) => {
  return (
    <StyledLabelWrapper>
      <StyledLabelButton>
        <StyledLabel>{label.name}</StyledLabel>
      </StyledLabelButton>
      <LabelDeleteButton></LabelDeleteButton>
    </StyledLabelWrapper>
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

export default FormContainer;
