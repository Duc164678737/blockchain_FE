import React, { Fragment, useState } from "react";
import { Stack, StackProps } from "@mui/material";
import TransactionTab from "./TransactionTab";
import TransactionTable from "./TransactionTable";

const TransactionTabWalletDetail = ({ ...props }: StackProps) => {
  const [selectedTab, setSelectedTab] = useState(TYPE_TAB.transaction);

  return (
    <Stack spacing={2} {...props}>
      <TransactionTab
        value={selectedTab}
        onChange={(_: React.SyntheticEvent<Element, Event>, value: TYPE_TAB) =>
          setSelectedTab(value)
        }
      />
      {/* TODO: Update when have UI Result tab */}
      {selectedTab === TYPE_TAB.transaction ? <TransactionTable /> : <Fragment />}
    </Stack>
  );
};

export enum TYPE_TAB {
  transaction,
  result,
}

export default TransactionTabWalletDetail;
