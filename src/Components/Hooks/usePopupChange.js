import { useState, useEffect, useRef } from "react";

const usePopupWidth = () => {
  const [minWidth, setMinWidth] = useState("600px");

  useEffect(() => {
    const changeWidth = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth <= 632) {
        setMinWidth(windowWidth - 32 + "px");
      } else {
        setMinWidth(600 + "px");
      }
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return minWidth;
};

const usePopupHeight = () => {
  const [maxHeight, setMaxHeight] = useState("");
  const contentContainerRef = useRef(null);
  const [top, setTop] = useState("");

  useEffect(() => {
    const divRefCurrent = contentContainerRef.current;
    let divHeight, windowHeight, maxFullHeight, currentMaxHeight, newTop;

    const observer = new ResizeObserver((entries) => {
      divHeight = entries[0].contentRect.height;
      windowHeight = window.innerHeight;
      maxFullHeight = windowHeight - 80;

      if (divHeight >= maxFullHeight - 37 + 18) {
        currentMaxHeight = maxFullHeight - 46;
      } else if (divHeight === maxFullHeight - 37 + 18 - 1) {
        currentMaxHeight = maxFullHeight - 46 - 0.25;
      } else if (divHeight < maxFullHeight - 37 + 18 - 1) {
        currentMaxHeight =
          maxFullHeight -
          46 -
          0.25 -
          (maxFullHeight - 37 + 18 - 1 - divHeight) * 0.275;
      }

      if (currentMaxHeight >= 100 && currentMaxHeight <= 800) {
        setMaxHeight(currentMaxHeight);
        newTop = windowHeight - currentMaxHeight - 80 - 16 + "px";
        setTop(newTop);
      } else if (currentMaxHeight < 100) {
        setMaxHeight(100);
        if (windowHeight - 100 - 80 - 16 >= 30) {
          newTop = windowHeight - 100 - 80 - 16 + "px";
          setTop(newTop);
        } else {
          setTop("30px");
        }
      } else if (currentMaxHeight > 800) {
        setMaxHeight(800);
        newTop = windowHeight - currentMaxHeight - 80 - 16 + "px";
        setTop(newTop);
      }
    });

    const windowResize = () => {
      setMaxHeight(currentMaxHeight);
      setTop(newTop);
      setMaxHeight("");
    };

    window.addEventListener("resize", windowResize);

    observer.observe(contentContainerRef.current);

    return () => {
      observer.unobserve(divRefCurrent);
      window.removeEventListener("resize", windowResize);
    };
  }, [maxHeight]);

  return { maxHeight, contentContainerRef, top };
};

export { usePopupWidth, usePopupHeight };
