import React, { ElementType, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ApiResponse } from "apisauce";
import { AppTypography } from "components/common";
import { ApiConstant, AppConstant, NFTConstant } from "const";
import { PathUtils } from "utils";
import { NFTClass } from "models";
import { ResponseDataList, ThemeProps } from "models/types";
import { MarketplaceService } from "services";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const RelatedListingCard = ({ nftType, NftComponent, classes }: RelatedListingCardProps) => {
  const defaultClasses = useStyles();
  const router = useRouter();
  const { t: getLabel } = useTranslation();
  const id = router.query.id;
  const nftDetailPath = PathUtils.getMarketplaceDetail(nftType);

  const [nftList, setNftList] = useState<NFTClass[]>([]);

  const handleGetListOther = async () => {
    try {
      const response: ApiResponse<ResponseDataList<NFTClass>> =
        await MarketplaceService.getNftMarketPlace({
          itemClass: nftType,
          pageNum: AppConstant.DEFAULT_PAGINATION.page,
          pageSize: AppConstant.DEFAULT_PAGINATION.size,
        });

      const responseData: ResponseDataList<NFTClass> | undefined = response?.data;
      if (responseData && responseData.statusCode === ApiConstant.STT_OK) {
        const { pageData } = responseData.data;
        if (pageData && Array.isArray(pageData))
          setNftList(pageData.map((nftItem) => new NFTClass(nftItem)));
      } else {
        // TODO: Show error
      }
    } catch (err) {
      window.isDebug && console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      handleGetListOther();
    }
  }, [id, nftType]);

  return (
    <Box className={clsx(defaultClasses.root, classes?.container)}>
      <AppTypography className={defaultClasses.textOtherListing}>
        {getLabel("lOtherListing")}
      </AppTypography>
      <Box className={defaultClasses.listNft}>
        {nftList.map((item: NFTClass, index: number) => {
          return <NftComponent data={item} key={index} pathname={nftDetailPath} id={item.id} />;
        })}
      </Box>
    </Box>
  );
};

interface RelatedListingCardProps {
  nftType: NFTConstant.NFT_CLASS_TYPE;
  classes?: {
    container: string;
  };

  NftComponent: ElementType;
}

export default RelatedListingCard;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(5),
  },
  listNft: {
    display: "flex",
    flexWrap: "wrap",
    rowGap: theme.spacing(3),
    justifyContent: "space-between",
  },
  textOtherListing: {
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.h5.fontSize,
    lineHeight: theme.typography.body1.lineHeight,
    color: theme.palette.light.main,
    marginBottom: theme.spacing(2),
  },
}));
