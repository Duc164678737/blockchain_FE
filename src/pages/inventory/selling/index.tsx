import React, { Fragment } from "react";
import { NextPage } from "next";
import { PathConstant } from "const";

const Selling: NextPage = () => {
  return <Fragment />;
};

export default Selling;

export const getServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: PathConstant.INVENTORY_SELLING_CARD,
    },
  };
};
