import React, { memo } from "react";
import { Box, Stack, StackProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { AppButton, AppButtonProps, AppLink, AppTypography } from "components/common";
import { useTranslation } from "react-i18next";
import { FormatUtils } from "utils";
import { AppConstant, ImageConstant } from "const";
import { NFTClass } from "models";
import ImageHero from "./ImageHero";
import clsx from "clsx";

const HeroCard = ({
  data,
  pathname,
  id,
  className,
  isMarket = true,
  isSellerAddress,
  onClickedBuy,
  ...otherProps
}: HeroCardProps) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

  return (
    <Box className={clsx(classes.root, className)}>
      <AppLink
        href={{
          pathname: pathname,
          query: { id: id },
        }}
        color="unset"
      >
        <Box className={clsx(classes.root, className)}>
          <Stack className={clsx(classes.container)} {...otherProps}>
            <Box className={clsx("space-between-root", classes.header)}>
              <AppTypography variant="caption" className={classes.raceType}>
                {data?.item.rareType}
              </AppTypography>
              <AppTypography variant="caption" className={classes.itemType}>
                {data?.item.itemType}
              </AppTypography>
            </Box>
            <ImageHero data={data?.item} />
            <AppTypography className={classes.displayName}>{data?.item.displayName}</AppTypography>
            {isMarket && (
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Box
                  component="img"
                  src={ImageConstant.TokenImage}
                  className={classes.tokenImage}
                />
                <AppTypography fontWeight={500}>
                  {FormatUtils.formatNumber(data?.price)}
                  <AppTypography variant="caption" fontWeight={500} ml={0.5} component="span">
                    {AppConstant.LABEL_TOKEN}
                  </AppTypography>
                </AppTypography>
              </Stack>
            )}
          </Stack>
        </Box>
        {isSellerAddress && (
          <AppButton
            className={classes.buyButton}
            wrapperProps={{
              className: classes.buyButtonWrapper,
            }}
            variant="contained"
          >
            {getLabel("lViewDetail")}
          </AppButton>
        )}
      </AppLink>
      {isMarket && !isSellerAddress && (
        <AppButton
          className={classes.buyButton}
          wrapperProps={{
            className: classes.buyButtonWrapper,
          }}
          variant="contained"
          onClick={() => typeof onClickedBuy === "function" && data && onClickedBuy(data)}
        >
          {getLabel("lBuyNow")}
        </AppButton>
      )}
    </Box>
  );
};

export type HeroCardProps = StackProps & {
  data?: NFTClass;
  isMarket?: boolean;
  buttonProps?: AppButtonProps;
  pathname?: string;
  id?: string;
  isSellerAddress?: boolean;

  onClickedBuy?: (data: NFTClass) => void;
};

export default memo(HeroCard);

const useStyles = makeStyles((theme: ThemeProps) => ({
  buyButtonWrapper: {
    position: "absolute",
    left: 0,
    bottom: -40,
    width: "100%",
    transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  buyButton: {
    width: "100%",
    minHeight: 36,
    height: 36,
  },
  container: {
    height: 315,
    width: "100%",
    alignItems: "center",
    background: `no-repeat top right / 100% 100% url(${ImageConstant.HeroCardBackgroundImage})`,
    padding: theme.spacing(0.5),
    borderRadius: 8,
  },
  root: {
    width: 220,
    position: "relative",
    overflow: "hidden",
    "&:hover $buyButtonWrapper": {
      transform: "translateY(-100%)",
    },
    "&:not(:hover) $buyButtonWrapper": {
      visibility: "hidden",
    },
    "&:hover $container": {
      opacity: 0.5,
    },
  },
  header: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(0, 1.5),
    width: "100%",
  },
  raceType: {
    "-webkit-text-stroke": "0.5px #667177",
    fontFamily: "Russo One",
    textTransform: "capitalize",
    lineHeight: "20px",
  },
  itemType: {
    color: theme.palette.grey[250],
    textTransform: "capitalize",
    lineHeight: "20px",
  },
  displayName: {
    marginTop: theme.spacing(1.75),
    fontFamily: "Russo One",
    textTransform: "capitalize",
    textShadow: `0px 1px 0px ${theme.palette.common.black}`,
    "-webkit-text-stroke": "0.5px #6013DB",
  },
  tokenImage: {
    width: 24,
    height: 24,
  },
}));
