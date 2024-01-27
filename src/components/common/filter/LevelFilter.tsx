import React, { memo, useEffect, useState } from "react";
import {
  Box,
  BoxProps,
  MenuItem,
  MenuItemProps,
  Select,
  SelectChangeEvent,
  SelectProps,
  Stack,
  StackProps,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { StringOrNumber, ThemeProps } from "models/types";
import { useTranslation } from "react-i18next";
import { CaretIcon } from "components/icons";
import AppTypography from "../AppTypography";
import clsx from "clsx";

const LevelFilter = ({
  onChangeLevel,
  level,
  wrapperProps = {},
  selectProps = {},
  menuItemProps = {},
  ...otherProps
}: AppFilterTrackProps) => {
  const defaultClasses = useStyles();
  const { t: getLabel } = useTranslation();
  const { className: wrapperClassName, ...otherWrapperProps } = wrapperProps;
  const { classes: selectClasses, ...otherSelectProps } = selectProps;
  const { classes: menuItemClasses, ...otherMenuItemProps } = menuItemProps;

  const [initLevel, setInitLevel] = useState(0);

  useEffect(() => {
    const newInitValue = level ?? initLevel;
    setInitLevel(newInitValue);
  }, [level]);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const changeLevel = Number(event.target.value);
    setInitLevel(changeLevel);
    onChangeLevel(changeLevel);
  };

  return (
    <Stack {...otherProps}>
      <AppTypography variant="h6" mb={1.5}>
        {getLabel("lLevel")}
      </AppTypography>
      <Box className={clsx(defaultClasses.root, wrapperClassName)} {...otherWrapperProps}>
        <Select
          className={clsx(defaultClasses.menuSelect, selectClasses)}
          value={initLevel}
          onChange={handleChange}
          IconComponent={CaretIcon}
          classes={{
            select: clsx(defaultClasses.outline, selectClasses?.outlined),
            icon: clsx(defaultClasses.icon, selectClasses?.icon),
          }}
          MenuProps={{
            classes: { list: defaultClasses.menuRoot, paper: defaultClasses.paperRoot },
            MenuListProps: {
              classes: { root: clsx("custom-scrollbar", defaultClasses.menuListRoot) },
            },
          }}
          {...otherSelectProps}
        >
          {ARRAY_LEVEL.map((item, index) => (
            <MenuItem
              key={index}
              value={item}
              classes={{
                root: clsx(defaultClasses.menuItem, menuItemClasses?.root),
                selected: clsx(defaultClasses.selected, menuItemClasses?.selected),
                ...menuItemClasses,
              }}
              {...otherMenuItemProps}
            >
              {getLabel("lLevelFilter", {
                count: index,
              })}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Stack>
  );
};

export const ARRAY_LEVEL = [...Array(15).keys()];

export interface IDataModal {
  label: string;
  value: StringOrNumber;
  isChecked: boolean;
}

export type AppFilterTrackProps = StackProps & {
  wrapperProps?: BoxProps;
  selectProps?: SelectProps;
  menuItemProps?: MenuItemProps;
  onChangeLevel: (id: number) => void;
  level?: number;
};

export default memo(LevelFilter);

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    width: "100%",
  },
  outline: {
    color: theme.palette.grey[300],
    padding: theme.spacing(1, 2),
  },
  paperRoot: {
    borderRadius: 2,
    backgroundColor: "transparent",
    marginTop: theme.spacing(1),
    overflow: "hidden",
  },
  menuListRoot: {
    background: theme.palette.secondary.light5,
    maxHeight: 220,
    overflow: "hidden scroll",
    borderRadius: 4,
  },
  menuSelect: {
    width: "100%",
    background: theme.palette.grey[50],
    height: 48,
    borderRadius: 8,
    border: "none",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  icon: {
    transform: "rotate(270deg)",
    marginRight: theme.spacing(2),
  },
  menuRoot: {
    padding: theme.spacing(1, 0),
  },
  menuItem: {
    width: "100%",
    padding: theme.spacing(1, 2),
    color: theme.palette.light.light5,
    ...theme.typography?.body1,
    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.light5,
    },
  },
  selected: {
    "&$selected": {
      "&$selected": {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.light5,
      },
    },
  },
}));
