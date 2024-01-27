import React from "react";
import { makeStyles } from "@mui/styles";
import { useAuthContext } from "context";
import { ThemeProps } from "models/types";
import { AppButton } from "components/common";
import { useTranslation } from "react-i18next";

const ConnectWalletButton = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

  const { handleToggleDrawer } = useAuthContext();

  return (
    <AppButton
      variant="contained"
      onClick={handleToggleDrawer}
      classes={{ contained: classes.containedBtn, root: classes.rootBtn }}
      wrapperProps={{
        className: classes.buttonWrapper,
      }}
    >
      {getLabel("lConnectWallet")}
    </AppButton>
  );
};

export default ConnectWalletButton;

const useStyles = makeStyles((theme: ThemeProps) => ({
  buttonWrapper: {
    boxShadow: "0px 0px 6px #EEAD1A",
  },
  rootBtn: {
    padding: theme.spacing(0.75, 2),
    fontSize: 18,
    minHeight: 36,
  },
  containedBtn: {
    "-webkit-text-stroke": "0.5px #000000",
  },
}));
