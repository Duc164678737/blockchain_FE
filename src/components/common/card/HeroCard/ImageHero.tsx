import React, { memo } from "react";
import { Box, BoxProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppTypography } from "components/common";
import { ImageConstant } from "const";
import { ThemeProps } from "models/types";
import { INftDetail } from "models/classes/Nft";
import NftId from "./NftId";
import clsx from "clsx";

const ImageHero = ({ data, className, ...otherProps }: ImageHeroProps) => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.root, className)} {...otherProps}>
      <Box className={classes.wrapper}>
        <Box className={classes.imageLayout}>
          <NftId className={classes.nftId} nftId={data?.tokenId} />
          <AppTypography variant="h5" className={classes.level}>
            {data?.level}
          </AppTypography>
        </Box>
        <Box
          component="img"
          className={classes.imageCard}
          src={data?.iconUrl}
          width={125}
          height={154}
        />
      </Box>
    </Box>
  );
};

type ImageHeroProps = BoxProps & {
  data?: INftDetail;
};

export default memo(ImageHero);

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    width: 172,
    height: 174,
    maxWidth: "100%",
    marginTop: theme.spacing(1.5),
    padding: theme.spacing(1, 2.75),
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    backdropFilter: "blur(1px)",
    background:
      "linear-gradient(122.23deg, rgba(255, 255, 255, 0.32) 1.06%, rgba(255, 255, 255, 0.08) 22.7%, rgba(255, 255, 255, 0.05) 39.19%, rgba(255, 255, 255, 0.05) 60.84%, rgba(255, 255, 255, 0.12) 76.29%, rgba(255, 255, 255, 0.31) 100%)",
  },
  wrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: "4px 18px 18px 18px",
    overflow: "hidden",
  },
  imageLayout: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: `no-repeat top right / 100% 100% url(${ImageConstant.HeroCardWrapperBackgroundImage})`,
    zIndex: 1,
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
  },
  nftId: {
    position: "absolute",
    top: 0,
    left: 0,
    fontFamily: "Russo One",
    "-webkit-text-stroke": `1px ${theme.palette.common.black}`,
    textShadow: `0px 2px 0px ${theme.palette.common.black}`,
  },
  level: {
    position: "absolute",
    bottom: 12,
    right: 18,
    fontFamily: "Russo One",
    color: "#00BA4C",
    "-webkit-text-stroke": `1px ${theme.palette.common.black}`,
    textShadow: `0px 2px 0px ${theme.palette.common.black}`,
  },
  imageCard: {
    transform: "scale(1.2)",
    objectFit: "contain",
  },
}));
