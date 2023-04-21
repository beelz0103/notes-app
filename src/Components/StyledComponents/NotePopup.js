import styled from "styled-components";
const PopupContainer = styled.div`
  left: 50%;
  transform: translateX(-50%);

  /* my styles end here */

  /* on hidden opacity 0 and display none (no way am implementing this) */

  /* left: 154.5px;
  top: 33.275px; 
  you know it */

  opacity: 1;

  transition: top 0.13s;

  background-color: transparent;
  border: none;

  box-shadow: none;
  /* opacity: 0; */
  padding: 16px;
  position: fixed;
  z-index: 4001;

  /* box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2); */
  /* background: #fff; */
  /* background-clip: padding-box; */
  /* border: 1px solid #acacac;
  border: 1px solid rgba(0, 0, 0, 0.333); */
  outline: 0;
  /* position: absolute; */
`;

const PopupSubContainer = styled.div`
  width: 600px;

  -webkit-transform: none;
  transform: none;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transition: box-shadow 0.218s cubic-bezier(0.25, 0.8, 0.25, 1),
    transform 0.218s cubic-bezier(0.25, 0.8, 0.25, 1);
  transition: box-shadow 0.218s cubic-bezier(0.25, 0.8, 0.25, 1),
    transform 0.218s cubic-bezier(0.25, 0.8, 0.25, 1);

  background: #fff;
  border: none;
  box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.302),
    0 4px 8px 3px rgba(60, 64, 67, 0.149);

  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  /* -webkit-box-shadow: none;
  box-shadow: none; */
  opacity: 1;
  position: relative;
  -webkit-border-radius: 8px;
  border-radius: 8px;
  -webkit-transition-duration: 0.218s;
  transition-duration: 0.218s;
  -webkit-transition-property: opacity;
  transition-property: opacity;
`;

const ContentOuterContainer = styled.div`
  background-color: #fff;
  border-color: #e0e0e0;

  border: 1px solid transparent;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  /* position: relative; */
  -webkit-border-radius: 8px;
  border-radius: 8px;
  -webkit-transition-duration: 0.218s;
  transition-duration: 0.218s;
  -webkit-transition-property: background, border, opacity, -webkit-box-shadow,
    -webkit-transform;
  transition-property: background, border, opacity, box-shadow, transform;
  -webkit-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
`;

const ContentContainer = styled.div`
  /*
  max-height: 612.325px;   
  this is to be set dynamically
  */

  -webkit-transition: opacity 0.218s ease-in;
  transition: opacity 0.218s ease-in;

  /* max-height: 600px; */
  overflow-y: auto;

  min-height: 60px;

  overflow: hidden;
  position: relative;
  /* -webkit-transition: max-height 0.218s ease-in;
  transition: max-height 0.218s ease-in; */
`;

const TitleInputContainer = styled.div``;

const TitleInput = styled.div`
  display: block !important;

  font-family: "Roboto", Arial, sans-serif;
  font-size: 1.375rem;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.75rem;
  padding-bottom: 12px;
  padding-top: 16px;

  min-height: 43px;
  padding: 16px 15px 12px 15px;
  -webkit-transition: box-shadow 0.218s ease-in-out,
    background-color 0.218s ease-in;
  transition: box-shadow 0.218s ease-in-out, background-color 0.218s ease-in;

  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-variant-ligatures: none;
  outline: none;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const ContentInputContainer = styled.div``;

const ContentInput = styled.div`
  letter-spacing: 0.00625em;
  font-family: "Roboto", Arial, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;

  padding-top: 12px;

  /* padding-top: 4px; */

  /* letter-spacing: .01428571em; */
  /* font-family: Roboto,Arial,sans-serif; */
  /* font-size: .875rem; */
  /* font-weight: 400; */
  /* line-height: 1.25rem; */

  color: #202124;
  /* font-size: 14px; */
  /* line-height: 19px; */
  min-height: 46px;
  padding: 12px 16px 12px 16px;

  /* -webkit-box-sizing: border-box; */
  box-sizing: border-box;
  font-variant-ligatures: none;
  outline: none;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export {
  PopupContainer,
  PopupSubContainer,
  ContentInput,
  ContentOuterContainer,
  ContentContainer,
  TitleInputContainer,
  TitleInput,
  ContentInputContainer,
};
