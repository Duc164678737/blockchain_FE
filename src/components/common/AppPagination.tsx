import React, { memo } from "react";
import { Pagination, PaginationItem, PaginationItemProps, PaginationProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import clsx from "clsx";

const AppPagination = ({ itemProps = {}, ...otherProps }: AppPaginationProps) => {
  const defaultClasses = useStyles();
  const { classes, ...otherItemPropsProps } = itemProps;

  return (
    <Pagination
      shape="rounded"
      variant="outlined"
      renderItem={(item) => (
        <PaginationItem
          classes={{
            ...classes,
            root: clsx(defaultClasses.itemRoot, classes?.root),
            icon: clsx(defaultClasses.icon, classes?.icon),
            selected: clsx(defaultClasses.selected, classes?.selected),
          }}
          {...item}
          {...otherItemPropsProps}
        />
      )}
      {...otherProps}
    />
  );
};

export interface AppPaginationProps extends PaginationProps {
  itemProps?: PaginationItemProps;
}

export default memo(AppPagination);

const useStyles = makeStyles((theme: ThemeProps) => ({
  itemRoot: {
    ...theme.typography?.body2,
    color: "#676E81",
    fontWeight: 600,
    width: 29,
    minWidth: 29,
    height: 29,
    padding: theme.spacing(0.5),
    border: "unset",
  },
  selected: {
    "&$selected": {
      backgroundColor: "transparent",
      color: "#B9BCC5",
      border: `1px solid ${theme.palette.light.light5}`,
    },
  },
  icon: {
    fontSize: 24,
    color: theme.palette.light.light5,
    fontWeight: 400,
  },
}));
