import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "models/types";

const CaretIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      width="7"
      height="10"
      viewBox="0 0 7 10"
      sx={{ fontSize: "inherit", ...sx }}
      {...otherProps}
    >
      <path
        d="M4.39358 0.412893L0.445835 4.01989C-0.148612 4.56303 -0.148612 5.44041 0.445835 5.98354L4.39358 9.59054C5.35384 10.4679 7 9.84122 7 8.60175L7 1.38776C7 0.148287 5.35384 -0.464485 4.39358 0.412893Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default memo(CaretIcon);
