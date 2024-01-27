import React from "react";
import { NftTabs } from "../components";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { Box, BoxProps, Stack } from "@mui/material";
import { AppTypography, AppPagination } from "components/common";
import { AppPaginationProps } from "components/common/AppPagination";
import clsx from "clsx";

const CommonNftListLayout = ({
  children,
  className,
  pathData,
  pagePaginationProps,
  pageFilter,
  label,
  ...otherProps
}: CommonNftListLayoutProps) => {
  const classes = useStyles();

  return (
    <Box className={clsx("custom-scrollbar", classes.layout, className)} {...otherProps}>
      <Box className={classes.wrapper}>
        <Box className={clsx("space-between-root", classes.tab)}>
          <NftTabs currentPagePathData={pathData} />
          <Stack direction="row" mb={1} spacing={2}>
            {pageFilter}
          </Stack>
        </Box>
        <AppTypography variant="h6" className={classes.totalHero}>
          {label}
        </AppTypography>
      </Box>
      {children}
      <Box className={classes.footer}>
        <AppPagination className={classes.pagination} {...pagePaginationProps} />
      </Box>
    </Box>
  );
};

export default CommonNftListLayout;

export interface CommonNftListLayoutProps extends BoxProps {
  pathData: string[];
  pagePaginationProps: AppPaginationProps;
  pageFilter: React.ReactNode;
  label: string;
}

export const useStyles = makeStyles((theme: ThemeProps) => ({
  layout: {
    background: theme.palette.layout.main,
    padding: theme.spacing(0, 7, 10),
    height: "100%",
    overflowY: "scroll",
  },
  wrapper: {
    background: theme.palette.layout.main,
    paddingTop: theme.spacing(4),
  },
  tab: {
    borderBottom: `1px solid ${theme.palette.dark.dark2}`,
  },
  totalHero: {
    fontSize: 20,
    margin: theme.spacing(2.5, 0),
  },
  footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: 77,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    background: theme.palette.layout.main,
  },
  pagination: {
    marginRight: theme.spacing(16.25),
  },
}));
