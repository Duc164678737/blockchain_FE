import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "models/types";

const ArrowIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      width="16"
      height="16"
      viewBox="0 0 16 16"
      sx={{ fontSize: "inherit", ...sx }}
      {...otherProps}
    >
      <path
        d="M6 3L11 8L6 13"
        fill="transparent"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default memo(ArrowIcon);
