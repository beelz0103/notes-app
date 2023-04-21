import { useState, useEffect, useRef, createContext, useContext } from "react";
import styled from "styled-components";
import {
  StyledLabelWrapper,
  LastUpdated,
  StyledLabel,
  LabelDeleteButton,
  StyledLabelButton,
  StyledFooterWrapper,
} from "../StyledComponents/StyledPopupComponents";

const Footer = ({ labelList, type }) => {
  const showFooter = labelList.some((label) => label.checked);

  return (
    <StyledFooterWrapper showFooter={showFooter}>
      {labelList.some((label) => label.checked === true)
        ? labelList
            .filter((label) => {
              return label.checked;
            })
            .map((label) => <LabelDisplay key={label.id} label={label} />)
        : null}
      {type !== "notepopup" ? null : (
        <LastUpdated>Edited yesterday, 17:57</LastUpdated>
      )}
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

export default Footer;
