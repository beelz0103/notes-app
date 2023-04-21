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
import { DateTime } from "luxon";

const formattedDate = (note) => {
  const today = DateTime.now().day;
  const year = DateTime.now().year;
  const noteDt = DateTime.fromISO(note.updatedAt);
  const noteDay = noteDt.day;
  const noteYear = noteDt.year;

  if (noteDay - today === 0) return `Edited ${noteDt.toFormat("hh:mm a")}`;
  if (noteDay - today === 1)
    return `Edited yesterday ${noteDt.toFormat("hh:mm a")}`;
  if (noteYear - year === 0) return `Edited ${noteDt.toFormat("LLL dd")}`;
  return `Edited ${noteDt.toFormat("LLL dd yyyy")}`;
};

const Footer = ({ labelList, type, note }) => {
  const showFooter =
    labelList.some((label) => label.checked) || type === "notepopup";

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
        <LastUpdated>{formattedDate(note)}</LastUpdated>
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
