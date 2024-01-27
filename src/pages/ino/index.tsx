import React, { Fragment } from "react";
import { NextPage } from "next";
import { PathConstant } from "const";

const INO: NextPage = () => {
  return <Fragment />;
};

export const getServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: PathConstant.INO_FCFS,
    },
  };
};

export default INO;
