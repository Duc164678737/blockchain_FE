import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { Box, BoxProps, Divider, IconButton, IconButtonProps, InputProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { NumberOrNull, ThemeProps } from "models/types";
import { MinusIcon, PlusIcon } from "components/icons";
import clsx from "clsx";
import NumberInput from "./NumberInput";

const AppNumericInput = ({
  className,
  minusIconProps = {},
  plusIconProps = {},
  numberInputProps = {},
  minValue,
  maxValue,
  isDisabled,
  isDivider = true,
  onChangeValue,
  ...otherProps
}: AppNumericInputProps) => {
  const defaultClasses = useStyles();
  const { classes: numberInputClasses, ...otherNumberInputProps } = numberInputProps;
  const { classes: minusIconClassName, ...otherMinusIconProps } = minusIconProps;
  const { classes: plusIconClassName, ...otherPlusIconProps } = plusIconProps;

  const INIT_VALUE = minValue ?? 1;

  const preInputValueRef = useRef(INIT_VALUE);

  const [value, setValue] = useState(INIT_VALUE);

  const handleIncrement = () => {
    setValue(value + 1);
  };

  const handleDecrement = () => {
    setValue(value - 1);
  };

  const disabledMinusButton = useMemo(
    () => isDisabled || value <= INIT_VALUE,
    [value, minValue, isDisabled],
  );

  const disabledPlusButton = useMemo(
    () => isDisabled || value >= maxValue,
    [value, maxValue, isDisabled],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    const valueUpdate = Number(newValue);

    if (!isNaN(valueUpdate) && valueUpdate >= INIT_VALUE && valueUpdate <= maxValue) {
      setValue(valueUpdate);
    } else if (newValue === "") {
      setValue(0);
    } else {
      return;
    }
  };

  const handleBlur = () => {
    if (value) return;
    setValue(preInputValueRef.current);
  };

  useEffect(() => {
    if (value !== 0) {
      onChangeValue(value);
      preInputValueRef.current = value;
    }
  }, [value]);

  return (
    <Box
      className={clsx(
        "space-between-root",
        defaultClasses.boxInput,
        isDisabled && defaultClasses.disabled,
        className,
      )}
      {...otherProps}
    >
      <IconButton
        disabled={disabledMinusButton}
        classes={{
          ...minusIconClassName,
          root: clsx(defaultClasses.button, minusIconClassName?.root),
          disabled: defaultClasses.buttonDisable,
        }}
        aria-label="decrement"
        size="small"
        onClick={handleDecrement}
        {...otherMinusIconProps}
      >
        <MinusIcon />
      </IconButton>
      <Divider
        orientation="vertical"
        className={defaultClasses.divider}
        sx={{ display: isDivider ? "block" : "none" }}
      />
      <NumberInput
        disabled={isDisabled}
        value={value || ""}
        onBlur={handleBlur}
        onChange={handleInputChange}
        classes={{
          ...numberInputClasses,
          root: clsx(defaultClasses.inputRoot, numberInputClasses?.root),
          input: clsx(defaultClasses.input, numberInputClasses?.input),
        }}
        {...otherNumberInputProps}
      />
      <Divider
        orientation="vertical"
        className={defaultClasses.divider}
        sx={{ display: isDivider ? "block" : "none" }}
      />
      <IconButton
        disabled={disabledPlusButton}
        classes={{
          ...plusIconClassName,
          root: clsx(defaultClasses.button, plusIconClassName?.root),
          disabled: defaultClasses.buttonDisable,
        }}
        aria-label="increment"
        size="small"
        onClick={handleIncrement}
        {...otherPlusIconProps}
      >
        <PlusIcon />
      </IconButton>
    </Box>
  );
};

type AppNumericInputProps = BoxProps & {
  numberInputProps?: InputProps;
  minusIconProps?: IconButtonProps;
  plusIconProps?: IconButtonProps;
  minValue?: NumberOrNull;
  maxValue: number;
  isDisabled?: boolean;
  isDivider?: boolean;

  onChangeValue: (value: number) => void;
};

export default memo(AppNumericInput);

const useStyles = makeStyles((theme: ThemeProps) => ({
  boxInput: {
    width: 194,
    height: 48,
    borderRadius: 4,
    padding: 6,
    backgroundColor: theme.palette.secondary.light5,
  },
  disabled: {
    background: theme.palette.dark.dark3,
  },
  button: {
    borderRadius: 4,
    color: theme.palette.common.white,
    height: 36,
    width: 36,
    "&:hover": {
      background: "none",
    },
  },
  buttonDisable: {
    "&$buttonDisable": {
      color: theme.palette.grey[400],
    },
  },
  inputRoot: {
    maxWidth: 126,
    height: 36,
    margin: theme.spacing(0, 1.75),
    borderRadius: 8,
    "&:before,&:after": {
      display: "none",
    },
  },
  input: {
    lineHeight: "24px",
    textAlign: "center",
    background: "transparent",
    fontSize: 20,
    height: "unset",
    padding: 0,
    fontFamily: "Russo One",
    width: 60,
    border: "none",
  },
  divider: {
    borderRadius: 6,
    color: theme.palette.grey[600],
  },
}));
