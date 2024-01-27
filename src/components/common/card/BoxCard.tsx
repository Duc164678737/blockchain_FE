import React, { memo } from "react";
import { Box, Stack, StackProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { AppButton, AppButtonProps, AppLink, AppTrans, AppTypography } from "components/common";
import { useTranslation } from "react-i18next";
import { FormatUtils } from "utils";
import { AppConstant, ImageConstant } from "const";
import { NFTClass } from "models";
import clsx from "clsx";

const BoxCard = ({
  data,
  className,
  buttonProps,
  isMarket = true,
  pathname,
  id,
  isSellerAddress,
  ...otherProps
}: BoxCardProps) => {
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
            <AppTypography
              variant="body2"
              className={clsx(isMarket ? classes.totalBox : classes.totalBoxSell)}
            >
              {`${getLabel("lTotal")} ${data.quantity}`}
            </AppTypography>
            <Box className={classes.imageWrapper}>
              {data.item.iconUrl && (
                <Box className={classes.image} component="img" src={data.item.iconUrl} />
              )}
            </Box>
            {isMarket && (
              <>
                <AppTypography className={classes.totalPrice}>
                  {FormatUtils.formatNumber(data.price * data.quantity)}
                  <AppTypography fontWeight={700} ml={0.5} component="span">
                    {AppConstant.LABEL_TOKEN}
                  </AppTypography>
                </AppTypography>
                <AppTypography className={classes.price}>
                  <AppTrans
                    i18nKey={getLabel("fmPriceBox", {
                      total: FormatUtils.formatNumber(data.price),
                    })}
                  />
                </AppTypography>
              </>
            )}
          </Stack>
        </Box>
        {isSellerAddress && (
          <AppButton
            className={classes.buyOrViewButton}
            wrapperProps={{
              className: classes.buyOrViewButtonWrapper,
            }}
            variant="contained"
          >
            {getLabel("lViewDetail")}
          </AppButton>
        )}
      </AppLink>
      {isMarket && !isSellerAddress && (
        <AppButton
          className={classes.buyOrViewButton}
          wrapperProps={{
            className: classes.buyOrViewButtonWrapper,
          }}
          variant="contained"
          {...buttonProps}
        >
          {getLabel("lBuyNow")}
        </AppButton>
      )}
    </Box>
  );
};

type BoxCardProps = StackProps & {
  data: NFTClass;
  isMarket?: boolean;
  pathname?: string;
  id?: string;
  buttonProps?: AppButtonProps;
  isSellerAddress?: boolean;
};

export default memo(BoxCard);

const useStyles = makeStyles((theme: ThemeProps) => ({
  buyOrViewButtonWrapper: {
    position: "absolute",
    left: 0,
    bottom: -40,
    width: "100%",
    transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  buyOrViewButton: {
    width: "100%",
    minHeight: 36,
    height: 36,
  },
  container: {
    height: 320,
    width: "100%",
    alignItems: "center",
    background: `no-repeat top right / 100% 100% url(${ImageConstant.BoxCardBackgroundImage})`,
    padding: theme.spacing(0, 2.25),
    borderRadius: 8,
  },
  root: {
    position: "relative",
    overflow: "hidden",

    "&:hover $buyOrViewButtonWrapper": {
      transform: "translateY(-100%)",
    },
    "&:hover $container": {
      opacity: 0.5,
    },
  },
  imageWrapper: {
    marginTop: theme.spacing(8.5),
    width: 158,
    height: 192,
    background:
      "linear-gradient(122.23deg, rgba(255, 255, 255, 0.32) 1.06%, rgba(255, 255, 255, 0.08) 22.7%, rgba(255, 255, 255, 0.05) 39.19%, rgba(255, 255, 255, 0.05) 60.84%, rgba(255, 255, 255, 0.12) 76.29%, rgba(255, 255, 255, 0.31) 100%)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(1px)",
    borderRadius: 4,
    padding: theme.spacing(1, 0.5),
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
    marginTop: theme.spacing(0.875),
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
  totalBoxSell: {
    position: "absolute",
    fontFamily: "Russo one",
    bottom: 18,
    zIndex: 1,
    "-webkit-text-stroke": "0.5px #6013DB",
    textShadow: "0px 1px 0px #000000",
  },
}));
