import React, { ReactNode } from "react";
import { Box, InputProps, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppTypography } from "components/common";
import { LangConstant } from "const";
import { ThemeProps } from "models/types";
import { useTranslation } from "react-i18next";
import { FormatUtils } from "utils";
import InputNumberInventory from "./InputNumberInventory";

const SellAndStakeInputForm = ({
  totalBox,
  typeSemiNftLabel,
  sellButton,
  stakeButton,
  inputProps,
}: SellAndStakeInputFormProps) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_INVENTORY);

  return (
    <Box className={classes.root}>
      <Box className="space-between-root" mb={0.25}>
        <AppTypography fontWeight={500}>{typeSemiNftLabel}</AppTypography>
        <AppTypography fontWeight={500}>
          {getLabel("fmTotal", {
            totalBox: FormatUtils.formatNumber(totalBox),
          })}
        </AppTypography>
      </Box>
      <InputNumberInventory placeholder={getLabel("pEnterQuantity")} {...inputProps} />
      <Stack direction="row" spacing={2} mt={4}>
        {sellButton}
        {stakeButton}
      </Stack>
    </Box>
  );
};

type SellAndStakeInputFormProps = {
  totalBox: number;
  typeSemiNftLabel: string;
  sellButton: ReactNode;
  stakeButton: ReactNode;
  inputProps?: InputProps;
};

export default SellAndStakeInputForm;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.layout.secondary,
    padding: theme.spacing(3),
    borderRadius: 8,
  },
}));
