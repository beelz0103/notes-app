import styled from "styled-components";

const StyledNoteOuterContainer = styled.div.attrs()`
  margin: 16px;
  position: relative;

  border-radius: 8px;

  transition-duration: 0.218s;

  transition-property: border, opacity, box-shadow, transform;

  transition-timing-function: ease-in;

  opacity: ${(props) => (props.showNote ? 1 : 0)};

  &:hover {
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
      0 2px 6px 2px rgba(60, 64, 67, 0.149);
    border-radius: 8px;
  }
`;

const StyledNoteOuterContainerExpanded = styled.div.attrs()`
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

const NoteInnerContainer = styled.div`
  border: 1px solid transparent;
  border-color: #e0e0e0;
  border-radius: 5px;
  box-sizing: border-box;

  position: relative;
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
  max-height: 472px;
  overflow: hidden; /* hide any text that overflows the div */
  text-overflow: ellipsis;
  white-space: nowrap; /* prevent text wrapping */
`;

const NoteControlsMainContainer = styled.div`
  margin: 4px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FooterDiv = styled.div``;

//the height 34px is the icon height, margin left and right of the icons is 3px, so basically remove the border
// icons div themselves are 32px x 32px but its border is 1px
const NoteControlsSubContainer = styled.div.attrs()`
  height: 36px;
  box-sizing: border-box;
  border: 1px solid gray;
  border-radius: 5px;
  display: flex;
  align-items: center;
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
  StyledNoteOuterContainer,
  NoteInnerContainer,
  NoteContentContainer,
  NoteControlsSubContainer,
  NoteControlsMainContainer,
  NoteContentImageContainer,
  NoteContentInfo,
  TitleDiv,
  ContentDiv,
  FooterDiv,
  StyledButton,
  StyledNoteOuterContainerExpanded,
};
