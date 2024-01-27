import React, { memo } from "react";
import { Box, Stack, StackProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { AppButton, AppButtonProps, AppTrans, AppTypography } from "components/common";
import { useTranslation } from "react-i18next";
import { AppConstant, ImageConstant } from "const";
import { NFTClass } from "models";
import clsx from "clsx";

const TowerSkinCardDetail = ({
  data,
  className,
  buttonProps,
  ...otherProps
}: TowerSkinCardProps) => {
  const classes = useStyles();

  const { t: getLabel } = useTranslation();

  return (
    <Box className={clsx(classes.root, className)}>
      <Stack className={clsx(classes.container)} {...otherProps}>
        <AppTypography variant="body2" className={classes.totalBox}>
          {`${getLabel("lTotal")} ${data.quantity}`}
        </AppTypography>
        <Box className={classes.imageWrapper}>
          <Box className={classes.image} component="img" src={data.item.iconUrl} />
        </Box>
        <AppTypography className={classes.totalPrice}>
          {data.quantityNft}
          <AppTypography fontWeight={700} ml={0.5} component="span">
            {AppConstant.LABEL_TOKEN}
          </AppTypography>
        </AppTypography>
        <AppTypography className={classes.price}>
          <AppTrans i18nKey={getLabel("fmPriceTowerSkin", { total: data.price })} />
        </AppTypography>
      </Stack>

      <AppButton
        className={clsx(classes.buyButton)}
        wrapperProps={{
          className: clsx(classes.buyButtonWrapper),
        }}
        variant="contained"
        // TODO: Update HOC when implement buy card
        onClick={(e) => e.preventDefault()}
        {...buttonProps}
      >
        {getLabel("lBuyNow")}
      </AppButton>
    </Box>
  );
};

type TowerSkinCardProps = StackProps & {
  data: NFTClass;
  buttonProps?: AppButtonProps;
};

export default memo(TowerSkinCardDetail);

const useStyles = makeStyles((theme: ThemeProps) => ({
  buyButtonWrapper: {
    position: "absolute",
    left: 0,
    width: "100%",
    transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  buyButton: {
    width: "100%",
    minHeight: 36,
    height: 44,
  },
  container: {
    height: 257,
    width: "100%",
    alignItems: "center",
    background: `no-repeat top right / 100% 100% url(${ImageConstant.EmoteCardBackgroundImage})`,
    padding: theme.spacing(0, 2.25),
    borderRadius: 8,
    marginBottom: theme.spacing(1),
  },
  root: {
    position: "relative",
    overflow: "hidden",
  },
  imageWrapper: {
    marginTop: theme.spacing(8.625),
    width: 158,
    height: 128,
    background:
      "linear-gradient(122.23deg, rgba(255, 255, 255, 0.32) 1.06%, rgba(255, 255, 255, 0.08) 22.7%, rgba(255, 255, 255, 0.05) 39.19%, rgba(255, 255, 255, 0.05) 60.84%, rgba(255, 255, 255, 0.12) 76.29%, rgba(255, 255, 255, 0.31) 100%)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(1px)",
    borderRadius: 4,
    padding: theme.spacing(0.5, 1),
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  totalBox: {
    position: "absolute",
    fontFamily: "Russo one",
    top: 35,
    left: 18,
    zIndex: 1,
    "-webkit-text-stroke": "0.5px #6013DB",
    textShadow: "0px 1px 0px #000000",
  },
  totalPrice: {
    marginTop: theme.spacing(1),
    textTransform: "uppercase",
    fontSize: 20,
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  price: {
    ...theme.typography?.caption,
    fontWeight: 500,
    lineHeight: "16px",
  },
}));
