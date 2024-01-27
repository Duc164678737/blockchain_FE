import React, { memo } from "react";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { Box } from "@mui/material";
import { AppTypography } from "components/common";
import { useTranslation } from "react-i18next";

const ComingSoonLabel = () => {
  const classes = useStyles();

  const { t: getLabel } = useTranslation();

  return (
    <Box className={classes.root}>
      <AppTypography variant="caption" lineHeight="14px">
        {getLabel("lComingSoon")}
      </AppTypography>
    </Box>
  );
};

export default memo(ComingSoonLabel);

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    position: "relative",
    backgroundColor: theme.palette.info.main,
    borderRadius: 4,
    padding: theme.spacing(0.5, 1),
    lineHeight: "14px",
    "&:after": {
      content: "''",
      position: "absolute",
      left: 0,
      top: "50%",
      width: 10,
      height: 5,
      transform: "translate(-100%,-50%)",
      borderTop: "3px solid transparent",
      borderRight: `5px solid ${theme.palette.info.main}`,
      borderBottom: "3px solid transparent",
    },
  },
}));
