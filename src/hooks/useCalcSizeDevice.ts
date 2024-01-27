import { useEffect } from "react";
import { useWindowSize } from "hooks";
import { isMobile } from "react-device-detect";

const useCalcSizeDevice = () => {
  const { windowHeight, windowWidth } = useWindowSize();

  useEffect(() => {
    if (isMobile) {
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      const maxScreenHeight = window.innerHeight > windowHeight ? window.innerHeight : windowHeight;
      const vh = maxScreenHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
  }, [isMobile, windowHeight, windowWidth]);

  return true;
};

export default useCalcSizeDevice;
