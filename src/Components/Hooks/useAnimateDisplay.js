import { useState, useEffect } from "react";

const useAnimateDisplay = () => {
  const [show, setShow] = useState(true);
  const [opacity, setOpacity] = useState(true);

  useEffect(() => {
    if (show) setOpacity(true);
  }, [show]);

  useEffect(() => {
    if (!opacity) {
      setTimeout(() => {
        setShow(false);
      }, 218);
    }
  }, [opacity]);

  const toggleDisplay = () => {
    if (!opacity) setShow(true);
    setOpacity(false);
  };

  return { show, opacity, toggleDisplay };
};

export default useAnimateDisplay;
