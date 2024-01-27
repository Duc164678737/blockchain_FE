import React, { memo } from "react";
import { Box, BoxProps } from "@mui/material";
import { FormatUtils } from "utils";
import { AppTypography } from "components/common";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import clsx from "clsx";

const NftId = ({ nftId, className, ...otherProps }: NftIdProps) => {
  const classes = useStyles();

  return (
    <Box className={clsx("center-root", classes.root, className)} {...otherProps}>
      <AppTypography variant="body2" className={clsx(classes.nftId)}>
        {FormatUtils.formatId(nftId)}
      </AppTypography>
    </Box>
  );
};
type NftIdProps = BoxProps & {
  nftId?: number;
};

export default memo(NftId);

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    minWidth: 50,
    height: 26,
    padding: theme.spacing(0, 0.5),
    background: "#F49900",
    border: "3px solid #292E34",
    boxShadow: "1px 2px 0px #000000",
    borderRadius: 6,
  },
  nftId: {
    fontFamily: "Russo One",
    lineHeight: "20px",
    "-webkit-text-stroke": `0.75px ${theme.palette.common.black}`,
    textShadow: `0px 2px 0px ${theme.palette.common.black}`,
    color: theme.palette.light.main,
  },
}));
