import React, { memo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { FilterIcon } from "components/icons";
import { Button, Drawer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { QueryMarketplaceProps } from "redux-store/marketplace.redux";
import PanelFilter, { QueryProps } from "./PanelFilter";
import clsx from "clsx";

const CardNftFilterButton = ({ queryParams, onConfirmFilter }: CardNftFilterButtonProps) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpenDrawer(!isOpenDrawer)}
        classes={{
          root: classes.buttonRoot,
          startIcon: clsx(
            classes.startIcon,
            Object.keys(queryParams).length > 3 && classes.hightLight,
          ),
        }}
        startIcon={<FilterIcon />}
      >
        {getLabel("lAllFilters")}
      </Button>

      <Drawer
        anchor="right"
        open={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        classes={{ paper: classes.paperDrawer }}
      >
        <PanelFilter
          queryParams={queryParams}
          onConfirmFilter={(data) => {
            onConfirmFilter(data);
            setIsOpenDrawer(false);
          }}
        />
      </Drawer>
    </>
  );
};

export default memo(CardNftFilterButton);

export interface CardNftFilterButtonProps {
  queryParams: QueryMarketplaceProps;
  onConfirmFilter: (newQueryFormat: QueryProps) => void;
}

const useStyles = makeStyles((theme: ThemeProps) => ({
  buttonRoot: {
    ...theme.typography?.body1,
    color: theme.palette.light.light3,
    textTransform: "unset",
    borderRadius: 24,
    backgroundColor: theme.palette.grey[800],
    padding: theme.spacing(0.5, 1.5),
    "&:hover": {
      backgroundColor: theme.palette.grey[800],
    },
  },
  startIcon: {
    "&$startIcon": {
      marginLeft: 0,
      "&>*:nth-of-type(1)": {
        fontSize: 16,
      },
    },
  },
  hightLight: {
    color: theme.palette.primary.main,
  },
  paperDrawer: {
    width: 336,
    boxShadow: "none",
    padding: theme.spacing(4),
    background: "rgba(35, 25, 97, 1)",
  },
}));
