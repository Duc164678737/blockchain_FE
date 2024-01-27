import React, { memo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, NoSsr } from "@mui/material";
import { AppHead } from "components/common";
import { useCalcSizeDevice } from "hooks";
import { IProps, ThemeProps } from "models/types";
import SideBar, {
  WIDTH_COLLAPSIBLE_SIDE_BAR_IN_PX,
  WIDTH_SIDE_BAR_IN_PX,
} from "./components/SideBar";
import MLHeader, { HEADER_HEIGHT_IN_PX } from "./components/MLHeader";
import clsx from "clsx";

const MainLayout = ({ className, children, ...otherProps }: MainLayoutProps): JSX.Element => {
  useCalcSizeDevice();
  const classesDefault = useStyles();

  const [isCollapsible, setIsCollapsible] = useState(false);

  return (
    <>
      <AppHead />
      <NoSsr>
        <MLHeader isCollapsible={isCollapsible} />
        <SideBar
          isCollapsible={isCollapsible}
          onToggleSideBar={() => setIsCollapsible(!isCollapsible)}
        />
        <Box
          className={clsx(
            classesDefault.main,
            isCollapsible && classesDefault.largeLayout,
            className,
          )}
          {...otherProps}
        >
          {children}
        </Box>
      </NoSsr>
    </>
  );
};

type MainLayoutProps = IProps;

MainLayout.defaultProps = {};

export default memo(MainLayout);

export const MAIN_ID = "MAIN_ID";

const useStyles = makeStyles((theme: ThemeProps) => ({
  main: {
    position: "relative",
    minHeight: `calc(100vh - ${HEADER_HEIGHT_IN_PX}px)`,
    width: `calc(100vw - ${WIDTH_SIDE_BAR_IN_PX}px)`,
    marginTop: HEADER_HEIGHT_IN_PX,
    marginLeft: WIDTH_SIDE_BAR_IN_PX,
    background: theme.palette.layout.main,
    overflow: "hidden",
    transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  largeLayout: {
    width: `calc(100vw - ${WIDTH_COLLAPSIBLE_SIDE_BAR_IN_PX}px)`,
    marginLeft: WIDTH_COLLAPSIBLE_SIDE_BAR_IN_PX,
  },
}));
