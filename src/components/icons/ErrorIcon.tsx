import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "models/types";

const ErrorIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon viewBox="0 0 40 40" sx={{ fontSize: "inherit", ...sx }} {...otherProps}>
      <rect x="9" y="10.5" width="22" height="21" fill="white" />
      <path
        d="M2.5 20C2.5 10.335 10.335 2.5 20 2.5C29.665 2.5 37.5 10.335 37.5 20C37.5 29.665 29.665 37.5 20 37.5C10.335 37.5 2.5 29.665 2.5 20ZM27.1338 12.8663C26.8993 12.6319 26.5815 12.5003 26.25 12.5003C25.9185 12.5003 25.6007 12.6319 25.3662 12.8663L20 18.2325L14.6337 12.8663C14.5184 12.7469 14.3805 12.6516 14.228 12.5861C14.0755 12.5206 13.9115 12.4861 13.7455 12.4847C13.5795 12.4832 13.4149 12.5149 13.2613 12.5777C13.1077 12.6406 12.9681 12.7334 12.8508 12.8508C12.7334 12.9681 12.6406 13.1077 12.5777 13.2613C12.5149 13.4149 12.4832 13.5795 12.4847 13.7455C12.4861 13.9115 12.5206 14.0755 12.5861 14.228C12.6516 14.3805 12.7469 14.5184 12.8663 14.6337L18.2325 20L12.8663 25.3662C12.7469 25.4816 12.6516 25.6195 12.5861 25.772C12.5206 25.9245 12.4861 26.0885 12.4847 26.2545C12.4832 26.4205 12.5149 26.5851 12.5777 26.7387C12.6406 26.8923 12.7334 27.0319 12.8508 27.1492C12.9681 27.2666 13.1077 27.3594 13.2613 27.4223C13.4149 27.4851 13.5795 27.5168 13.7455 27.5153C13.9115 27.5139 14.0755 27.4794 14.228 27.4139C14.3805 27.3484 14.5184 27.2531 14.6337 27.1338L20 21.7675L25.3662 27.1338C25.602 27.3614 25.9178 27.4874 26.2455 27.4846C26.5732 27.4817 26.8868 27.3503 27.1185 27.1185C27.3503 26.8868 27.4817 26.5732 27.4846 26.2455C27.4874 25.9178 27.3614 25.602 27.1338 25.3662L21.7675 20L27.1338 14.6337C27.3681 14.3993 27.4997 14.0815 27.4997 13.75C27.4997 13.4185 27.3681 13.1007 27.1338 12.8663Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default memo(ErrorIcon);