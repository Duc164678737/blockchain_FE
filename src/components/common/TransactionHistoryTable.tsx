import React, { ReactNode, useCallback, useLayoutEffect, useMemo, useRef } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableProps,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { palette } from "public/material";
import { AppTypography } from "components/common";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const TransactionHistoryTable = ({
  isTitle = true,
  headLabels,
  rows,
  isLoadMore,
  maxHeight = 325,
  onGetMore,

  ...otherProps
}: TransactionHistoryTableProps) => {
  const classes = useStyles();
  const tableEl = useRef<HTMLInputElement | null>(null);
  const { t: getLabel } = useTranslation();

  const handleScrollLoadData = useCallback(() => {
    if (
      isLoadMore &&
      onGetMore &&
      tableEl.current &&
      tableEl.current.offsetHeight + tableEl.current.scrollTop >= tableEl.current.scrollHeight
    ) {
      onGetMore();
    }
  }, [onGetMore]);

  const widthColumnPercent = useMemo(() => {
    if (headLabels) {
      return 100 / headLabels.length;
    }
  }, [headLabels]);

  useLayoutEffect(() => {
    const tableRef = tableEl.current;
    if (tableRef) {
      tableRef.addEventListener("scroll", handleScrollLoadData);
    }
    return () => {
      if (tableRef) {
        tableRef.removeEventListener("scroll", handleScrollLoadData);
      }
    };
  }, [handleScrollLoadData]);

  return (
    <>
      {isTitle && (
        <AppTypography className={classes.transactionTitle}>
          {getLabel("lTransactionHistory")}
        </AppTypography>
      )}
      <TableContainer
        sx={{ height: maxHeight }}
        component={Paper}
        className={clsx("custom-scrollbar", classes.container)}
        ref={tableEl}
      >
        <Table {...otherProps}>
          <TableHead classes={{ root: classes.tableHead }}>
            <TableRow>
              {headLabels?.map((headerName, index) => (
                <Box
                  component="td"
                  sx={{ width: `${widthColumnPercent}%` }}
                  key={index}
                  className={classes.itemHead}
                >
                  {headerName}
                </Box>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.length === 0 ? (
              <TableRow>
                <Box component="td" colSpan={headLabels?.length ?? 1}>
                  <AppTypography className={classes.noDataText}>
                    {getLabel("lNoDataUppercase")}
                  </AppTypography>
                </Box>
              </TableRow>
            ) : (
              <>
                {rows?.map((bodyItem, index) => (
                  <TableRow key={index} classes={{ root: classes.tableRow }}>
                    {headLabels?.map((_, index) => (
                      <Box component="td" key={index} className={classes.itemBody}>
                        {bodyItem[index]}
                      </Box>
                    ))}
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

type StringOrNode = string | ReactNode;
interface TransactionHistoryTableProps extends TableProps {
  isTitle?: boolean;
  isLoadMore?: boolean;
  headLabels?: StringOrNode[];
  rows?: StringOrNode[][];
  maxHeight?: number;

  onGetMore?: () => void;
}

export default TransactionHistoryTable;

const useStyles = makeStyles((theme: ThemeProps) => ({
  container: {
    borderRadius: 8,
    padding: theme.spacing(0, 1),
    "&, $tableHead": {
      background: theme.palette.layout.secondary,
    },
  },
  transactionTitle: {
    ...theme.typography.h5,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    lineHeight: theme.typography.body1.lineHeight,
    textTransform: "capitalize",
    color: theme.palette.light.main,
  },
  tableHead: {
    position: "sticky",
    top: 0,
    zIndex: 2,
    borderBottom: `1px solid ${palette.dark.dark5}`,
  },
  itemHead: {
    color: theme.palette.light.light5,
    fontWeight: 500,
    lineHeight: "19px",
    padding: theme.spacing(1.5, 1),
  },
  tableRow: {
    borderBottom: `1px solid ${palette.dark.dark5}`,
    fontWeight: 300,
    verticalAlign: "top",
    "&:last-child": {
      border: 0,
    },
  },
  itemBody: {
    padding: theme.spacing(1.5, 1),
    color: theme.palette.light.light3,
  },
  noDataText: {
    fontWeight: 500,
    fontSize: 24,
    lineHeight: "28px",
    color: theme.palette.light.light3,
    position: "absolute",
    right: "50%",
    marginTop: "7%",
    transform: "translateX(50%)",
  },
}));
