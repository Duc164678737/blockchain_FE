import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "models/types";

const CompletedIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      width={20}
      height={20}
      viewBox="0 0 20 20"
      sx={{ fontSize: "inherit", ...sx }}
      {...otherProps}
    >
      <rect width="20" height="20" rx="2" fill="curentColor" />
      <path
        d="M7.50013 13.4749L4.02513 9.99987L2.8418 11.1749L7.50013 15.8332L17.5001 5.8332L16.3251 4.6582L7.50013 13.4749Z"
        fill="white"
      />
    </SvgIcon>
  );
};

export default memo(CompletedIcon);
