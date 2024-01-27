import React, { Fragment } from "react";
import { NextPage } from "next";
import { PathConstant } from "const";

const Home: NextPage = () => {
  return <Fragment />;
};

export default Home;

export const getServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: PathConstant.MARKETPLACE_CARD,
    },
  };
};
