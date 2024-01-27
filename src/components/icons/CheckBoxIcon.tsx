import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "models/types";

const CheckBoxIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon viewBox="0 0 20 20" sx={{ fontSize: "inherit", ...sx }} {...otherProps}>
      <path
        d="M16.875 5.625L8.125 14.375L3.75 10"
        stroke="currentStroke"
        color="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default memo(CheckBoxIcon);
