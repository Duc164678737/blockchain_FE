import React, { memo, useState } from "react";
import { Box, Stack, StackProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppTypographyProps, ObjectMultiLanguageProps, ThemeProps } from "models/types";
import { AppButton, AppCoolDownTimer, AppImage, AppTypography } from "components/common";
import { useTranslation } from "react-i18next";
import { AppImageType } from "../AppImage";
import clsx from "clsx";

const EventDetailCard = ({
  data,
  className,
  stackProps = {},
  infoProps = {},
  labelProps = {},
  imageProps = {},
  footerProps = {},
  titleProps = {},
  ...otherProps
}: EventDetailCardProps) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const claimButton: ObjectMultiLanguageProps = getLabel("objItemListSideBar", {
    returnObjects: true,
  });

  const { className: stackClassName, ...otherStackProps } = stackProps;
  const { className: infoClassName, ...otherInfoProps } = infoProps;
  const { className: labelClassName, ...otherLabelProps } = labelProps;
  const { classes: imageClasses, ...otherImageProps } = imageProps;
  const { titleEventProps, nameProps, contentProps } = footerProps;

  const [coolDownTime, setCoolDownTime] = useState(data.startDate);

  const handleOpenConFirmModal = () => {
    // TODO: Update when implement API
    return;
  };

  const handleFinishCoolDown = () => {
    if (coolDownTime === data.startDate) {
      setCoolDownTime(data.endDate);
    }
    if (coolDownTime === data.endDate) {
      setCoolDownTime(0);
    }
  };

  return (
    <Box className={clsx("space-between-root", classes.root, className)} {...otherProps}>
      <Stack className={clsx(classes.rootStack, stackClassName)} {...otherStackProps}>
        <AppImage
          classes={{ root: clsx(imageClasses?.root) }}
          {...otherImageProps}
          src={data.image}
          width={579}
          height={433}
        />
      </Stack>

      <Stack className={clsx(classes.info, infoClassName)} {...otherInfoProps}>
        <AppTypography
          mb={0.5}
          textTransform="uppercase"
          variant="subtitle1"
          lineHeight="19px"
          {...titleEventProps}
        >
          {getLabel("lEvent")}
        </AppTypography>
        <AppTypography mb={2} variant="h4" lineHeight="30px" fontWeight={700} {...nameProps}>
          {data.name}
        </AppTypography>
        <AppTypography mb={6} variant="body2" lineHeight="17px" {...contentProps}>
          {data.content}
        </AppTypography>
        {coolDownTime ? (
          <>
            {coolDownTime === data.startDate ? (
              <>
                <Stack
                  direction="row"
                  className={clsx(classes.label, labelClassName)}
                  {...otherLabelProps}
                >
                  <AppTypography
                    mr={0.625}
                    color="warning.main"
                    variant="subtitle1"
                    {...titleProps}
                  >
                    {getLabel("lStartIn")}
                  </AppTypography>
                  <AppCoolDownTimer
                    color="warning.main"
                    secondsRemaining={coolDownTime}
                    wrapperProps={{ sx: { fontWeight: 500 } }}
                    onFinish={handleFinishCoolDown}
                  />
                </Stack>
                <AppButton
                  disabled
                  wrapperProps={{ className: classes.wrapperButton }}
                  classes={{ root: classes.rootBtn }}
                >
                  {claimButton.lClaim}
                </AppButton>
              </>
            ) : (
              <>
                <Stack
                  direction="row"
                  className={clsx(classes.label, labelClassName)}
                  {...otherLabelProps}
                >
                  <AppTypography mr={0.625} variant="subtitle1" {...titleProps}>
                    {getLabel("lExpireIn")}
                  </AppTypography>
                  <AppCoolDownTimer
                    secondsRemaining={coolDownTime}
                    wrapperProps={{ sx: { fontWeight: 500 } }}
                    onFinish={handleFinishCoolDown}
                  />
                </Stack>
                <AppButton
                  variant="contained"
                  onClick={handleOpenConFirmModal}
                  wrapperProps={{ className: classes.wrapperButton }}
                  classes={{ root: classes.rootBtn }}
                >
                  {claimButton.lClaim}
                </AppButton>
              </>
            )}
          </>
        ) : (
          <>
            <Stack
              direction="row"
              className={clsx(classes.label, labelClassName)}
              {...otherLabelProps}
            >
              <AppTypography mr={0.625} variant="subtitle1" color="error.main" {...titleProps}>
                {getLabel("lEnd")}
              </AppTypography>
            </Stack>
            <AppButton
              disabled
              wrapperProps={{ className: classes.wrapperButton }}
              classes={{ root: classes.rootBtn }}
            >
              {claimButton.lClaim}
            </AppButton>
          </>
        )}
      </Stack>
    </Box>
  );
};

type EventDetailCardProps = StackProps & {
  data: {
    name: string;
    content: string;
    image: string;
    startDate: number;
    endDate: number;
  };
  stackProps?: StackProps;
  infoProps?: StackProps;
  labelProps?: StackProps;
  imageProps?: Pick<AppImageType, "classes">;
  titleProps?: AppTypographyProps;
  footerProps?: {
    titleEventProps?: AppTypographyProps;
    nameProps?: AppTypographyProps;
    contentProps?: AppTypographyProps;
  };
};

export default memo(EventDetailCard);

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    display: "flex",
  },
  rootStack: {
    borderRadius: 8,
    overflow: "hidden",
    marginRight: theme.spacing(5),
  },
  wrapperButton: {
    width: "100%",
  },
  rootBtn: {
    width: "100%",
  },
  info: {
    borderRadius: 8,
    overflow: "hidden",
    padding: theme.spacing(3),
    maxWidth: "450px",
    minHeight: "433px",
    background: theme.palette.modal.title,
  },
  label: {
    background: theme.palette.grey[700],
    padding: theme.spacing(1.5, 5),
    justifyContent: "center",
    color: theme.palette.success.light2,
    marginBottom: theme.spacing(2),
  },
}));
