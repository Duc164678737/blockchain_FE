import React, { memo } from "react";
import { ButtonProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import { useGlobalModalContext } from "context/GlobalModalContext";
import AppModal, { AppModalProps } from "./AppModal";
import AppButton from "../AppButton";
import clsx from "clsx";

const NoticeModal = ({ onSubmit, onClose, buttonProps = {}, ...otherProps }: ConfirmModalProps) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

  const { labelAction, className: buttonClassName, ...otherButtonProps } = buttonProps;

  const { closeGlobalModal } = useGlobalModalContext();

  const handleCloseModal = onClose || closeGlobalModal;

  return (
    <AppModal
      modalActionsProps={{
        children: (
          <AppButton
            className={clsx(classes.button, buttonClassName)}
            wrapperProps={{ className: classes.wrapperButton }}
            variant="contained"
            onClick={onSubmit}
            {...otherButtonProps}
          >
            {labelAction || getLabel("lOk")}
          </AppButton>
        ),
      }}
      onClose={handleCloseModal}
      {...otherProps}
    />
  );
};

export type ConfirmModalProps = AppModalProps & {
  buttonProps: ButtonProps & { labelAction?: string };

  onSubmit: () => void;
};

export default memo(NoticeModal);

const useStyles = makeStyles(() => ({
  wrapperButton: {
    width: "100%",
    textTransform: "uppercase",
  },
  button: {
    width: "100%",
  },
}));
