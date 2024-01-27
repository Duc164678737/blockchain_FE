import React, { ReactNode } from "react";
import { Box, BoxProps, InputProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { AppTypography } from "components/common";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { FormatUtils } from "utils";
import InputNumberInventory from "./InputNumberInventory";

const UnstakeForm = ({ totalBox, typeNftLabel, inputProps, button }: UnstakeFromProps) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_INVENTORY);

  return (
    <Box className={classes.root}>
      <Box className="space-between-root" mb={0.25}>
        <AppTypography fontWeight={500}>{typeNftLabel}</AppTypography>
        <AppTypography fontWeight={500}>
          {getLabel("fmTotal", {
            totalBox: FormatUtils.formatNumber(totalBox),
          })}
        </AppTypography>
      </Box>
      <InputNumberInventory placeholder={getLabel("pEnterQuantity")} {...inputProps} />
      <Box className="center-root" mt={4}>
        {button}
      </Box>
    </Box>
  );
};

type UnstakeFromProps = BoxProps & {
  totalBox: number;
  typeNftLabel: string;
  inputProps?: InputProps;
  button: ReactNode;
};

export default UnstakeForm;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    width: "100%",
    padding: theme.spacing(3),
    backgroundColor: theme.palette.layout.secondary,
    borderRadius: 8,
  },
}));
