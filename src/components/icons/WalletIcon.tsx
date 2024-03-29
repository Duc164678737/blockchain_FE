import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "models/types";

const WalletIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon viewBox="0 0 20 20" sx={{ fontSize: "inherit", ...sx }} {...otherProps}>
      <path
        d="M16.6678 5.71635H5.25913C4.96044 5.71635 4.71586 5.47177 4.71586 5.17308C4.71586 4.87438 4.96044 4.62981 5.25913 4.62981H16.1245C16.1245 3.73347 15.391 3 14.4947 3H4.71586C3.21656 3 1.99951 4.21705 1.99951 5.71635V15.4952C1.99951 16.3915 2.73298 17.125 3.62932 17.125H16.6678C17.5641 17.125 18.2976 16.3915 18.2976 15.4952V7.34615C18.2976 6.44981 17.5641 5.71635 16.6678 5.71635ZM15.038 12.5072C14.4387 12.5072 13.9514 12.0199 13.9514 11.4207C13.9514 10.8214 14.4387 10.3341 15.038 10.3341C15.6372 10.3341 16.1245 10.8214 16.1245 11.4207C16.1245 12.0199 15.6372 12.5072 15.038 12.5072Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default memo(WalletIcon);
