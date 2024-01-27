import React from "react";
import { Box, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { CaretIcon } from "components/icons";
import { ImageConstant } from "const";
import SideBarListItem from "./SideBarListItem/SideBarListItem";
import Logo from "./Logo";
import clsx from "clsx";

const SideBar = ({ isCollapsible, onToggleSideBar, ...otherProps }: SideBarProps) => {
  const defaultClasses = useStyles();

  return (
    <Box
      className={clsx(defaultClasses.root, isCollapsible && defaultClasses.collapsibleBar)}
      {...otherProps}
    >
      <IconButton className={defaultClasses.toggleButton} onClick={onToggleSideBar}>
        <CaretIcon
          className={clsx(defaultClasses.icon, isCollapsible && defaultClasses.rotateIcon)}
        />
      </IconButton>
      <Logo isCollapsible={isCollapsible} />
      <SideBarListItem
        className={defaultClasses.listItem}
        isCollapsible={isCollapsible}
        spacing={1}
        mt={6}
      />
    </Box>
  );
};

type SideBarProps = {
  isCollapsible: boolean;
  onToggleSideBar: () => void;
};

export default SideBar;

export const WIDTH_SIDE_BAR_IN_PX = 336;
export const WIDTH_COLLAPSIBLE_SIDE_BAR_IN_PX = 80;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    width: WIDTH_SIDE_BAR_IN_PX,
    background: theme.palette.secondary.main,
    padding: theme.spacing(3, 1.875, 3, 2),
    borderRight: "1px solid #202020",
    zIndex: theme.zIndex.appBar + 1,
    transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  collapsibleBar: {
    width: WIDTH_COLLAPSIBLE_SIDE_BAR_IN_PX,
  },
  toggleButton: {
    position: "absolute",
    right: -1,
    top: 176,
    transform: "translateX(100%)",
    width: 20,
    height: 48,
    fontSize: 10,
    background: `no-repeat 0 0 / 100% url(${ImageConstant.ToggleButtonImage})`,
    borderRadius: 0,
    "&:hover": {
      background: `no-repeat 0 0 / 100% url(${ImageConstant.ToggleButtonImage})`,
    },
  },
  listItem: {
    overflowX: "hidden",
  },
  icon: {
    transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  rotateIcon: {
    transform: "rotate(180deg)",
  },
}));
