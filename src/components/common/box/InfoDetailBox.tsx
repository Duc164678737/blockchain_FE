import React, { memo, useState } from "react";
import { Box, BoxProps, Stack, StackProps } from "@mui/material";
import { AppTypography } from "components/common";
import { useTranslation } from "react-i18next";
import { AppTypographyProps, ThemeProps } from "models/types";
import { makeStyles } from "@mui/styles";
import { NFTClass } from "models";
import DetailRateBox from "./DetailRateBox";
import clsx from "clsx";

const InfoDetailBox = ({
  data,
  className,
  contentProps = {},
  ...otherProps
}: InfoDetailCardProps) => {
  const { t: getLabel } = useTranslation();
  const classes = useStyles();
  const {
    titleProps,
    addressProps,
    infoAddressProps,
    titleAddressProps,
    labelProps,
    boxProps: { ...boxProps },
  } = contentProps;
  const { className: boxClassName, ...otherBoxProps } = boxProps;

  const [isShowMore, setIsShowMore] = useState(false);

  const handleClickSeeMore = () => setIsShowMore((preState) => !preState);

  return (
    <Stack className={clsx(classes.root, className)} {...otherProps}>
      <AppTypography variant="h4" mb={1} fontWeight={700} textTransform="uppercase" {...titleProps}>
        {data.item.displayName}
      </AppTypography>
      <AppTypography
        color="light.light5"
        variant="subtitle1"
        lineHeight={"20px"}
        mb={2.5}
        className={clsx("center-vertical-root")}
        {...addressProps}
      >
        {getLabel("lOwner")}
        <AppTypography
          color="common.white"
          variant="subtitle1"
          lineHeight={"20px"}
          component="span"
          ml={0.5}
          {...titleAddressProps}
        >
          {data.buyerAddress}
        </AppTypography>
      </AppTypography>
      <AppTypography variant="subtitle2" color="light.light4" mb={0.5} {...labelProps}>
        {getLabel("lDropRate")}
      </AppTypography>
      <DetailRateBox />
      {data.description.length < 60 ? (
        <AppTypography
          color="light.light5"
          variant="subtitle1"
          lineHeight={"20px"}
          {...infoAddressProps}
        >
          {data.description}
        </AppTypography>
      ) : (
        <Box
          className={clsx(
            "custom-scrollbar",
            classes.boxContent,
            isShowMore && classes.textContentScroll,
            boxClassName,
          )}
          {...otherBoxProps}
        >
          <AppTypography
            color="light.light5"
            variant="subtitle1"
            lineHeight={"20px"}
            className={clsx(!isShowMore && classes.textContent)}
            {...infoAddressProps}
          >
            {data.description}
          </AppTypography>
          <AppTypography
            color="info.light3"
            variant="subtitle1"
            lineHeight={"20px"}
            onClick={handleClickSeeMore}
            className={clsx(classes.cursor)}
            {...infoAddressProps}
          >
            {!isShowMore ? getLabel("lMore") : getLabel("lLess")}
          </AppTypography>
        </Box>
      )}
    </Stack>
  );
};

type InfoDetailCardProps = StackProps & {
  data: NFTClass;
  contentProps?: {
    titleProps?: AppTypographyProps;
    addressProps?: AppTypographyProps;
    infoAddressProps?: AppTypographyProps;
    titleAddressProps?: AppTypographyProps;
    labelProps?: AppTypographyProps;
    boxProps?: BoxProps;
  };
};

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    height: 375,
    padding: theme.spacing(3, 3, 1.5, 3),
    background: theme.palette.layout.secondary,
    borderRadius: 8,
    flex: 1,
  },
  boxContent: {
    maxHeight: "170px",
    marginBottom: theme.spacing(2),
  },
  textContent: {
    display: "-webkit-box",
    "-webkit-line-clamp": 6,
    "-webkit-box-orient": "vertical",
    overflow: "hidden ",
  },
  textContentScroll: {
    overflow: "hidden scroll",
  },
  cursor: {
    cursor: "pointer",
  },
}));

export default memo(InfoDetailBox);
