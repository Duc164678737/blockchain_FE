/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, createContext, useContext, useMemo } from "react";
import { ConfirmModal, NoticeModal } from "components/common";

/* ------------- Types ------------- */
export const MODAL_TYPES = {
  confirmModal: "confirmModal",
  noticeModal: "noticeModal",
};

/* ------------- Mapping Type With Component ------------- */
const createMapping = () => ({
  [MODAL_TYPES.confirmModal]: ConfirmModal,
  [MODAL_TYPES.noticeModal]: NoticeModal,
});

/* ------------- Initial State ------------- */
const INITIAL_STATE = {} as GlobalModalContextProps;

const GlobalModalContext = createContext(INITIAL_STATE);
export const useGlobalModalContext = () => useContext(GlobalModalContext);
const GLOBAL_MODAL_ID = "global-modal";

export const GlobalModalProvider: React.FC<ProviderProps> = ({ children }) => {
  const [store, setStore] = useState<StoreProps>({});
  const { modalType, modalProps } = store;
  const modalMappingComponents = useMemo(createMapping, []);

  const showGlobalModal: ShowGlobalModalProps = (newModalType, newModalProps) => {
    const modalProps = newModalProps || {};
    modalProps.open = true; // Show modal

    setStore({
      ...store,
      modalType: newModalType,
      modalProps,
    });
  };

  const closeGlobalModal = () => {
    setStore({
      ...store,
      modalType: undefined,
      modalProps: {},
    });
  };

  const renderComponent = () => {
    if (!modalType) return null;

    const ModalComponent = modalMappingComponents[modalType];

    if (!ModalComponent) return null;

    return <ModalComponent id={GLOBAL_MODAL_ID} {...modalProps} />;
  };

  return (
    <GlobalModalContext.Provider value={{ store, showGlobalModal, closeGlobalModal }}>
      {renderComponent()}
      {children}
    </GlobalModalContext.Provider>
  );
};

interface ProviderProps {
  children: React.ReactNode;
}

type ModalType = typeof MODAL_TYPES[keyof typeof MODAL_TYPES];

type ShowGlobalModalProps = (newModalType: ModalType, newModalProps: any) => void;

type StoreProps = {
  modalType?: ModalType;
  modalProps?: any;
};

type GlobalModalContextProps = {
  showGlobalModal: ShowGlobalModalProps;
  closeGlobalModal: () => void;
  store: StoreProps;
};
