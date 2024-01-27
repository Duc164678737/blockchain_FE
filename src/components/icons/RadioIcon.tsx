import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "models/types";

const RadioIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      width="12"
      height="12"
      viewBox="0 0 12 12"
      sx={{ fontSize: "inherit", ...sx }}
      {...otherProps}
    >
      <circle cx="6" cy="6" r="6" fill="currentColor" />
    </SvgIcon>
  );
};

export default memo(RadioIcon);
