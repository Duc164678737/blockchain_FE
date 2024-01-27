import React, { memo, useState } from "react";
import { Box, BoxProps, Stack, StackProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppTypographyProps, ThemeProps } from "models/types";
import { AppCoolDownTimer, AppImage, AppTypography } from "components/common";
import { useTranslation } from "react-i18next";
import { AppImageType } from "../AppImage";
import clsx from "clsx";

const ClaimCard = ({
  data,
  className,
  stackProps = {},
  labelProps = {},
  imageProps = {},
  footerProps = {},
  titleProps = {},
  boxProps = {},
  ...otherProps
}: ClaimCardProps) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

  const { className: stackClassName, ...otherStackProps } = stackProps;
  const { className: labelClassName, ...otherLabelProps } = labelProps;
  const { classes: imageClasses, ...otherImageProps } = imageProps;
  const { className: boxClassName, ...otherBoxProps } = boxProps;
  const { nameProps, contentProps } = footerProps;

  const [coolDownTime, setCoolDownTime] = useState(data.startDate);

  const handleFinishCoolDown = () => {
    if (coolDownTime === data.startDate) {
      setCoolDownTime(data.endDate);
    }
    if (coolDownTime === data.endDate) {
      setCoolDownTime(0);
    }
  };

  return (
    <Stack className={clsx(classes.root, className)} {...otherProps}>
      <Stack className={clsx(classes.rootStack, stackClassName)} {...otherStackProps}>
        <AppImage
          classes={{ root: clsx(imageClasses?.root) }}
          {...otherImageProps}
          src={data.image}
          width={343}
          height={343}
        />
        {coolDownTime ? (
          <Stack
            direction="row"
            className={clsx(classes.label, labelClassName)}
            {...otherLabelProps}
          >
            <AppTypography variant="subtitle1" {...titleProps}>
              {coolDownTime === data.startDate ? getLabel("lStartIn") : getLabel("lExpireIn")}
            </AppTypography>
            <AppCoolDownTimer
              secondsRemaining={coolDownTime}
              wrapperProps={{ sx: { fontWeight: 500 } }}
              onFinish={handleFinishCoolDown}
            />
          </Stack>
        ) : (
          <Box className={clsx("center-root", classes.boxDisable, boxClassName)} {...otherBoxProps}>
            <AppTypography
              textTransform="uppercase"
              variant="subtitle1"
              className={clsx(classes.labelDisable, labelClassName)}
              {...titleProps}
            >
              {getLabel("lEnd")}
            </AppTypography>
          </Box>
        )}
      </Stack>

      <Stack mx={1.5} spacing={1} mt={1.5}>
        <AppTypography variant="h5" lineHeight="28px" fontWeight={600} {...nameProps}>
          {data.name}
        </AppTypography>
        <AppTypography variant="body2" lineHeight="17px" {...contentProps}>
          {data.content}
        </AppTypography>
      </Stack>
    </Stack>
  );
};

type ClaimCardProps = StackProps & {
  data: {
    name: string;
    content: string;
    image: string;
    startDate: number;
    endDate: number;
  };
  stackProps?: StackProps;
  labelProps?: StackProps;
  imageProps?: Pick<AppImageType, "classes">;
  titleProps?: AppTypographyProps;
  boxProps?: BoxProps;
  footerProps?: {
    nameProps?: AppTypographyProps;
    contentProps?: AppTypographyProps;
  };
};

export default memo(ClaimCard);

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    position: "relative",
    height: 454,
    maxWidth: 343,
    backgroundColor: theme.palette.modal.title,
    borderRadius: 8,
    overflow: "hidden",
    margin: theme.spacing(2.5),
  },
  rootStack: {
    alignItems: "center",
  },
  label: {
    lineHeight: "16px",
    position: "absolute",
    top: 279,
    zIndex: 1,
    padding: theme.spacing(1.5, 5),
    background: theme.palette.grey[55],
    borderRadius: 4,
    backdropFilter: "blur(6px)",
  },
  boxDisable: {
    position: "absolute",
    backdropFilter: "blur(0.5x)",
    width: "100%",
    height: "100%",
    background: theme.palette.grey[30],
  },
  labelDisable: {
    position: "absolute",
    fontWeight: 700,
    fontSize: "40px",
    lineHeight: "47px",
    zIndex: 1,
    padding: theme.spacing(1.5),
    background: theme.palette.grey[20],
    borderRadius: 8,
  },
}));
