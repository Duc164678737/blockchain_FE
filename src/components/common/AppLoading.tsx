import React, { memo } from "react";
import { Box, BoxProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

const AppLoading = ({
  unitWidth = 7,
  borderWidth = 1,
  className,
  sx,
  ...otherProps
}: AppLoadingProps) => {
  const defaultClasses = useStyles();

  return (
    <Box
      className={clsx(defaultClasses.root, className)}
      sx={{
        "--width": `${3 * unitWidth - borderWidth * 2}px`,
        width: "var(--width)",
        height: "var(--width)",

        "&>*": {
          width: unitWidth,
          height: unitWidth,
          border: `${borderWidth}px solid #7e6dd9`,

          "&:nth-of-type(2)": {
            left: unitWidth - borderWidth,
          },

          "&:nth-of-type(4)": {
            top: unitWidth - borderWidth,
          },

          "&:nth-of-type(6)": {
            left: unitWidth - borderWidth,
          },

          "&:nth-of-type(8)": {
            top: unitWidth - borderWidth,
          },
        },
        ...sx,
      }}
      {...otherProps}
    >
      {[...Array(8)]
        .map((_, idx) => idx)
        .map((idx) => (
          <Box key={idx} />
        ))}
    </Box>
  );
};

export type AppLoadingProps = BoxProps & {
  unitWidth?: number;
  borderWidth?: number;
};

export default memo(AppLoading);

const useStyles = makeStyles(() => ({
  "@global": {
    "@keyframes highlight": {
      "0%, 21%, 100%": {
        background: "#9c8bff",
        borderColor: "#7e6dd9",
        zIndex: 0,
      },
      "20%": {
        borderColor: "#bd7219",
        background: "#dc9e01",
        zIndex: 1,
      },
    },
  },
  root: {
    position: "relative",

    "&>*": {
      position: "absolute",
      background: "#9c8bff",
      animation: "highlight 1.6s infinite ease-in-out",

      "&:nth-child(1)": {
        top: 0,
        left: 0,
      },
      "&:nth-child(2)": {
        animationDelay: "0.2s",
        top: 0,
      },
      "&:nth-child(3)": {
        animationDelay: "0.4s",
        top: 0,
        right: 0,
      },
      "&:nth-child(4)": {
        animationDelay: "0.6s",
        right: 0,
      },
      "&:nth-child(5)": {
        animationDelay: "0.8s",
        bottom: 0,
        right: 0,
      },
      "&:nth-child(6)": {
        animationDelay: "1s",
        bottom: 0,
      },
      "&:nth-child(7)": {
        animationDelay: "1.2s",
        bottom: 0,
        left: 0,
      },
      "&:nth-child(8)": {
        animationDelay: "1.4s",
        left: 0,
      },
    },
  },
}));
