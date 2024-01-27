import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import { Breakpoint, Theme } from "@mui/system";

const useResponsive = (
  range = "between",
  from: Breakpoint | number = "md",
  to: Breakpoint | number = "lg",
) => {
  const theme: Theme = useTheme();

  let mediaScreen;

  switch (range) {
    case "down":
      mediaScreen = theme.breakpoints.down(from);
      break;

    case "up":
      mediaScreen = theme.breakpoints.up(from);
      break;

    default:
      mediaScreen = theme.breakpoints.between(from, to);
  }

  return useMediaQuery(mediaScreen);
};

export default useResponsive;
