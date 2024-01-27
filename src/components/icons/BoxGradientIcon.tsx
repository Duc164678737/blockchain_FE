import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "models/types";

const BoxGradientIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      width="24"
      height="24"
      viewBox="0 0 24 24"
      sx={{ fontSize: "inherit", ...sx }}
      {...otherProps}
    >
      <path
        d="M17.4982 7.5H6.50174C6.16724 8.20125 5.98499 8.9715 5.98649 9.77175L5.99024 13.5H9.00074C9.00074 12.2573 10.008 11.25 11.2507 11.25H12.7507C13.9935 11.25 15.0007 12.2573 15.0007 13.5H18.0112L18.015 9.77175C18.0165 8.9715 17.8342 8.20125 17.4997 7.5H17.4982Z"
        fill="url(#paint0_linear_2059_13360)"
      />
      <path
        d="M5.9985 22.5H18.0015L18.009 15H15C15 16.2427 13.9927 17.25 12.75 17.25H11.25C10.0072 17.25 9 16.2427 9 15H5.991L5.9985 22.5Z"
        fill="url(#paint1_linear_2059_13360)"
      />
      <path
        d="M19.5143 9.77366L19.5105 13.4997H22.5V11.9997C22.5 9.92216 21.09 8.17841 19.1768 7.66016C19.3965 8.33366 19.5158 9.04391 19.5143 9.77291V9.77366Z"
        fill="url(#paint2_linear_2059_13360)"
      />
      <path
        d="M4.4895 13.4997L4.48575 9.77291C4.48425 9.04391 4.6035 8.33366 4.82325 7.66016C2.90925 8.17766 1.5 9.92216 1.5 11.9997V13.4997H4.4895Z"
        fill="url(#paint3_linear_2059_13360)"
      />
      <path
        d="M19.509 15L19.5015 22.5H20.25C21.4927 22.5 22.5 21.4927 22.5 20.25V15H19.509Z"
        fill="url(#paint4_linear_2059_13360)"
      />
      <path
        d="M4.491 15H1.5V20.25C1.5 21.4927 2.50725 22.5 3.75 22.5H4.4985L4.491 15Z"
        fill="url(#paint5_linear_2059_13360)"
      />
      <path
        d="M12.75 12.75H11.25C10.8358 12.75 10.5 13.0858 10.5 13.5V15C10.5 15.4142 10.8358 15.75 11.25 15.75H12.75C13.1642 15.75 13.5 15.4142 13.5 15V13.5C13.5 13.0858 13.1642 12.75 12.75 12.75Z"
        fill="url(#paint6_linear_2059_13360)"
      />
      <path
        d="M12 4.5C12.4147 4.5 12.75 4.164 12.75 3.75V1.5C12.75 1.086 12.4147 0.75 12 0.75C11.5853 0.75 11.25 1.086 11.25 1.5V3.75C11.25 4.164 11.5853 4.5 12 4.5Z"
        fill="url(#paint7_linear_2059_13360)"
      />
      <path
        d="M6.65325 5.67192C6.79875 5.88042 7.032 5.99142 7.26825 5.99142C7.41675 5.99142 7.56675 5.94717 7.69725 5.85567C8.037 5.61792 8.11875 5.15067 7.88175 4.81092L6.591 2.96742C6.354 2.62767 5.8845 2.54592 5.54625 2.78292C5.2065 3.02067 5.12475 3.48792 5.36175 3.82767L6.6525 5.67117L6.65325 5.67192Z"
        fill="url(#paint8_linear_2059_13360)"
      />
      <path
        d="M16.7317 5.99165C16.968 5.99165 17.2012 5.88065 17.3467 5.67215L18.6375 3.82865C18.8745 3.4889 18.7927 3.02165 18.453 2.7839C18.1155 2.5469 17.646 2.62865 17.4082 2.9684L16.1175 4.8119C15.8805 5.15165 15.9622 5.6189 16.302 5.85665C16.4325 5.94815 16.5825 5.9924 16.731 5.9924L16.7317 5.99165Z"
        fill="url(#paint9_linear_2059_13360)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2059_13360"
          x1="14.2789"
          y1="14.875"
          x2="14.571"
          y2="5.6968"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF930D" />
          <stop offset="0.671875" stopColor="#FFC803" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2059_13360"
          x1="14.2761"
          y1="24.2188"
          x2="14.7327"
          y2="12.7526"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF930D" />
          <stop offset="0.671875" stopColor="#FFC803" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_2059_13360"
          x1="21.4678"
          y1="14.8379"
          x2="22.4578"
          y2="6.00713"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF930D" />
          <stop offset="0.671875" stopColor="#FFC803" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_2059_13360"
          x1="3.79103"
          y1="14.8379"
          x2="4.78103"
          y2="6.00713"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF930D" />
          <stop offset="0.671875" stopColor="#FFC803" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_2059_13360"
          x1="21.5686"
          y1="24.2188"
          x2="23.3558"
          y2="13.0196"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF930D" />
          <stop offset="0.671875" stopColor="#FFC803" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_2059_13360"
          x1="3.56715"
          y1="24.2188"
          x2="5.35433"
          y2="13.0196"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF930D" />
          <stop offset="0.671875" stopColor="#FFC803" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_2059_13360"
          x1="12.5682"
          y1="16.4375"
          x2="12.8601"
          y2="11.8624"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF930D" />
          <stop offset="0.671875" stopColor="#FFC803" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_2059_13360"
          x1="12.2841"
          y1="5.35938"
          x2="13.1773"
          y2="-0.240351"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF930D" />
          <stop offset="0.671875" stopColor="#FFC803" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_2059_13360"
          x1="7.15033"
          y1="6.75775"
          x2="7.53948"
          y2="1.66705"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF930D" />
          <stop offset="0.671875" stopColor="#FFC803" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_2059_13360"
          x1="17.9061"
          y1="6.75872"
          x2="18.2952"
          y2="1.66803"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF930D" />
          <stop offset="0.671875" stopColor="#FFC803" />
        </linearGradient>
      </defs>
    </SvgIcon>
  );
};

export default memo(BoxGradientIcon);
