import React, { memo } from "react";
import { Box, Stack, StackProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { AppButton, AppButtonProps, AppTypography, ImageHero } from "components/common";
import { useTranslation } from "react-i18next";
import { AppConstant, ImageConstant } from "const";
import { NFTClass } from "models";
import clsx from "clsx";
import withBuyNftMarketplaceController, {
  WithBuyNFTMarketplaceComponentProps,
} from "hoc/withBuyNftMarketplace";
import withCancelSellNftController, { CancelSellNftControllerProps } from "hoc/withCancelSellNft";

const HeroCardDetail = ({
  data,
  className,
  isMarketPlace = true,
  isSellerAddress,
  onStartBuyCard,
  onCancelStartSellCard,
  isCancelSell,
  ...otherProps
}: HeroCardProps) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

  const handleBuyOrCancel = () => {
    if (isSellerAddress) {
      typeof onCancelStartSellCard === "function" && onCancelStartSellCard(data);
      return;
    }
    typeof onStartBuyCard === "function" && onStartBuyCard(data);
  };

  return (
    <Box className={clsx(classes.root, className)}>
      <Stack className={clsx(classes.container)} {...otherProps}>
        <Box className={clsx("space-between-root", classes.header)}>
          <AppTypography variant="caption" className={classes.raceType}>
            {data.rareType}
          </AppTypography>
          <AppTypography variant="caption" className={classes.itemType}>
            {data.itemType}
          </AppTypography>
        </Box>
        {<ImageHero data={data.itemDetail} />}
        {isMarketPlace && (
          <>
            <AppTypography className={classes.displayName}>{data.displayName}</AppTypography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Box component="img" src={ImageConstant.TokenImage} className={classes.tokenImage} />
              <AppTypography fontWeight={500}>
                {data.formatPrice}
                <AppTypography variant="caption" fontWeight={500} ml={0.5} component="span">
                  {AppConstant.LABEL_TOKEN}
                </AppTypography>
              </AppTypography>
            </Stack>
          </>
        )}
      </Stack>
      {data.sellerAddress && isMarketPlace && (
        <AppButton
          className={classes.buyButton}
          wrapperProps={{
            className: classes.buyButtonWrapper,
          }}
          variant="contained"
          onClick={handleBuyOrCancel}
        >
          {isSellerAddress
            ? isCancelSell
              ? getLabel("lCanceling")
              : getLabel("lCancel")
            : getLabel("lBuyNow")}
        </AppButton>
      )}
    </Box>
  );
};

type HeroCardProps = StackProps & {
  data: NFTClass;
  buttonProps?: AppButtonProps;
  isMarketPlace?: boolean;
  isSellerAddress?: boolean;
} & WithBuyNFTMarketplaceComponentProps &
  CancelSellNftControllerProps;

const CardDetailComponent = (props: HeroCardProps) => {
  const CardDetailBuyComponent = withBuyNftMarketplaceController<HeroCardProps>(HeroCardDetail);
  return <CardDetailBuyComponent {...props} />;
};

export default memo(withCancelSellNftController<HeroCardProps>(CardDetailComponent));

const useStyles = makeStyles((theme: ThemeProps) => ({
  buyButtonWrapper: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  buyButton: {
    width: "100%",
    minHeight: 40,
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
