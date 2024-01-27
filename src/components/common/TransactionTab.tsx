import React, {
  Dispatch,
  SetStateAction,
  useMemo,
  SyntheticEvent,
  ComponentPropsWithoutRef,
} from "react";
import { Box } from "@mui/material";
import AppTab from "./AppTab";
import AppTabs from "./AppTabs";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";

const TransactionTab = ({ selectedTab, onSelectTab, ...otherProps }: TransactionTabProps) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

  const tabList = useMemo(() => getTabList(getLabel), [getLabel]);

  const handleChange = (_: SyntheticEvent<Element, Event>, value: TYPE_TAB_TRANSACTION) =>
    onSelectTab && onSelectTab(value);

  return (
    <Box {...otherProps}>
      <AppTabs value={selectedTab} onChange={handleChange} classes={{ root: classes.appTabs }}>
        {tabList?.map((item, index) => (
          <AppTab
            key={index}
            classes={{
              root: classes.tabRoot,
            }}
            label={item.label}
          />
        ))}
      </AppTabs>
    </Box>
  );
};

interface TransactionTabProps extends ComponentPropsWithoutRef<"div"> {
  selectedTab?: TYPE_TAB_TRANSACTION;

  onSelectTab?: Dispatch<SetStateAction<TYPE_TAB_TRANSACTION>>;
}

export default TransactionTab;

export enum TYPE_TAB_TRANSACTION {
  transaction,
  result,
}

const getTabList = (getLabel: (key: string) => string) => [
  { value: TYPE_TAB_TRANSACTION.transaction, label: getLabel("lTransactionHistory") },
  { value: TYPE_TAB_TRANSACTION.result, label: getLabel("lResults") },
];

const useStyles = makeStyles((theme: ThemeProps) => ({
  appTabs: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
  tabRoot: {
    padding: theme.spacing(0, 1),
  },
}));
