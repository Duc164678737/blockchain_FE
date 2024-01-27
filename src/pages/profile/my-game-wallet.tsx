import React from "react";
import { GetServerSidePropsContext, NextPage } from "next";
import { Container } from "@mui/material";
import { CommonUtils } from "utils";

const MyGameWallet: NextPage = () => {
  return <Container>MyGameWallet</Container>;
};

export default MyGameWallet;

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
  CommonUtils.handleRedirectUnauthorized(context);
