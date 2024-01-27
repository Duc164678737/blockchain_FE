import React, { memo, useState } from "react";
import { Box, BoxProps, Stack, StackProps } from "@mui/material";
import { AppTypography } from "components/common";
import { useTranslation } from "react-i18next";
import { AppTypographyProps, ThemeProps } from "models/types";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { NFTClass } from "models";

const InfoDetailTowerSkin = ({
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
      {MOCK_DATA?.length < 70 ? (
        <AppTypography
          color="light.light5"
          variant="subtitle1"
          lineHeight={"20px"}
          {...infoAddressProps}
        >
          {MOCK_DATA}
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
            {MOCK_DATA}
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
    boxProps?: BoxProps;
  };
};

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    height: "313px",
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
    "-webkit-line-clamp": 8,
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

export default memo(InfoDetailTowerSkin);

const MOCK_DATA =
  "Lorem ipsum dolor sit amet. Aut corrupti voluptas nam fuga veritatis qui nulla reprehenderit id officia delectus. Aut laudantium incidunt qui maiores aspernatur qui autem sunt qui laudantium illo. Ut ratione tempora eum reprehenderit rerum aut ipsam sequi qui voluptas ratione quo omnis cumque qui velit asperiores aut voluptas iure? Est alias nihil At delectus ratione aut odit dolore.Ea ullam tenetur ut enim deserunt eum voluptatum dolore est vitae repellat sed debitis laboriosam et suscipit eligendi ab nihil vero. Quo excepturi neque et voluptates amet eum fugiat natus. Ut tempore atque id modi officia aut suscipit impedit qui repellendus beatae sit nemo amet et molestiae Quis. Ad facere galisum et omnis facilis At architecto eveniet non aliquam reiciendis sed numquam odit.Aut voluptatem molestiae ea laboriosam iusto aut quia autem et laudantium animi. Qui consequatur consequuntur sit enim vitae et provident nesciunt. 33 officiis maiores non voluptates accusantium aut sequi nulla est vitae blanditiis id repudiandae placeat et voluptates consequatur ex unde quod.              ";
