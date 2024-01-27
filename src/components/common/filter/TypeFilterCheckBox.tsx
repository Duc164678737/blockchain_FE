import React, { memo, useEffect, useState } from "react";
import { FormControlLabel, FormControlLabelProps, Stack, StackProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AppTypography from "../AppTypography";
import { AppCheckbox } from "../form";
import { StringOrNumber, ThemeProps } from "models/types";
import clsx from "clsx";

const TypeFilterCheckBox = ({
  data,
  title,
  className,
  onChangeValue,
  formControlLabelProps,
  ...otherProps
}: AppFilterBoxProps) => {
  const defaultClasses = useStyles();

  const [filters, setFilters] = useState(data);

  const onChangeFilters = (value: StringOrNumber) => {
    const newFilters = filters.map((item) =>
      item.value === value ? { ...item, isChecked: !item.isChecked } : { ...item },
    );
    setFilters(newFilters);
    onChangeValue(newFilters);
  };

  useEffect(() => {
    if (Array.isArray(data)) {
      setFilters(data);
    }
  }, [data]);

  return (
    <Stack spacing={1} className={clsx(defaultClasses.root, className)} {...otherProps}>
      <AppTypography className={clsx(defaultClasses.text)}>{title}</AppTypography>
      {filters.map((item, index) => (
        <FormControlLabel
          key={index}
          classes={{
            ...formControlLabelProps?.classes,
            root: clsx(defaultClasses.labelRoot, formControlLabelProps?.classes?.root),
            label: clsx(defaultClasses.label, formControlLabelProps?.classes?.label),
          }}
          control={<AppCheckbox classes={{ checked: defaultClasses.checkbox }} />}
          label={item.label}
          value={item.value}
          checked={item.isChecked}
          onChange={() => {
            onChangeFilters(item.value);
          }}
          {...formControlLabelProps}
        />
      ))}
    </Stack>
  );
};

export interface IDataModal {
  label: string;
  value: StringOrNumber;
  isChecked: boolean;
}

export type AppFilterBoxProps = StackProps & {
  formControlLabelProps?: FormControlLabelProps;
  data: IDataModal[];
  title: string;

  onChangeValue: (data: IDataModal[]) => void;
};

export default memo(TypeFilterCheckBox);

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    width: "100%",
  },
  labelRoot: {
    width: "100%",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  label: {
    "&$label": {
      color: theme.palette.light.light5,
      marginLeft: 0,
      fontSize: "16px",
    },
  },
  checkbox: {
    "&, & + .MuiFormControlLabel-label": {
      color: theme.palette.common.white,
    },
  },
  text: {
    ...theme.typography?.h6,
    color: theme.palette.light.light3,
    marginBottom: theme.spacing(1),
  },
}));
