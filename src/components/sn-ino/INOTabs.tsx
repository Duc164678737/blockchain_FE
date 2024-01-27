import React from "react";
import { Box, Tabs } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { palette } from "public/material";
import { useTranslation } from "react-i18next";
import { LangConstant, PathConstant } from "const";
import { useRouter } from "next/router";
import INOTabItem from "./INOTabItem";

const INOTabs = () => {
  const defaultClasses = useStyles();
  const router = useRouter();
  const { t: getLabel } = useTranslation(LangConstant.NS_INO);

  return (
    <Box className={defaultClasses.container}>
      <Tabs
        value={router.pathname}
        classes={{
          flexContainer: defaultClasses.containerTabs,
          indicator: defaultClasses.indicator,
        }}
      >
        <INOTabItem
          href={PathConstant.INO_FCFS}
          value={PathConstant.INO_FCFS}
          label={getLabel("lFcfs")}
        />
        <INOTabItem
          href={PathConstant.INO_WHITELIST}
          value={PathConstant.INO_WHITELIST}
          label={getLabel("lWhitelist")}
        />
      </Tabs>
    </Box>
  );
};

export default INOTabs;

const useStyles = makeStyles({
  container: {
    background: palette.secondary.light4,
    height: "88px",
    display: "flex",
    justifyContent: "center",
    borderBottom: "2px solid #FFA009",
    alignItems: "flex-end",
  },
  containerTabs: {
    display: "flex",
    alignItems: "flex-end",
    minHeight: 38,
    height: "100%",
  },
  indicator: {
    display: "none",
  },
});
