import React, { memo, ReactNode } from "react";
import { AppButton, AppInput, AppModal, AppModalProps, AppTypography } from "components/common";
import { useTranslation } from "react-i18next";
import { AppConstant, LangConstant } from "const";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { Box, Stack } from "@mui/material";
import clsx from "clsx";

const SellInputModal = ({
  labelNft,
  nftType,
  highestPrice,
  imageNft,
  labelButton,
  averagePrice,
  totalPrice,
  setTotalPrice,
  onSellNft,
  ...otherProps
}: SellInputModalProps) => {
  const classes = useStyles();
  const { t: getLabelCommon } = useTranslation();
  const { t: getLabel } = useTranslation(LangConstant.NS_INVENTORY);

  return (
    <AppModal
      modalContentProps={{
        content: (
          <>
            <Stack direction="row" spacing={1.5}>
              <Box className={clsx("center-root", classes.imageWrapper)}>{imageNft}</Box>
              <Stack justifyContent="space-between" className={classes.stack}>
                <Stack spacing={0.5}>
                  <AppTypography variant="body2" className={classes.labelNft}>
                    {labelNft}
                  </AppTypography>
                  <AppTypography className={classes.nftType}>{nftType}</AppTypography>
                </Stack>
                <Box className={classes.priceInMarketplace}>
                  <Box className={classes.container}>
                    <AppTypography className={classes.label}>
                      {getLabelCommon("lAveragePrice")}
                    </AppTypography>
                    <AppTypography className={classes.content}>{highestPrice}</AppTypography>
                  </Box>
                  <Box className={classes.container}>
                    <AppTypography className={classes.label}>
                      {getLabelCommon("lHighestPrice")}
                    </AppTypography>
                    <AppTypography className={classes.content}>{averagePrice}</AppTypography>
                  </Box>
                </Box>
              </Stack>
            </Stack>
            <Box mt={4}>
              <AppTypography
                variant="body2"
                lineHeight="16px"
                color="light.light3"
                fontWeight={500}
              >
                {getLabel("lPrice")}
              </AppTypography>
              <AppInput
                onKeyDown={(event) => INVALID_CHARS.includes(event.key) && event.preventDefault()}
                type="number"
                inputProps={{ classes: classes.input }}
                endAdornment={
                  <AppTypography
                    variant="body1"
                    className={clsx("center-root", classes.labelToken)}
                  >
                    {AppConstant.LABEL_TOKEN}
                  </AppTypography>
                }
                value={totalPrice}
                onChange={(event) => setTotalPrice(event.currentTarget.value)}
              />
            </Box>
          </>
        ),
      }}
      modalActionsProps={{
        children: (
          <AppButton
            disabled={!Number(totalPrice)}
            variant="contained"
            className={classes.button}
            wrapperProps={{ className: classes.button }}
            onClick={() => onSellNft(totalPrice)}
          >
            {labelButton || getLabel("lSell")}
          </AppButton>
        ),
      }}
      {...otherProps}
    />
  );
};

type SellInputModalProps = AppModalProps & {
  labelNft: string;
  nftType: string;
  imageNft: ReactNode;
  labelButton?: string;
  averagePrice?: string;
  highestPrice?: string;
  totalPrice: string;

  onSellNft: (value: string) => void;
  setTotalPrice: React.Dispatch<React.SetStateAction<string>>;
};

export default memo(SellInputModal);

const INVALID_CHARS = ["e", "E", "+", "-", ","];

const useStyles = makeStyles((theme: ThemeProps) => ({
  button: {
    width: "100%",
  },
  imageWrapper: {
    width: 76,
    height: 76,
    backgroundColor: theme.palette.modal.title,
    borderRadius: 1.76232,
    overflow: "hidden",
    padding: theme.spacing(0.5, 1.25),
  },
  labelNft: {
    fontWeight: 500,
    lineHeight: "16px",
    color: theme.palette.light.light3,
  },
  nftType: {
    fontSize: 20,
    lineHeight: "24px",
    color: theme.palette.common.white,
    fontWeight: 700,
  },
  labelToken: {
    position: "absolute",
    top: 0,
    right: 0,
    marginRight: theme.spacing(2),
    fontWeight: 500,
    height: "100%",
  },
  input: {
    color: theme.palette.common.white,
  },
  stack: {
    width: "100%",
  },
  priceInMarketplace: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
  },
  label: {
    ...theme.typography.caption,
    fontFamily: "Inter",
    lineHeight: "15px",
    color: theme.palette.light.light5,
    marginRight: theme.spacing(0.5),
  },
  content: {
    ...theme.typography.body1,
    fontFamily: "Inter",
    fontWeight: 600,
    lineHeight: "19px",
    color: theme.palette.light.main,
  },
}));
