import { useState, useEffect, memo, useCallback, useRef } from "react";
import styled from "styled-components";
import positioner from "./Components/Resources/positioner.svg";
import cross from "./Components/Resources/cross.svg";

function Test() {
  return (
    <div
      style={{
        margin: "100px",
        width: "600px",
        backgroundColor: "beige",
        position: "relative",
      }}
    >
      <ListContainer>
        <ListSubContainer>
          <ListItemWrapper>
            <ListItemSubWrapper>
              <ListPositioner>
                <PostionerIcon img={positioner}></PostionerIcon>
              </ListPositioner>
              <ListCheckBoxContainer>
                <ListCheckBox></ListCheckBox>
              </ListCheckBoxContainer>
              <ListTextContainer>
                <ListEditableDiv contentEditable></ListEditableDiv>
                <ListRemoveButton></ListRemoveButton>
              </ListTextContainer>
            </ListItemSubWrapper>
          </ListItemWrapper>
        </ListSubContainer>
      </ListContainer>
    </div>
  );
}

const ListContainer = styled.div`
  min-height: 30px;
  padding: 4px 0 8px 0;

  background-color: transparent;
  margin: 0 auto;
`;

const ListSubContainer = styled.div`
  height: 160px;
  /* set manually*/

  position: relative;
`;

const ListItemWrapper = styled.div`
  opacity: 1;

  border-bottom: 1px solid transparent;
  border-top: 1px solid transparent;

  /* opacity: 0; */
  position: absolute;
  width: 100%;

  letter-spacing: 0.00625em;
  font-family: Roboto, Arial, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;

  opacity: 1;

  border-bottom: 1px solid transparent;
  border-top: 1px solid transparent;

  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  border-top: 1px solid rgba(0, 0, 0, 0.15);

  position: absolute;
  width: 100%;
`;

const ListItemSubWrapper = styled.div`
  margin-left: 0px;

  position: relative;
`;

const ListPositioner = styled.div`
  position: absolute;
  width: 24px;
  z-index: 1;
`;

const PostionerIcon = styled.div`
  background: url(${(props) => props.img}) no-repeat center;
  cursor: move;
  height: 24px;
  left: 0;
  opacity: 0.54;
  position: absolute;
  top: 4px;
  visibility: visible;
  width: 24px;
`;

const ListCheckBoxContainer = styled.div`
  z-index: 1;

  left: 24px;
  position: absolute;
  width: 22px;
`;

const ListCheckBox = styled.div`
  user-select: none;

  opacity: 0.54;
  outline: none;
  position: absolute;

  background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDAwIj4KICA8cGF0aCBkPSJNMTkgNXYxNEg1VjVoMTRtMC0ySDVjLTEuMSAwLTIgLjktMiAydjE0YzAgMS4xLjkgMiAyIDJoMTRjMS4xIDAgMi0uOSAyLTJWNWMwLTEuMS0uOS0yLTItMnoiLz4KPC9zdmc+Cg==)
    no-repeat center;
  background-size: 18px 18px;
  top: 5px;
  height: 18px;
  width: 18px;

  /* -webkit-background-size: 18px 18px;
  background-size: 18px 18px;*/
  cursor: pointer;
  /* height: 18px;
  opacity: 0.54;
  outline: none;
  width: 18px; */
`;

const ListTextContainer = styled.div`
  position: relative;
`;

const ListEditableDiv = styled.div`
  letter-spacing: 0.00625em;
  font-family: Roboto, Arial, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;

  letter-spacing: 0.01428571em;
  font-family: Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25rem;

  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-variant-ligatures: none;
  outline: none;
  white-space: pre-wrap;
  word-wrap: break-word;

  min-height: 29px;
  padding: 5px 45px 5px 53px;
`;

const ListRemoveButton = styled.div`
  user-select: none;

  /* opacity: 0.87;
  background-color: rgba(95, 99, 104, 0.157); */

  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDAwIj4KICA8cGF0aCBkPSJNMTkgNi40MUwxNy41OSA1IDEyIDEwLjU5IDYuNDEgNSA1IDYuNDEgMTAuNTkgMTIgNSAxNy41OSA2LjQxIDE5IDEyIDEzLjQxIDE3LjU5IDE5IDE5IDE3LjU5IDEzLjQxIDEyIDE5IDYuNDF6Ii8+Cjwvc3ZnPgo=);
  opacity: 0;
  position: absolute;
  right: 12px;
  top: 4px;

  background-position: center;
  background-repeat: no-repeat;
  -webkit-background-size: 18px 18px;
  background-size: 18px 18px;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  border: 1px solid transparent;
  height: 24px;
  opacity: 0.54;
  width: 24px;

  cursor: pointer;
  display: inline-block;
  outline: none !important;
  /* position: relative; */

  display: block;

  letter-spacing: 0.00625em;
  font-family: Roboto, Arial, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;

  &:hover {
    opacity: 0.87;
    background-color: rgba(95, 99, 104, 0.157);
  }
`;

export default Test;
