import React, { useState } from "react";
import { Box } from "@mui/material";
import { AppTypography, AppButton } from "components/common";
import { SellInputModal } from "components/sn-inventory";
import { ImageHeroDemo } from "public/images/demo";

const DemoSellInputModal = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <Box>
      <AppTypography>Demo sell input modal</AppTypography>
      <AppButton variant="contained" onClick={() => setIsOpenModal(true)}>
        Open Modal
      </AppButton>
      <SellInputModal
        onSellNft={(value) => alert(value)}
        labelNft="Box"
        nftType="Box - Blue"
        totalPrice="3"
        imageNft={<Box component="img" width={44} height={44} src={ImageHeroDemo} />}
        modalTitleProps={{ title: "Sell Emote" }}
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        setTotalPrice={() => {
          return;
        }}
      />
    </Box>
  );
};

export default DemoSellInputModal;
