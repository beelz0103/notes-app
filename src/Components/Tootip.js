import styled from "styled-components";

const Tooltip = () => {
  return (
    <StyledTooltipContainer>
      <TooltipBox></TooltipBox>
      <TooltipText>Tooltip</TooltipText>
    </StyledTooltipContainer>
  );
};

export default Tooltip;

const StyledTooltipContainer = styled.div`
  -webkit-border-radius: 4px;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  letter-spacing: 0.3px;
  line-height: 16px;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  z-index: 6000;
`;

const TooltipBox = styled.div`
  opacity: 1;
  background-color: rgba(60, 64, 67, 0.9);
  -webkit-border-radius: 256px;
  border-radius: 256px;
  height: 256px;
  left: 50%;
  margin-left: -128px;
  margin-top: -128px;
  opacity: 0;
  position: absolute;
  width: 256px;

  -webkit-border-radius: 4px;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  letter-spacing: 0.3px;
  line-height: 16px;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  z-index: 6000;
`;

const TooltipText = styled.div`
  opacity: 0.99;

  background: transparent;
  max-width: 220px;
  opacity: 0.3;
  overflow: hidden;
  padding: 4px 8px;
  text-overflow: ellipsis;
  white-space: pre;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  letter-spacing: 0.3px;
  line-height: 16px;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  z-index: 6000;
`;
