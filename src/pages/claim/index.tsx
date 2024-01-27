import React, { useMemo } from "react";
import { NextPage } from "next";
import { Stack, Container } from "@mui/material";
import { AppTypography, ClaimCard } from "components/common";
import { ImageClaimDemo } from "public/images/demo";
import { makeStyles } from "@mui/styles";
import { ObjectMultiLanguageProps, ThemeProps } from "models/types";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const Claim: NextPage = () => {
  const { t: getLabel } = useTranslation();
  const classes = useStyles();
  const objClaimContent: ObjectMultiLanguageProps = getLabel("objClaim", { returnObjects: true });

  const defaultData = useMemo(() => getDefaultFilters(objClaimContent), [objClaimContent]);

  return (
    <Container>
      <Stack className={clsx("center-root", classes.root)} spacing={6}>
        <AppTypography className={classes.title}>{objClaimContent.lTitle}</AppTypography>
        <Stack direction="row" flexWrap="wrap">
          {defaultData.map((item, index) => (
            <ClaimCard key={index} data={item} />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};

export default Claim;

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
      image: ImageClaimDemo,
      startDate: 1678947300,
      endDate: 1678956885,
    },
    {
      name: objClaimContent.lPrivate,
      content: objClaimContent.msgContent,
      image: ImageClaimDemo,
      startDate: 1678953285,
      endDate: 1678956885,
    },
    {
      name: objClaimContent.lHalloween,
      content: objClaimContent.msgContent,
      image: ImageClaimDemo,
      startDate: 1678947120,
      endDate: 1678947300,
    },
  ];
};
