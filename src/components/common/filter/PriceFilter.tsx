import React, { memo, useEffect, useState } from "react";
import { Box, Stack, StackProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { useTranslation } from "react-i18next";
import { AppTypography } from "components/common";
import { CommonUtils } from "utils";
import { NumberInput } from "../form";

const PriceFilter = ({ min, max, onChangePrice, ...otherProps }: PriceFilterProps) => {
  const defaultClasses = useStyles();
  const { t: getLabel } = useTranslation();

  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  const handleChangeValue = (variant: TYPE_CHANGE, newValue: string) => {
    let formatValue = CommonUtils.removeUnnecessarySpace(newValue);
    formatValue = isNaN(formatValue as any) ? newValue : formatValue;

    if (variant === TYPE_CHANGE.min) {
      setMinValue(formatValue);
    } else {
      setMaxValue(formatValue);
    }
  };

  useEffect(() => {
    !isNaN(min as any) && setMinValue(min as string);
    !isNaN(max as any) && setMaxValue(max as string);
  }, [min, max]);

  useEffect(() => {
    if ((!minValue && !maxValue) || Number(minValue) >= Number(maxValue)) return;
    onChangePrice(minValue, maxValue);
  }, [minValue, maxValue]);

  return (
    <Stack {...otherProps}>
      <AppTypography variant="h6" mb={2}>
        {getLabel("lPrice")}
      </AppTypography>
      <Box className="space-between-root">
        <NumberInput
          inValidChars={INVALID_CHARS}
          value={minValue}
          onChange={(event) => handleChangeValue(TYPE_CHANGE.min, event.currentTarget.value)}
          classes={{ root: defaultClasses.inputRoot, input: defaultClasses.input }}
          placeholder={getLabel("lPriceMin")}
        />
        <AppTypography mx={1}>{getLabel("lTo")}</AppTypography>
        <NumberInput
          inValidChars={INVALID_CHARS}
          value={maxValue}
          onChange={(event) => handleChangeValue(TYPE_CHANGE.max, event.currentTarget.value)}
          classes={{ root: defaultClasses.inputRoot, input: defaultClasses.input }}
          placeholder={getLabel("lPriceMax")}
        />
      </Box>
    </Stack>
  );
};

enum TYPE_CHANGE {
  min,
  max,
}

type PriceFilterProps = StackProps & {
  min?: string;
  max?: string;
  onChangePrice: (min: string, max: string) => void;
};

export default memo(PriceFilter);

const INVALID_CHARS = ["e", "E", "+", "-", ","];

const useStyles = makeStyles((theme: ThemeProps) => ({
  inputRoot: {
    backgroundColor: theme.palette.grey[50],
    borderRadius: 8,
    padding: theme.spacing(0, 2),
    height: 40,
    "&:after,&:before": {
      display: "none",
    },
  },
  input: {
    ...theme.typography?.body2,
    lineHeight: "18px",
    padding: 0,
  },
}));
