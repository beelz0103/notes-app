import styled from "styled-components";

const PopupContainerStyled = styled.div.attrs()`
  margin: 16px;
  width: 600px;
  position: fixed;
  z-index: 1;
  top: 100px;
  background-color: white;
  left: 140px;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
    0 2px 6px 2px rgba(60, 64, 67, 0.149);
  border-radius: 6px;

  &:hover {
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
      0 2px 6px 2px rgba(60, 64, 67, 0.149);
    border-radius: 6px;
  }
`;

const PopupInnerContainer = styled.div`
  border: 1px solid transparent;
  border-color: #e0e0e0;
  border-radius: 5px;
  box-sizing: border-box;
`;

const NoteContentContainer = styled.div`
  min-height: 60px;
`;

const NoteContentImageContainer = styled.div``;

const NoteContentInfo = styled.div``;

const TitleDiv = styled.div`
  min-height: 38px;
  padding: 12px 16px 0px 16px;
  letter-spacing: 0.00625em;
  font-size: 1rem; //16px
  line-height: 1.5rem;
  font-weight: 500;
  box-sizing: border-box;
`;

const ContentDiv = styled.div`
  min-height: 46px;
  padding: 4px 16px 12px 16px;
  letter-spacing: 0.00625em;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
  box-sizing: border-box;
`;

const ControlsContainerStyled = styled.div`
  margin: 4px 0;
  display: flex;
  justify-content: space-between;

  box-shadow: ${(props) =>
    props.showShadow ? "0 -2px 5px rgba(0,0,0,.2)" : "none"};
`;

const StyledFooter = styled.div`
  padding: 5px 10px;
  display: flex;
  justify-content: flex-end;
  letter-spacing: 0.025em;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.8);
`;

const StyledButton = styled.div.attrs()`
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.87);
  letter-spacing: 0.0178571em;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  height: 36px;
  padding: 8px 24px;
  border-radius: 4px;
  margin-right: 15px;
  cursor: pointer;

  &:hover {
    background-color: rgba(95, 99, 104, 0.039);
  }
`;

export {
  PopupInnerContainer,
  NoteContentContainer,
  ControlsContainerStyled,
  NoteContentImageContainer,
  NoteContentInfo,
  TitleDiv,
  ContentDiv,
  StyledButton,
  PopupContainerStyled,
  StyledFooter,
};
