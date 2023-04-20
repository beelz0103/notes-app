import { useState, useEffect, useRef, createContext, useContext } from "react";

import {
  StyledFooterWrapper,
  StyledLabelWrapper,
  LastUpdated,
  StyledLabel,
  LabelDeleteButton,
  StyledLabelButton,
} from "../StyledComponents/StyledPopupComponents";

const Footer = ({ note, labelList, noteLabels }) => {
  const [showFooter, setShowFooter] = useState(false);

  useState(() => {
    if (noteLabels !== 0) setShowFooter(true);
    else setShowFooter(false);
  }, [noteLabels]);

  return (
    <StyledFooterWrapper showFooter={showFooter}>
      {labelList.some((label) => label.checked === true)
        ? labelList
            .filter((label) => {
              return label.checked;
            })
            .map((label) => <LabelDisplay key={label.id} label={label} />)
        : null}
      <LastUpdated>Edited yesterday, 17:57</LastUpdated>
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
