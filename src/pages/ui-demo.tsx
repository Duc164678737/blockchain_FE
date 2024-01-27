import React from "react";
import { NextPage } from "next";
import { Container, Stack } from "@mui/material";
import { EnvConstant, PathConstant } from "const";
import {
  DemoAppButton,
  DemoAppTabs,
  DemoAppInput,
  DemoCheckBoxButton,
  DemoAppModal,
  DemoIconButton,
  DemoNumericInput,
  DemoGlobalModal,
  DemoAppRadio,
  DemoAppSwitch,
  DemoTransactionModal,
  DemoAppSnackbar,
  DemoAppCoolDownTimer,
  DemoSellInputModal,
  DemoTransactionTable,
} from "components/ui-demo";

const UIDemo: NextPage = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Stack spacing={6}>
        <DemoAppInput />
        <DemoAppTabs />
        <DemoIconButton />
        <DemoCheckBoxButton />
        <DemoAppButton />
        <DemoAppModal />
        <DemoNumericInput />
        <DemoGlobalModal />
        <DemoAppRadio />
        <DemoAppSwitch />
        <DemoTransactionModal />
        <DemoAppSnackbar />
        <DemoAppCoolDownTimer />
        <DemoSellInputModal />
        <DemoTransactionTable />
      </Stack>
    </Container>
  );
};

export const getServerSideProps = async () => {
  return EnvConstant.IS_DEV
    ? { props: {} }
    : {
        redirect: {
          permanent: false,
          destination: PathConstant.ROOT,
        },
      };
};

export default UIDemo;
