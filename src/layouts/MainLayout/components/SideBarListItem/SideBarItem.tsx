import React, { memo, ReactElement } from "react";
import { ListItemIcon, MenuItem, MenuItemProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { AppTypography } from "components/common";
import clsx from "clsx";

const SideBarItem = ({
  classes,
  selected,
  isCollapsible,
  children,
  checkedIcon,
  startIcon,
  endIcon,
  labelClassName,
  iconProps = {},
  ...otherProps
}: SideBarProps) => {
  const defaultClasses = useStyles();
  const { endIconClassName, startIconClassName } = iconProps;

  return (
    <MenuItem
      classes={{
        ...classes,
        root: clsx(defaultClasses.root, classes?.root),
        selected: clsx(defaultClasses.selected, classes?.selected),
        disabled: clsx(defaultClasses.disabled, classes?.disabled),
      }}
      selected={selected}
      {...otherProps}
    >
      {startIcon && (
        <ListItemIcon className={clsx(defaultClasses.iconStart, startIconClassName)}>
          {selected ? checkedIcon : startIcon}
        </ListItemIcon>
      )}
      <AppTypography
        className={clsx(
          defaultClasses.text,
          isCollapsible && defaultClasses.collapsibleText,
          labelClassName,
        )}
      >
        {children}
      </AppTypography>
      {endIcon && (
        <ListItemIcon
          className={clsx(
            defaultClasses.endIcon,
            isCollapsible && defaultClasses.hiddenIcon,
            endIconClassName,
          )}
        >
          {endIcon}
        </ListItemIcon>
      )}
    </MenuItem>
  );
};

export default memo(SideBarItem);

type SideBarProps = MenuItemProps & {
  isCollapsible?: boolean;
  startIcon?: ReactElement;
  checkedIcon?: ReactElement;
  endIcon?: ReactElement;
  labelClassName?: string;
  iconProps?: {
    endIconClassName?: string;
    startIconClassName?: string;
  };
};

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    borderRadius: 8,
    padding: theme.spacing(1.5),
    transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  text: {
    ...theme.typography?.body2,
    fontSize: 20,
    maxWidth: "100%",
    fontFamily: "Russo One",
    transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    overflow: "hidden",
  },
  collapsibleText: {
    maxWidth: 0,
  },
  selected: {
    "&$selected": {
      backgroundColor: theme.palette.grey[80],
      "&:hover": {
        backgroundColor: theme.palette.grey[80],
      },
    },
    "&>p": {
      background: theme.palette.gradient.hover,
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent",
    },
  },
  iconStart: {
    "&$iconStart": {
      fontSize: 24,
      minWidth: "unset",
      marginRight: 12,
    },
  },
  endIcon: {
    "&$endIcon": {
      minWidth: "unset",
      position: "absolute",
      right: 10,
      fontSize: 12,
      transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
  },
  disabled: {
    "&$disabled": {
      "&,& $iconStart": {
        color: theme.palette.dark.dark5,
        opacity: 1,
      },
    },
  },
  hiddenIcon: {
    overflow: "hidden",
    width: 0,
  },
}));
