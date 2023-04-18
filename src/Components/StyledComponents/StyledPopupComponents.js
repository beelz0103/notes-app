import styled from "styled-components";

const PopupContainerStyled = styled.div.attrs()`
  margin: 16px;
  width: 600px;
  position: fixed;
  z-index: 4;
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

const StyledDiv = styled.div`
  width: 100%;
  outline: none;
  min-height: 100%;
  box-sizing: border-box;
  letter-spacing: 0.00625em;
  font-size: 1.375rem;
  line-height: 1.75rem;
  font-weight: 400;
`;

const StyledFooterWrapper = styled(StyledDiv)`
  align-items: center;
  display: -webkit-box;
  flex-wrap: wrap;
  padding: 5px 10px;
  display: ${(props) => (props.showFooter ? "flex" : "none")};
`;

//hover needs to be implemented on this
const StyledLabelWrapper = styled.div`
  max-width: 100%;
  margin: 6px 6px 0 0;
  background-color: rgba(0, 0, 0, 0.08);
  -webkit-border-radius: 12px;
  border-radius: 12px;
  -webkit-box-shadow: inset 0 0 0 1px transparent;
  box-shadow: inset 0 0 0 1px transparent;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  letter-spacing: 0.01785714em;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  position: relative;
`;

//this on click goes to the label page but I wont implement it ueueueueuue
const StyledLabelButton = styled.div`
  cursor: pointer;
  display: inline-block;
  outline: none !important;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  height: 18px;
  -webkit-justify-content: center;
  justify-content: center;
  min-width: 35px;
  padding: 3px 5px;

  /* &:hover {
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
    width: -webkit-calc(100% - 15px);
    width: calc(100% - 15px);
  } */
`;

const LabelDeleteButton = styled.div`
  background-image: url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE4cHgiIHdpZHRoPSIxOHB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0iIzAwMDAwMCI+CiA8cGF0aCBkPSJtMCAwaDE4djE4aC0xOHpoMTh2MThoLTE4eiIgZmlsbD0ibm9uZSIvPgogPHBhdGggZD0ibTE0LjUzIDQuNTNsLTEuMDYtMS4wNi00LjQ3IDQuNDctNC40Ny00LjQ3LTEuMDYgMS4wNiA0LjQ3IDQuNDctNC40NyA0LjQ3IDEuMDYgMS4wNiA0LjQ3LTQuNDcgNC40NyA0LjQ3IDEuMDYtMS4wNi00LjQ3LTQuNDd6Ii8+Cjwvc3ZnPgo=);
  -webkit-background-size: 14px 14px;
  background-size: 14px 14px;
  display: none;
  height: 18px;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  flex: 0 0 auto;
  position: absolute;
  right: 2px;
  top: 50%;

  transform: translateY(-50%);
  width: 18px;
  background-position: center;
  background-repeat: no-repeat;

  background-size: 18px 18px;

  border-radius: 50%;
  border: 1px solid transparent;

  opacity: 0.54;

  //ofcourse this wont work, need js but not implementing hahah
  /* &:hover {
    display: block;
  } */
`;

const StyledLabel = styled.label`
  border: 1px solid transparent;
  text-align: center;
  color: #3c4043;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
  margin: 0 6px;
  padding: 1px;

  /* &:hover {
    text-align: left;
    width: -webkit-calc(100% - 12px);
    width: calc(100% - 12px);
  } */
`;

const LastUpdated = styled.div`
  margin: 6px 6px 0 0;
  color: rgba(0, 0, 0, 0.8);
  cursor: default;
  display: none;
  letter-spacing: 0.025em;
  font-family: Roboto, Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1rem;
  margin-left: auto;
  max-width: 100%;
  display: block;
`;

export {
  StyledFooterWrapper,
  StyledLabelWrapper,
  LastUpdated,
  StyledLabel,
  LabelDeleteButton,
  StyledLabelButton,
};

const StyledContentDiv = styled(StyledDiv)`
  padding: 12px 16px 12px 16px;
  letter-spacing: 0.00625em;
  font-size: 1rem;
  line-height: 1.5rem;
`;

const StyledTitleDiv = styled(StyledDiv)`
  padding: 16px 15px 12px 15px;
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
  NoteContentInfo,
  TitleDiv,
  ContentDiv,
  StyledButton,
  PopupContainerStyled,
  StyledContentDiv,
  StyledTitleDiv,
};
