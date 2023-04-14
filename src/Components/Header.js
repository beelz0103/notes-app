import styled from "styled-components";

const Header = () => {
  return (
    <StyledHeader>
      <StyledIcon
        class="gb_Ic"
        aria-expanded="true"
        aria-label="Main menu"
        role="button"
        tabindex="0"
      >
        <svg style={{ color: "#5f6368" }} focusable="false" viewBox="0 0 24 24">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
        </svg>
      </StyledIcon>
    </StyledHeader>
  );
};

const StyledIcon = styled.div`
  -webkit-border-radius: 50%;
  border-radius: 50%;
  display: inline-block;
  margin: 0 4px;
  padding: 12px;
  overflow: hidden;
  vertical-align: middle;
  cursor: pointer;
  height: 24px;
  width: 24px;
  color: #5f6368;

  -webkit-flex: 0 0 auto;
  flex: 0 0 auto;
`;

const StyledHeader = styled.div`
  width: 100%;
  height: 64px;
  box-shadow: inset 0 -1px 0 0 #dadce0;
  padding: 8px;
  box-sizing: border-box;
  color: #5f6368;
`;

export default Header;
