import React, { memo } from "react";
import { Box, StackProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { AppTypography } from "components/common";
import { NFTClass } from "models";
import ImageLayoutCard from "../BoxDetailInventoryCard/ImageLayoutCard";
import clsx from "clsx";
import { ImageConstant } from "const";

const EmoteAndTowerDetailInventoryCard = ({ data, className, ...otherProps }: BoxCardProps) => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.root, className)} {...otherProps}>
      <AppTypography className={classes.nameNft}>{data.item.displayName}</AppTypography>
      <ImageLayoutCard
        className={classes.img}
        url={data.item.iconUrl}
        containerProps={{ className: classes.background }}
      />
    </Box>
  );
};

type BoxCardProps = StackProps & {
  data: NFTClass;
};

export default memo(EmoteAndTowerDetailInventoryCard);

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
  background: {
    backgroundImage: `url(${ImageConstant.EmoteCardBackgroundImage})`,
    width: 241,
  },
}));
