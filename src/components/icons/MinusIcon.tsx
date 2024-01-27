import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "models/types";

const MinusIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      width="24"
      height="24"
      viewBox="0 0 24 24"
      sx={{ fontSize: "inherit", ...sx }}
      {...otherProps}
    >
      <path d="M19 12.998H5V10.998H19V12.998Z" fill="currenColor" />
    </SvgIcon>
  );
};

export default memo(MinusIcon);
