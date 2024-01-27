import React, { memo } from "react";
import { NFTConstant } from "const";
import { formatPercentage } from "utils/format.utils";
import { Box, BoxProps } from "@mui/material";
import { AppTypography } from "components/common";
import { AppTypographyProps, ThemeProps } from "models/types";
import { makeStyles } from "@mui/styles";
import { ImageBoxDetailDemo } from "public/images/demo";
import clsx from "clsx";

const DetailRateBox = ({ className, contentProps = {}, ...otherProps }: BoxRateProps) => {
  const classes = useStyles();
  const { wrapperProps, boxImageProps, percentProps } = contentProps;

  return (
    <Box className={clsx("center-root", classes.root, className)} {...otherProps}>
      {defaultValue.map((item, index) => (
        <Box className={clsx("center-root")} key={index} {...wrapperProps}>
          <Box component="img" src={item.image} width={22} height={25} {...boxImageProps} />
          <AppTypography ml={0.5} color={item.color} {...percentProps}>
            {item.value}
          </AppTypography>
        </Box>
      ))}
    </Box>
  );
};

type BoxRateProps = BoxProps & {
  contentProps?: {
    wrapperProps?: BoxProps;
    boxImageProps?: BoxProps;
    percentProps?: AppTypographyProps;
  };
};

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    maxHeight: 49,
    backgroundColor: theme.palette.grey[800],
    borderRadius: 4,
    width: "100%",
    padding: theme.spacing(1.5, 3),
    justifyContent: "space-between",
    marginBottom: theme.spacing(2.5),
  },
}));

export default memo(DetailRateBox);

const defaultValue = [
  {
    image: ImageBoxDetailDemo,
    color: "#C1D5E1",
    value: formatPercentage(NFTConstant.NFT_BOX_PERCENT.common),
  },
  {
    image: ImageBoxDetailDemo,
    color: "#2DDEED",
    value: formatPercentage(NFTConstant.NFT_BOX_PERCENT.rare),
  },
  {
    image: ImageBoxDetailDemo,
    color: "#CA1CF8",
    value: formatPercentage(NFTConstant.NFT_BOX_PERCENT.epic),
  },
  {
    image: ImageBoxDetailDemo,
    color: "#EAB635",
    value: formatPercentage(NFTConstant.NFT_BOX_PERCENT.legendary),
  },
];
