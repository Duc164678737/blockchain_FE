import React, { Fragment } from "react";
import { NextPage } from "next";
import { PathConstant } from "const";

const Marketplace: NextPage = () => {
  return <Fragment />;
};

export default Marketplace;

export const getServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: PathConstant.MARKETPLACE_CARD,
    },
  };
};
