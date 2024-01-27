import React, { memo, Fragment, ReactNode } from "react";
import { AppTypographyProps, ThemeProps } from "models/types";
import { makeStyles } from "@mui/styles";
import { CloseIcon } from "components/icons";
import {
  Dialog,
  DialogActionsProps,
  DialogContentProps,
  DialogProps,
  IconButton,
  IconButtonProps,
} from "@mui/material";
import AppModalTitle from "./AppModalTitle";
import AppModalContent from "./AppModalContent";
import AppModalActions from "./AppModalActions";
import clsx from "clsx";

const AppModal = ({
  classes = {},
  hasCloseIcon = true,
  modalTitle,
  modalContent,
  modalActions,
  actions,
  onClose,
  modalTitleProps = {},
  modalContentProps = {},
  modalActionsProps = {},
  closeIconProps = {},
  ...otherProps
}: AppModalProps) => {
  const defaultClasses = useStyles();

  const { content, ...otherModalContentProps } = modalContentProps;
  const { title, ...otherModalTitleProps } = modalTitleProps;
  const { children: dialogActionsChildren, ...otherDialogActionsProps } = modalActionsProps;
  const { className: closeIconClassName, ...otherCloseIconProps } = closeIconProps;

  return (
    <Dialog
      scroll="paper"
      classes={{ ...classes, paper: clsx(defaultClasses.paper, classes.paper) }}
      BackdropProps={{ classes: { root: defaultClasses.backdrop } }}
      {...otherProps}
    >
      {hasCloseIcon && (
        <IconButton
          onClick={onClose}
          className={clsx(defaultClasses.closeIconButton, closeIconClassName)}
          {...otherCloseIconProps}
        >
          <CloseIcon />
        </IconButton>
      )}

      {modalTitle ?? <AppModalTitle {...otherModalTitleProps}>{title}</AppModalTitle>}

      {modalContent ?? <AppModalContent {...otherModalContentProps}>{content}</AppModalContent>}

      {modalActions ??
        (actions || dialogActionsChildren ? (
          <AppModalActions {...otherDialogActionsProps}>
            {actions || dialogActionsChildren}
          </AppModalActions>
        ) : (
          <Fragment />
        ))}
    </Dialog>
  );
};

export default memo(AppModal);

export type AppModalProps = DialogProps & {
  hasCloseIcon?: boolean;
  actions?: ReactNode;
  modalTitle?: ReactNode;
  modalContent?: ReactNode;
  modalActions?: ReactNode;
  modalTitleProps?: { title?: string } & AppTypographyProps;
  modalContentProps?: { content?: ReactNode } & DialogContentProps;
  modalActionsProps?: DialogActionsProps;
  closeIconProps?: IconButtonProps;
  onClose: () => void;
};

const useStyles = makeStyles((theme: ThemeProps) => ({
  paper: {
    position: "relative",
    width: 548,
    maxWidth: "100%",
    background: theme.palette.modal.paper,
    borderRadius: 12,
    boxShadow: "none",
  },
  backdrop: {
    background: theme.palette.grey[60],
  },
  closeIconButton: {
    position: "absolute",
    right: 16,
    top: 16,
    width: 32,
    height: 32,
    fontSize: 20,
    backgroundColor: theme.palette.grey[50],
    borderRadius: "50%",
    padding: 0,
  },
}));
