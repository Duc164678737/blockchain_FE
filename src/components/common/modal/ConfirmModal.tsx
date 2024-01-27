import React, { memo } from "react";
import { ButtonProps, Stack, StackProps } from "@mui/material";
import { useGlobalModalContext } from "context/GlobalModalContext";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import AppModal, { AppModalProps } from "./AppModal";
import AppButton from "../AppButton";
import clsx from "clsx";

const ConfirmModal = ({
  onCancel,
  onConfirm,
  onClose,
  actionWrapperProps = {},
  cancelButtonProps = {},
  confirmButtonProps = {},
  ...otherProps
}: ConfirmModalProps) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

  const { className: actionWrapperClassName, ...otherActionWrapperProps } = actionWrapperProps;
  const { labelCancel, className: cancelClassName, ...otherButtonCancelProps } = cancelButtonProps;
  const {
    labelConfirm,
    className: confirmClassName,
    ...otherButtonConfirmProps
  } = confirmButtonProps;

  const { closeGlobalModal } = useGlobalModalContext();

  const handleCloseModal = onClose || closeGlobalModal;

  return (
    <AppModal
      modalActionsProps={{
        children: (
          <Stack
            direction="row"
            spacing={3}
            className={clsx(classes.actions, actionWrapperClassName)}
            {...otherActionWrapperProps}
          >
            <AppButton
              className={clsx(classes.button, cancelClassName)}
              wrapperProps={{ className: classes.wrapperButton }}
              variant="text"
              onClick={onCancel}
              {...otherButtonCancelProps}
            >
              {labelCancel || getLabel("lCancel")}
            </AppButton>
            <AppButton
              className={clsx(classes.button, confirmClassName)}
              wrapperProps={{ className: classes.wrapperButton }}
              variant="contained"
              onClick={onConfirm}
              {...otherButtonConfirmProps}
            >
              {labelConfirm || getLabel("lConfirm")}
            </AppButton>
          </Stack>
        ),
      }}
      onClose={handleCloseModal}
      {...otherProps}
    />
  );
};

export type ConfirmModalProps = AppModalProps & {
  labelCancel: string;
  labelConfirm: string;
  actionWrapperProps: StackProps;
  cancelButtonProps: ButtonProps & { labelCancel?: string };
  confirmButtonProps: ButtonProps & { labelConfirm?: string };

  onCancel: () => void;
  onConfirm: () => void;
};

export default memo(ConfirmModal);

const useStyles = makeStyles(() => ({
  actions: {
    width: "100%",
  },
  wrapperButton: {
    flex: 1,
  },
  button: {
    width: "100%",
  },
}));
