import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "models/types";

const CartGradientIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      width="24"
      height="24"
      viewBox="0 0 24 24"
      sx={{ fontSize: "inherit", ...sx }}
      {...otherProps}
    >
      <g clipPath="url(#clip0_978_42475)">
        <path
          d="M16.12 1.9285L5.22902 7.5045L0.900024 5.3745L11.599 0.0915C11.839 -0.0305 12.127 -0.0305 12.379 0.0915L16.12 1.9285Z"
          fill="url(#paint0_linear_978_42475)"
        />
        <path
          d="M23.088 5.37445L12.006 10.8645L7.85598 8.81945L7.25598 8.51445L18.159 2.93945L18.759 3.24345L23.088 5.37445Z"
          fill="url(#paint1_linear_978_42475)"
        />
        <path
          d="M11.118 12.447L11.106 24L0.492 18.461C0.192 18.303 0 17.986 0 17.645V6.95703L4.498 9.17303V13.069C4.498 13.568 4.906 13.982 5.398 13.982C5.89 13.982 6.298 13.568 6.298 13.069V10.074L6.898 10.366L11.118 12.447Z"
          fill="url(#paint2_linear_978_42475)"
        />
        <path
          d="M23.988 6.96875L12.918 12.4348L12.906 23.9878L24 18.1947L23.988 6.96875Z"
          fill="url(#paint3_linear_978_42475)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_978_42475"
          x1="11.3926"
          y1="9.22428"
          x2="11.7537"
          y2="-2.25562"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF930D" />
          <stop offset="0.671875" stopColor="#FFC803" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_978_42475"
          x1="18.1705"
          y1="12.6806"
          x2="18.5576"
          y2="0.557807"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF930D" />
          <stop offset="0.671875" stopColor="#FFC803" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_978_42475"
          x1="7.66468"
          y1="27.9057"
          x2="10.1928"
          y2="2.05588"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF930D" />
          <stop offset="0.671875" stopColor="#FFC803" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_978_42475"
          x1="20.5541"
          y1="27.8879"
          x2="23.0806"
          y2="2.07487"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF930D" />
          <stop offset="0.671875" stopColor="#FFC803" />
        </linearGradient>
        <clipPath id="clip0_978_42475">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default memo(CartGradientIcon);
