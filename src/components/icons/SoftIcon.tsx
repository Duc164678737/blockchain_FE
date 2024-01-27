import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "models/types";

const SoftIcon = ({ ascColor, descColor, sx, ...otherProps }: SoftIconProps) => {
  return (
    <SvgIcon viewBox="0 0 16 16" sx={{ fontSize: "inherit", ...sx }} {...otherProps}>
      <path
        d="M7 10L5 12L3 10"
        stroke={descColor}
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 4V12"
        stroke={descColor}
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 6L11 4L13 6"
        stroke={ascColor}
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 12V4"
        stroke={ascColor}
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

type SoftIconProps = IIconProps & {
  ascColor: string;
  descColor: string;
};

export default memo(SoftIcon);
