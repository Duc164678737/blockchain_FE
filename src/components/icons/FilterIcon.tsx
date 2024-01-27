import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "models/types";

const FilterIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon viewBox="0 0 16 16" sx={{ fontSize: "inherit", ...sx }} {...otherProps}>
      <path
        d="M6.75 8L13.5 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 8L4.25 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75 8C6.75 7.30964 6.19036 6.75 5.5 6.75C4.80964 6.75 4.25 7.30964 4.25 8C4.25 8.69036 4.80964 9.25 5.5 9.25C6.19036 9.25 6.75 8.69036 6.75 8Z"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.75 3.5L13.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 3.5L9.25 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.75 3.5C11.75 2.80964 11.1904 2.25 10.5 2.25C9.80964 2.25 9.25 2.80964 9.25 3.5C9.25 4.19036 9.80964 4.75 10.5 4.75C11.1904 4.75 11.75 4.19036 11.75 3.5Z"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.75 12.5L13.5 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12.5L7.25 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.75 12.5C9.75 11.8096 9.19036 11.25 8.5 11.25C7.80964 11.25 7.25 11.8096 7.25 12.5C7.25 13.1904 7.80964 13.75 8.5 13.75C9.19036 13.75 9.75 13.1904 9.75 12.5Z"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default memo(FilterIcon);
