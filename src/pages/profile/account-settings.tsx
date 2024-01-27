import React, { useEffect, useMemo, useState } from "react";
import { GetServerSidePropsContext, NextPage } from "next";
import { Box } from "@mui/material";
import { CommonUtils } from "utils";
import { AppTypography } from "components/common";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { useAuthContext } from "context";
import { AppConstant, LangConstant } from "const";
import { useTranslation } from "react-i18next";
import { useHandleConnectWalletFunc } from "context/hooks";
import Cookie from "js-cookie";
import QRCode from "react-qr-code";

const AccountSettings: NextPage = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ACCOUNT_SETTING);
  const { walletAddress, hasAccessToken } = useAuthContext();
  const { loginWallet } = useHandleConnectWalletFunc();
  const signature = Cookie.get(AppConstant.KEY_SIGNATURE);

  const [isOpenQrCode, setIsOpenQrCode] = useState(false);

  const qrCodeValue = useMemo(() => {
    return `${walletAddress}.${signature}`;
  }, [signature, walletAddress]);

  useEffect(() => {
    let count = 0;
    if (!hasAccessToken && walletAddress && signature) {
      const connectGameAccountInterval = setInterval(async () => {
        const responseData = await loginWallet(walletAddress, signature);
        count++;
        if (count === TIME_LIMITED || responseData.accessToken) {
          if (responseData.accessToken) {
            Cookie.set(AppConstant.KEY_TOKEN, responseData.accessToken);
          }
          clearInterval(connectGameAccountInterval);
          setIsOpenQrCode(true);
        }
      }, 5000);
    }
  }, [walletAddress, signature]);

  return (
    <Box className={classes.container}>
      {hasAccessToken || isOpenQrCode ? (
        <AppTypography className={classes.title}>{getLabel("lConnectedGameAccount")}</AppTypography>
      ) : (
        <>
          <AppTypography className={classes.title}>{getLabel("lConnectGameAccount")}</AppTypography>

          <AppTypography className={classes.content}>{getLabel("msgLoginGameAcc")}</AppTypography>

          <Box className={classes.wrapper}>
            <QRCode value={qrCodeValue} className={classes.qrCode} />
            <AppTypography className={classes.footerQrCode}>
              {getLabel("msgScanTheQRCode")}
            </AppTypography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AccountSettings;

// limited time for 1 minute
const TIME_LIMITED = 12;

const useStyles = makeStyles((theme: ThemeProps) => ({
  container: {
    maxWidth: 520,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(10, "auto"),
  },
  title: {
    fontFamily: "Russo One",
    fontWeight: 400,
    fontSize: 40,
    lineHeight: "48px",
    marginBottom: theme.spacing(2),
  },
  content: {
    lineHeight: "19px",
    color: theme.palette.light.light3,
    marginBottom: theme.spacing(6),
  },
  wrapper: {
    background: theme.palette.modal.title,
    borderRadius: 8,
    padding: theme.spacing(4),
  },
  qrCode: {
    width: "100%",
    height: "auto",
    borderRadius: 6,
    background: theme.palette.light.main,
    padding: theme.spacing(1.625),
  },
  footerQrCode: {
    lineHeight: "20px",
    textAlign: "center",
    color: theme.palette.light.main,
    marginTop: theme.spacing(2),
    padding: theme.spacing(0, 8.25),
  },
}));

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
  CommonUtils.handleRedirectUnauthorized(context);
