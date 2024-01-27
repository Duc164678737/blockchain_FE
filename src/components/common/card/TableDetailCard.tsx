import React, { memo } from "react";
import { Box, BoxProps, Grid, GridProps, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { ThemeProps } from "models/types";
import { INftStats } from "models/classes/Nft";

const TableDetailCard = ({
  data,
  className,
  gridChildProps = {},
  imageProps = {},
  addGridChildProps = {},
  boxWrapperProps,
  ...otherProps
}: TableDetailCardProps) => {
  const classes = useStyles();

  const { className: gridChildClassName, ...otherGridChildProps } = gridChildProps;
  const { className: addGridChildClassName, ...otherAddGridChildProps } = addGridChildProps;
  const { classes: imageClasses, ...otherImageProps } = imageProps;

  const missingItemNumber = 3 - (data?.length % 3);
  const missingGridArray = missingItemNumber < 3 ? Array.from(Array(missingItemNumber).keys()) : [];

  return (
    <Box className={clsx("custom-scrollbar", classes.border)}>
      <Grid container className={clsx(classes.root, className)} {...otherProps}>
        {data?.map((item, index) => (
          <Grid
            key={index}
            item
            xs={4}
            className={clsx("center-root", classes.boxRoot, gridChildClassName)}
            {...otherGridChildProps}
          >
            <Tooltip
              title={item.StatName}
              placement="top"
              classes={{
                tooltip: clsx(classes.tooltip),
              }}
            >
              <Box className="center-root" {...boxWrapperProps}>
                {item.IconUrl && (
                  <Box
                    component="img"
                    classes={{ root: clsx(classes.imageCard, imageClasses) }}
                    src={item.IconUrl}
                    width={26}
                    height={26}
                    mr={1}
                    {...otherImageProps}
                  />
                )}
                {item.Value}
              </Box>
            </Tooltip>
          </Grid>
        ))}
        {missingGridArray.map((item, index) => {
          return (
            <Grid
              key={index}
              item
              xs={4}
              className={clsx("center-root", classes.addGridItem, addGridChildClassName)}
              {...otherAddGridChildProps}
            />
          );
        })}
      </Grid>
    </Box>
  );
};

type TableDetailCardProps = GridProps & {
  data: Array<INftStats>;
  imageProps?: BoxProps;
  gridChildProps?: GridProps;
  addGridChildProps?: GridProps;
  boxWrapperProps?: BoxProps;
};

export default memo(TableDetailCard);

const useStyles = makeStyles((theme: ThemeProps) => ({
  border: {
    position: "relative",
    height: "184px",
    maxHeight: "184px",
    overflow: "hidden scroll",
  },
  root: {
    position: "absolute",
    width: "100%",
    borderRight: `0.5px solid ${theme.palette.dark.dark5}`,
    background: theme.palette.layout.main,
  },
  boxRoot: {
    width: "100%",
    borderLeft: `0.5px solid ${theme.palette.dark.dark5}`,
    height: theme.spacing(10),
    borderBottom: `0.5px solid ${theme.palette.dark.dark5}`,
    "&:nth-child(1),&:nth-child(2),&:nth-child(3)": {
      borderTop: `0.5px solid ${theme.palette.dark.dark5}`,
    },
  },
  addGridItem: {
    width: "100%",
    borderLeft: `0.5px solid ${theme.palette.dark.dark5}`,
    height: theme.spacing(10),
    borderBottom: `0.5px solid ${theme.palette.dark.dark5}`,
  },
  imageCard: {
    marginRight: theme.spacing(1),
  },
  tooltip: {
    padding: theme.spacing(1, 1.5),
    backgroundColor: theme.palette.webBase.light5,
    borderRadius: 4,
    lineHeight: "17px",
    fontSize: 14,
    color: theme.palette.light.light5,
    border: `0.5px solid ${theme.palette.webBase.light4}`,
  },
}));
