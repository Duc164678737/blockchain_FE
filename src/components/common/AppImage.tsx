import React, { memo, useMemo } from "react";
import { Box } from "@mui/material";
import Image from "next/image";

const AppImage = ({ width, height, classes, src, ...otherProps }: AppImageType) => {
  const widthValue = useMemo(() => width || "unset", [width]);
  const heightValue = useMemo(() => height || "unset", [height]);

  return (
    <Box position="relative" width={widthValue} height={heightValue} className={classes?.root}>
      <Image layout="fill" objectFit="contain" src={src} draggable={false} {...otherProps} />
    </Box>
  );
};

export type AppImageType = {
  width: number;
  height: number;
  src: string;
  classes?: {
    root: string;
  };
};

export default memo(AppImage);
