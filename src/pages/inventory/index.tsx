import React, { Fragment } from "react";
import { GetServerSidePropsContext, NextPage } from "next";
import { CommonUtils } from "utils";
import { PathConstant } from "const";

const Inventory: NextPage = () => {
  return <Fragment />;
};

export default Inventory;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  CommonUtils.handleRedirectUnauthorized(context);

  return {
    redirect: {
      permanent: false,
      destination: PathConstant.INVENTORY_WALLET_CARD,
    },
  };
};
