import styled from "styled-components";
import logo from "./Resources/logo.png";
import ProductSans from "./Resources/product-sans/regular.woff2";
import { Link } from "react-router-dom";

const AppLogo = ({ toggleLabel }) => {
  return toggleLabel.displayLabel === null ? (
    <Link to={`#home`} style={{ textDecoration: "none" }}>
      <div style={{ position: "relative", top: "2px" }}>
        <StyledLogoImage src={logo}></StyledLogoImage>
        <StyledSpan fonturl={ProductSans}>Keep</StyledSpan>
      </div>
    </Link>
  ) : (
    <div style={{ position: "relative", top: "2px" }}>
      <StyledSpan
        fonturl={ProductSans}
        style={{
          fontSize: "20px",
          lineHeight: "44px",
          marginBottom: "2px",
          color: "#3c4043",
        }}
      >
        {toggleLabel.displayLabel.name}
      </StyledSpan>
    </div>
  );
};

const StyledSpan = styled.span`
  @font-face {
    font-family: "Product Sans";
    src: url(${(props) => props.fonturl}) format("woff2");
  }

  padding-left: 4px;
  color: #5f6368;
  opacity: 1;
  display: inline-block;
  font-family: "Product Sans", Arial, sans-serif;
  font-size: 22px;
  line-height: 24px;

  position: relative;
  top: -1.5px;
  vertical-align: middle;
`;

const StyledLogoImage = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 4px;
  padding-right: 4px;
  border: 0;
  vertical-align: middle;
  overflow-clip-margin: content-box;
  overflow: clip;
`;

const LogoContainer = styled.div`
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;

  display: inline-block;
  position: relative;
  top: 2px;
  -webkit-user-select: none;

  display: block;

  height: 48px;
  vertical-align: middle;
  white-space: nowrap;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-user-select: none;

  font: 13px/27px Roboto, Arial, sans-serif;
  z-index: 986;

  color: black;
  min-width: 160px;
  position: relative;
  -webkit-transition: box-shadow 250ms;
  transition: box-shadow 250ms;
`;

const LogoSubContainer = styled.div`
  padding-left: 0px;

  padding-left: 12px;

  line-height: normal;
  position: relative;
  padding-left: 16px;

  display: block;

  display: inline-block;
  position: relative;
  top: 2px;
  -webkit-user-select: none;

  height: 48px;
  vertical-align: middle;
  white-space: nowrap;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-user-select: none;

  font: 13px/27px Roboto, Arial, sans-serif;
  z-index: 986;

  color: black;
  min-width: 160px;
  position: relative;
  -webkit-transition: box-shadow 250ms;
  transition: box-shadow 250ms;
`;

export default AppLogo;
