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
      <rect width="20" height="20" rx="2" fill="currentColor" />
      <path
        d="M15.8337 5.34102L14.6587 4.16602L10.0003 8.82435L5.34199 4.16602L4.16699 5.34102L8.82533 9.99935L4.16699 14.6577L5.34199 15.8327L10.0003 11.1743L14.6587 15.8327L15.8337 14.6577L11.1753 9.99935L15.8337 5.34102Z"
        fill="white"
      />
    </SvgIcon>
  );
};

export default memo(CompletedIcon);
