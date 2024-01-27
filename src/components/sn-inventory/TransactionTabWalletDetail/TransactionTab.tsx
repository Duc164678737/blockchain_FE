import React, { memo, useMemo } from "react";
import { TabsProps } from "@mui/material";
import { AppTab, AppTabs } from "components/common";
import { useTranslation } from "react-i18next";
import { TYPE_TAB } from ".";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";

const TransactionTab = ({ ...otherProps }: TabsProps) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

  const tabList = useMemo(() => getTabList(getLabel), [getLabel]);

  return (
    <AppTabs {...otherProps}>
      {tabList.map((item, index) => (
        <AppTab
          key={index}
          classes={{
            root: classes.tabRoot,
          }}
          label={item.label}
        />
      ))}
    </AppTabs>
  );
};

export default memo(TransactionTab);

const getTabList = (getLabel: (key: string) => string) => [
  { value: TYPE_TAB.transaction, label: getLabel("lTransactionHistory") },
  { value: TYPE_TAB.result, label: getLabel("lResults") },
];

const useStyles = makeStyles((theme: ThemeProps) => ({
  tabRoot: {
    padding: theme.spacing(0, 1),
  },
}));
