import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const useSidebarDimensions = () => {
  const [mediaWidth, setMediaWidth] = useState("620px");
  const [width, setWidth] = useState("280px");
  const [minWidth, setMinWidth] = useState("280px");
  const [mouseOverFired, setMouseOverFired] = useState(false);
  const [hoverData, setHoverData] = useState(null);
  const sidebarRef = useRef(null);

  const handleMouseOver = () => {
    const sidebarWidth = sidebarRef.current.getBoundingClientRect().width;
    if (sidebarWidth === 80) {
      setMouseOverFired(true);
      setHoverData([width, minWidth, mediaWidth]);
      setWidth("280px");
      setMinWidth("80px");
      setMediaWidth("0px");
    }
  };

  const handleMouseLeave = () => {
    if (mouseOverFired) {
      setMouseOverFired(false);
      setWidth(hoverData[0]);
      setMinWidth(hoverData[1]);
      setMediaWidth(hoverData[2]);
      setHoverData(null);
    }
  };

  const handleClick = () => {
    const sidebarWidth = sidebarRef.current.getBoundingClientRect().width;

    const windowEventFunction = () => {
      if (window.innerWidth > 620) {
        const sidebarWidth = sidebarRef.current.getBoundingClientRect().width;
        if (sidebarWidth === 280) {
          console.log(280);
          setMediaWidth("620px");
          setMinWidth("280px");
        }

        window.removeEventListener("resize", windowEventFunction);
      }
    };

    if (window.innerWidth <= 620) {
      window.addEventListener("resize", windowEventFunction);
      if (sidebarWidth === 280) {
        setWidth("80px");
        setMinWidth("80px");
        setMediaWidth("620px");
      } else {
        setWidth("280px");
        setMinWidth("80px");
        setMediaWidth("0px");
      }
    } else {
      if (sidebarWidth === 280) {
        setWidth("80px");
        setMinWidth("80px");
        setMediaWidth(window.innerWidth + "px");
      } else {
        setWidth("280px");
        setMinWidth("280px");
        setMediaWidth("620px");
      }
    }
  };

  return {
    handleClick,
    handleMouseLeave,
    handleMouseOver,
    mainSidebarRef: sidebarRef,
    mediaWidth,
    minWidth,
    width,
  };
};

export default useSidebarDimensions;
