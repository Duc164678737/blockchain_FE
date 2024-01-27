import React, { memo } from "react";
import { Box, StackProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { AppTypography } from "components/common";
import { NFTClass } from "models";
import { DetailRateBox } from "components/common/box";
import ImageLayoutCard from "./ImageLayoutCard";
import clsx from "clsx";

const BoxDetailInventoryCard = ({ data, className, ...otherProps }: BoxCardProps) => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.root, className)} {...otherProps}>
      <AppTypography className={classes.nameNft}>{data.item.displayName}</AppTypography>
      <ImageLayoutCard className={classes.img} url={data.item.iconUrl} />
      <DetailRateBox
        className={classes.rateBox}
        contentProps={{
          boxImageProps: { className: classes.imgRate },
          percentProps: { className: classes.percentRate },
        }}
      />
    </Box>
  );
};

type BoxCardProps = StackProps & {
  data: NFTClass;
};

export default memo(BoxDetailInventoryCard);

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    minWidth: 395,
    padding: theme.spacing(2, 3.125, 3),
    backgroundColor: theme.palette.layout.secondary,
    borderRadius: 12,
  },
  nameNft: {
    color: theme.palette.light.light3,
    fontWeight: 600,
    fontSize: 20,
    lineHeight: "24px",
    textTransform: "uppercase",
  },
  img: {
    margin: theme.spacing(1, "auto", 2.5),
  },
  rateBox: {
    width: 316,
    padding: theme.spacing(1, 2.75),
    margin: theme.spacing(0, "auto"),
  },
  imgRate: {
    width: 20,
    height: 22,
  },
  percentRate: {
    ...theme.typography?.body2,
    lineHeight: "20px",
  },
}));
