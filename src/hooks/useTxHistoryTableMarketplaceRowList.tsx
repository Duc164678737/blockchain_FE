import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { LangConstant } from "const";
import { TransactionHistoryClass } from "models";
import { ThemeProps } from "models/types";

const useTxHistoryTableMarketplaceRowList = (transactionList: TransactionHistoryClass[]) => {
  const classes = useStyles();

  return transactionList.map((item, index) => [
    <Box key={index}>
      <Typography>{item.getBlockDate().date}</Typography>
      <Typography className={classes.timeText}>{item.getBlockDate().time}</Typography>
    </Box>,
    <Typography key={index}>{item.getDisplayTxHash()}</Typography>,
    <Typography key={index}>{item.getDisplayWalletAddress()}</Typography>,
    <Typography key={index}>{item.getDisplayActionType(LangConstant.NS_INVENTORY)}</Typography>,
    <Typography key={index}>{item.getDisplayPrice()}</Typography>,
  ]);
};

export default useTxHistoryTableMarketplaceRowList;

const useStyles = makeStyles((theme: ThemeProps) => ({
  timeText: {
    fontSize: 12,
    lineHeight: "14px",
    color: theme.palette.light.light5,
    marginTop: theme.spacing(1.25),
  },
}));
