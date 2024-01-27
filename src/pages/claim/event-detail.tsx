import React, { useMemo } from "react";
import { NextPage } from "next";
import { Stack, Container } from "@mui/material";
import { AppTypography, EventDetailCard } from "components/common";
import { imageEventDetail } from "public/images/demo";
import { makeStyles } from "@mui/styles";
import { ObjectMultiLanguageProps, ThemeProps } from "models/types";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const EventDetail: NextPage = () => {
  const { t: getLabel } = useTranslation();
  const classes = useStyles();
  const objClaimContent: ObjectMultiLanguageProps = getLabel("objClaim", { returnObjects: true });

  const defaultData = useMemo(() => getDefaultFilters(objClaimContent), [objClaimContent]);

  return (
    <Container>
      <Stack className={clsx("center-root", classes.root)} spacing={6}>
        <AppTypography className={classes.title}>{objClaimContent.lTitle}</AppTypography>
        <Stack flexWrap="wrap">
          <EventDetailCard data={defaultData[0]} />
        </Stack>
      </Stack>
    </Container>
  );
};

export default EventDetail;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    marginTop: theme.spacing(10),
  },
  title: {
    fontFamily: "Russo One",
    fontWeight: 400,
    fontSize: "40px",
    lineHeight: "48px",
  },
}));

const getDefaultFilters = (objClaimContent: ObjectMultiLanguageProps) => {
  return [
    {
      name: objClaimContent.lPublic,
      content: objClaimContent.msgContent,
      image: imageEventDetail,
      startDate: 1679022300,
      endDate: 1679022420,
    },
  ];
};
