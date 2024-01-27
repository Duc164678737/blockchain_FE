import React, { memo, ReactNode } from "react";
import { Stack } from "@mui/material";
import { AppTypography, TableDetailCard } from "components/common";
import { useTranslation } from "react-i18next";
import { AppTypographyProps, ThemeProps } from "models/types";
import { StackProps } from "@mui/system";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { NFTClass } from "models";

const InfoDetailCard = ({
  data,
  className,
  isMarketPlace = true,
  customFooter,
  contentProps = {},
  ...otherProps
}: InfoDetailCardProps) => {
  const { t: getLabel } = useTranslation();
  const classes = useStyles();
  const { titleProps, addressProps, infoAddressProps, titleAddressProps, labelProps } =
    contentProps;

  return (
    <Stack className={clsx(classes.root, className)} {...otherProps}>
      <AppTypography
        variant="h4"
        mb={0.5}
        fontWeight={700}
        textTransform="uppercase"
        {...titleProps}
      >
        {data.displayName}
      </AppTypography>
      {isMarketPlace && (
        <AppTypography
          color="light.light5"
          variant="subtitle1"
          lineHeight={"20px"}
          mb={1.5}
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
            {data.getDisplaySellerAddress()}
          </AppTypography>
        </AppTypography>
      )}
      <AppTypography
        color="light.light5"
        variant="subtitle1"
        lineHeight={"20px"}
        mb={2}
        {...infoAddressProps}
      >
        {data.description}
      </AppTypography>
      <AppTypography variant="h6" mb={1} fontSize={20} {...labelProps}>
        {getLabel("lStats")}
      </AppTypography>
      {<TableDetailCard data={data.itemStats} />}
      {customFooter}
    </Stack>
  );
};

type InfoDetailCardProps = StackProps & {
  data: NFTClass;
  isMarketPlace?: boolean;
  customFooter?: ReactNode;
  contentProps?: {
    titleProps?: AppTypographyProps;
    addressProps?: AppTypographyProps;
    infoAddressProps?: AppTypographyProps;
    titleAddressProps?: AppTypographyProps;
    labelProps?: AppTypographyProps;
  };
};

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    flex: 1,
    justifyContent: "space-between",
    maxHeight: "377px",
    padding: theme.spacing(3, 3, 1.5, 3),
    background: theme.palette.layout.secondary,
    borderRadius: 8,
  },
}));

export default memo(InfoDetailCard);
