import React, { memo } from "react";
import { makeStyles } from "@mui/styles";
import { AppButton, AppModal, AppModalProps, AppTypography } from "components/common";
import { StringOrNumber, ThemeProps } from "models/types";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NFTClass } from "models";

const BuyCardModal = ({ data, onBuyNft: onBuy, ...otherProps }: BuyCardModal) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

  return (
    <AppModal
      modalContentProps={{
        content: (
          <>
            <BuyCardModalRow label={getLabel("lSubtotal")} content={data?.getPriceWithToken()} />
            <BuyCardModalRow label={getLabel("lQuantity")} content={data?.quantity} />
            <BuyCardModalRow
              label={getLabel("lSubtotal")}
              content={`${data?.getTotalWithToken()}  ($${data?.getTotalUsdt()})`}
            />
          </>
        ),
      }}
      modalActionsProps={{
        children: (
          <AppButton
            variant="contained"
            className={classes.button}
            wrapperProps={{ className: classes.button }}
            onClick={onBuy}
          >
            {getLabel("lConfirm")}
          </AppButton>
        ),
      }}
      {...otherProps}
    />
  );
};

type BuyCardModal = AppModalProps & {
  data?: NFTClass;

  onBuyNft: () => void;
};

export default memo(BuyCardModal);
interface BuyCardModalRowProps {
  label: string;
  content?: StringOrNumber;
}
const BuyCardModalRow = ({ label, content }: BuyCardModalRowProps) => {
  const classes = useStyles();

  return (
    <Stack direction="row" justifyContent="space-between">
      <AppTypography variant="body1" color="light.light3" className={classes.labelNft}>
        {label}
      </AppTypography>
      <AppTypography variant="body1" color="light.light3" className={classes.labelNft}>
        {content}
      </AppTypography>
    </Stack>
  );
};

const useStyles = makeStyles((theme: ThemeProps) => ({
  button: {
    width: "100%",
  },
  labelNft: {
    marginBottom: theme.spacing(1),
  },
}));
