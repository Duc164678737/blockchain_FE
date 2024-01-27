import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppConstant } from "const";
import { ThemeProps } from "models/types";
import { useTranslation } from "react-i18next";
import { DateUtils } from "utils";

const useTxHistoryTableInventoryRowList = (
  transactionList: TypeUseTxRowElementInventory[],
  onCancelDeposit?: () => void,
) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

  const handleConvertTime = (time: number) => {
    return DateUtils.covertTimeStampToDateFormat(time, true, AppConstant.FULL_DATE_FORMAT);
  };

  const handleOrderStatus = (status: AppConstant.ORDER_STATUS) => {
    switch (status) {
      case AppConstant.ORDER_STATUS.PENDING:
        return getLabel("lPending");
      case AppConstant.ORDER_STATUS.SUCCESS:
        return getLabel("lSuccess");
      case AppConstant.ORDER_STATUS.CANCELLED:
        return getLabel("lCancelled");
      default:
        return "";
    }
  };

  return transactionList.map((item, index) => [
    <Typography key={index}>{item.type}</Typography>,
    <Typography key={index}>{item.transactionHash}</Typography>,
    <Typography key={index}>{item.quantity}</Typography>,
    <Typography key={index}>
      {handleConvertTime(item.date).date}, {handleConvertTime(item.date).time}
    </Typography>,
    <Typography className={classes.statusTX} key={index}>
      {handleOrderStatus(item.status)}
    </Typography>,
    <Button className={classes.buttonTX} key={index} onClick={onCancelDeposit}>
      {item.actionLabel}
    </Button>,
  ]);
};

export default useTxHistoryTableInventoryRowList;

interface TypeUseTxRowElementInventory {
  type: string;
  transactionHash: string;
  quantity: number;
  date: number;
  status: AppConstant.ORDER_STATUS;
  actionLabel: string;
}

const useStyles = makeStyles((theme: ThemeProps) => ({
  buttonTX: {
    ...theme.typography.body1,
    lineHeight: "19px",
    color: theme.palette.light.light3,
    textTransform: "capitalize",
    padding: theme.spacing(0.5, 1),
    borderRadius: 4,
    "&, &:hover": {
      background: theme.palette.error.light3,
    },
  },
  statusTX: {
    color: theme.palette.warning.main,
  },
}));
