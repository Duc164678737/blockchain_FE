import React, { Fragment } from "react";
import { GetServerSidePropsContext, NextPage } from "next";
import { PathConstant } from "const";
import { CommonUtils } from "utils";

const InGame: NextPage = () => {
  return <Fragment />;
};

export default InGame;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  CommonUtils.handleRedirectUnauthorizedGameAccount(context);

  return {
    redirect: {
      permanent: false,
      destination: PathConstant.INVENTORY_IN_GAME_CARD,
    },
  };
};
