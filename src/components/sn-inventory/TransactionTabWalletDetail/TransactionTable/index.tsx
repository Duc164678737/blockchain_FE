import React, { Fragment, useState } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { NFTConstant } from "const";
import { ThemeProps } from "models/types";
import InfiniteScroll from "react-infinite-scroll-component";
import TransactionHeader from "./TransactionHeader";
import TransactionItem from "./TransactionItem";
import clsx from "clsx";

const TransactionTable = () => {
  const classes = useStyles();

  const [isMoreTransactions, setIsMoreTransactions] = useState(true);

  // TODO: update when implement api get transaction
  const page = 1;
  const totalPage = 2;
  const getTransaction = (newPage: number) => {
    return;
  };
  const handleGetTransactionHistory = () => {
    if (page >= totalPage) {
      setIsMoreTransactions(false);
      return;
    }
    getTransaction(page + 1);
  };

  return (
    <Grid className={classes.root} container>
      <TransactionHeader />
      <InfiniteScroll
        className="custom-scrollbar"
        next={handleGetTransactionHistory}
        hasMore={isMoreTransactions}
        dataLength={MOCK_TRANSACTION_LIST?.length || 0}
        height={325}
        loader={<Fragment />}
      >
        <Grid container>
          {MOCK_TRANSACTION_LIST?.map((item: any, index) => (
            <TransactionItem
              key={index}
              idTransaction={item.id}
              quantity={item.quantity}
              price={item.price}
              date={item.date}
            />
          ))}
        </Grid>
      </InfiniteScroll>
    </Grid>
  );
};

export default TransactionTable;

const MOCK_TRANSACTION_LIST = [
  {
    id: 12345678,
    quantity: 23,
    price: 123,
    date: 1680056431,
    status: NFTConstant.NFT_STATUS.selling,
  },
  {
    id: 12345678,
    quantity: 23,
    price: 123,
    date: 1680056431,
    status: NFTConstant.NFT_STATUS.cancelled,
  },
  {
    id: 12345678,
    quantity: 23,
    price: 123,
    date: 1680056431,
    status: NFTConstant.NFT_STATUS.cancelled,
  },
  {
    id: 12345678,
    quantity: 23,
    price: 123,
    date: 1680056431,
    status: NFTConstant.NFT_STATUS.selled,
  },
  {
    id: 12345678,
    quantity: 23,
    price: 123,
    date: 1680056431,
    status: NFTConstant.NFT_STATUS.cancelled,
  },
  {
    id: 12345678,
    quantity: 23,
    price: 123,
    date: 1680056431,
    status: NFTConstant.NFT_STATUS.cancelled,
  },
  {
    id: 12345678,
    quantity: 23,
    price: 123,
    date: 1680056431,
    status: NFTConstant.NFT_STATUS.selled,
  },
  {
    id: 12345678,
    quantity: 23,
    price: 123,
    date: 1680056431,
    status: NFTConstant.NFT_STATUS.cancelled,
  },
  {
    id: 12345678,
    quantity: 23,
    price: 123,
    date: 1680056431,
    status: NFTConstant.NFT_STATUS.cancelled,
  },
  {
    id: 12345678,
    quantity: 23,
    price: 123,
    date: 1680056431,
    status: NFTConstant.NFT_STATUS.selled,
  },
];

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    padding: theme.spacing(0, 1, 1),
    backgroundColor: theme.palette.layout.dark,
    borderRadius: 8,
  },
}));
