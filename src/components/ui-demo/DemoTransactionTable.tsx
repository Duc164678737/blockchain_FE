import React, { useState } from "react";
import { TransactionHistoryTable } from "components/common";
import { useTxHistoryTableHeadList } from "hooks";

const DemoTransactionTable = () => {
  const pageSize = 6;
  const totalItems = MOCK_TRANSACTION_LIST.length;
  const headLabels = useTxHistoryTableHeadList(TABLE_HEAD_LIST);

  const [pageNum, setPageNum] = useState<number>(1);
  const [data, setData] = useState(
    MOCK_TRANSACTION_LIST.slice(0, pageSize).map((item) => Object.values(item)),
  );

  const handleLoadMoreData = () => {
    const newPageNum = pageNum + 1;
    const startIndex = (newPageNum - 1) * pageSize;
    const nextPageData = MOCK_TRANSACTION_LIST.slice(startIndex, startIndex + pageSize).map(
      (item) => Object.values(item),
    );

    setData(data.concat(nextPageData));
    setPageNum(newPageNum);
  };

  const isLoadMore = data.length < totalItems;

  return (
    <TransactionHistoryTable
      headLabels={headLabels}
      rows={data}
      onGetMore={handleLoadMoreData}
      isLoadMore={isLoadMore}
    />
  );
};

export default DemoTransactionTable;

const TABLE_HEAD_LIST = ["lTimeUTC", "lTransactionHash", "lWalletAddress", "lType", "lPrice"];

const MOCK_TRANSACTION_LIST = [
  {
    time: 1680157445,
    transactionHash: "dfgdsfgdsfgdfgsdfas",
    walletAddress: "098348509384",
    type: 1,
    price: 2000,
  },
  {
    time: 1680157445,
    transactionHash: "dfgdsfgdsfgdfgsdfas",
    walletAddress: "098348509384",
    type: 1,
    price: 2000,
  },
  {
    time: 1680157445,
    transactionHash: "dfgdsfgdsfgdfgsdfas",
    walletAddress: "098348509384",
    type: 1,
    price: 2000,
  },
  {
    time: 1680157445,
    transactionHash: "dfgdsfgdsfgdfgsdfas",
    walletAddress: "098348509384",
    type: 1,
    price: 2000,
  },
  {
    time: 1680157445,
    transactionHash: "dfgdsfgdsfgdfgsdfas",
    walletAddress: "098348509384",
    type: 1,
    price: 2000,
  },
  {
    time: 1680157445,
    transactionHash: "dfgdsfgdsfgdfgsdfas",
    walletAddress: "098348509384",
    type: 1,
    price: 2000,
  },
  {
    time: 1680157445,
    transactionHash: "dfgdsfgdsfgdfgsdfas",
    walletAddress: "098348509384",
    type: 1,
    price: 2000,
  },
  {
    time: 1680157445,
    transactionHash: "dfgdsfgdsfgdfgsdfas",
    walletAddress: "098348509384",
    type: 1,
    price: 2000,
  },
  {
    time: 1680157445,
    transactionHash: "dfgdsfgdsfgdfgsdfas",
    walletAddress: "098348509384",
    type: 1,
    price: 2000,
  },
  {
    time: 1680157445,
    transactionHash: "dfgdsfgdsfgdfgsdfas",
    walletAddress: "098348509384",
    type: 1,
    price: 2000,
  },
  {
    time: 1680157445,
    transactionHash: "dfgdsfgdsfgdfgsdfas",
    walletAddress: "098348509384",
    type: 1,
    price: 2000,
  },
  {
    time: 1680157445,
    transactionHash: "dfgdsfgdsfgdfgsdfas",
    walletAddress: "098348509384",
    type: 1,
    price: 2000,
  },
];
