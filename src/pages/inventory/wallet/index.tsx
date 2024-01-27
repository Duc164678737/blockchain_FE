import React, { Fragment } from "react";
import { NextPage } from "next";
import { PathConstant } from "const";

const Wallet: NextPage = () => {
  return <Fragment />;
};

export default Wallet;

export const getServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: PathConstant.INVENTORY_WALLET_CARD,
    },
  };
};
