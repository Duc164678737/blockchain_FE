import React, { Fragment, memo } from "react";
import { Box, BoxProps, Divider, DividerProps, Stack, StackProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppTypography } from "components/common";
import { ThemeProps } from "models/types";
import clsx from "clsx";

const TransactionStep = ({
  className,
  transactionSteps,
  currentStep,
  dividerProps = {},
  stepWrapperProps,
  numberStepProps = {},
  ...otherProps
}: TransactionStepProps) => {
  const classes = useStyles();

  const { className: dividerClassName, ...otherDividerProps } = dividerProps;
  const { className: numberStepClassName, ...otherNumberStepProps } = numberStepProps;

  return (
    <Stack spacing={3} alignItems="center">
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        className={clsx(classes.root, className)}
        {...otherProps}
      >
        {transactionSteps.map((item, index) => {
          const stepNumber = index + 1;
          const isPassStep = currentStep >= stepNumber;

          return (
            <Fragment key={index}>
              {index > 0 && (
                <Divider
                  className={clsx(
                    classes.divider,
                    dividerClassName,
                    isPassStep && classes.hightLightColor,
                  )}
                  {...otherDividerProps}
                />
              )}
              <Stack
                className={clsx(isPassStep && classes.hightLightColor)}
                direction="row"
                alignItems="center"
                spacing={0.5}
                {...stepWrapperProps}
              >
                <Box
                  className={clsx(
                    "center-root",
                    classes.numberBox,
                    numberStepClassName,
                    isPassStep && classes.hightLightColor,
                  )}
                  {...otherNumberStepProps}
                >
                  {stepNumber}
                </Box>
                <AppTypography>{item.label}</AppTypography>
              </Stack>
            </Fragment>
          );
        })}
      </Stack>
      <AppTypography>
        {Boolean(currentStep) && transactionSteps[currentStep - 1].description}
      </AppTypography>
    </Stack>
  );
};

export type TransactionStepType = { label: string; description: string }[];

export type TransactionStepProps = StackProps & {
  transactionSteps: TransactionStepType;
  currentStep: number;
  dividerProps?: DividerProps;
  stepWrapperProps?: StackProps;
  numberStepProps?: BoxProps;
};

export default memo(TransactionStep);

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    ...theme.typography?.caption,
    lineHeight: "14px",
  },
  numberBox: {
    width: 16,
    height: 16,
    border: `1px solid ${theme.palette.light.light5}`,
    borderRadius: 2,
  },
  divider: {
    maxWidth: "30%",
    width: 60,
    borderStyle: "dashed",
  },
  hightLightColor: {
    borderColor: theme.palette.warning.light2,
    color: theme.palette.warning.light2,
  },
}));
