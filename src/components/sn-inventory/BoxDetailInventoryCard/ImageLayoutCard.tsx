import React, { memo } from "react";
import { Box, Stack, StackProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { ImageConstant } from "const";
import clsx from "clsx";

const ImageLayoutCard = ({ url, className, containerProps = {}, ...otherProps }: BoxCardProps) => {
  const classes = useStyles();
  const { className: containerClassName, ...otherContainerProps } = containerProps;

  return (
    <Box className={clsx(classes.root, className)} {...otherProps}>
      <Stack className={clsx(classes.container, containerClassName)} {...otherContainerProps}>
        <Box className={classes.imageWrapper}>
          <Box className={classes.image} component="img" src={url} />
        </Box>
      </Stack>
    </Box>
  );
};

type BoxCardProps = StackProps & {
  url: string;
  containerProps?: StackProps;
};

export default memo(ImageLayoutCard);

const useStyles = makeStyles((theme: ThemeProps) => ({
  container: {
    height: 320,
    width: 194,
    alignItems: "center",
    background: `no-repeat top right / 100% 100% url(${ImageConstant.BoxCardBackgroundImage})`,
    padding: theme.spacing(0, 2.25),
    borderRadius: 8,
  },
  root: {
    position: "relative",
    width: "fit-content",
  },
  imageWrapper: {
    marginTop: theme.spacing(8.5),
    width: 158,
    height: 192,
    background:
      "linear-gradient(122.23deg, rgba(255, 255, 255, 0.32) 1.06%, rgba(255, 255, 255, 0.08) 22.7%, rgba(255, 255, 255, 0.05) 39.19%, rgba(255, 255, 255, 0.05) 60.84%, rgba(255, 255, 255, 0.12) 76.29%, rgba(255, 255, 255, 0.31) 100%)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(1px)",
    borderRadius: 4,
    padding: theme.spacing(1, 0.5),
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
}));
