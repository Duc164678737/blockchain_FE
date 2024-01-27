import React, { useMemo } from "react";
import TypeFilterCheckBox, { AppFilterBoxProps } from "./TypeFilterCheckBox";
import { NFTConstant } from "const";
import { ObjectMultiLanguageProps } from "models/types";
import { useTranslation } from "react-i18next";

const RarityFilter = ({ data, ...otherProps }: RarityFilterProps) => {
  const { t: getLabel } = useTranslation();
  const objRarityContent: ObjectMultiLanguageProps = getLabel("objRarity", { returnObjects: true });

  const defaultFilters = useMemo(() => getDefaultFilters(objRarityContent), [objRarityContent]);

  const rarityFilters = useMemo(
    () =>
      defaultFilters.map((item) => ({
        ...item,
        isChecked: data.includes(item.value),
      })),
    [data, defaultFilters],
  );

  return (
    <TypeFilterCheckBox title={objRarityContent.lRarity} data={rarityFilters} {...otherProps} />
  );
};

export type RarityFilterProps = Omit<AppFilterBoxProps, "title" | "data"> & {
  data: Array<NFTConstant.RARITY_TYPE>;
};

export default RarityFilter;

const getDefaultFilters = (objRarityContent: ObjectMultiLanguageProps) => {
  return [
    {
      label: objRarityContent.lCommon,
      isChecked: false,
      value: NFTConstant.RARITY_TYPE.common,
    },
    {
      label: objRarityContent.lRare,
      isChecked: false,
      value: NFTConstant.RARITY_TYPE.rare,
    },
    {
      label: objRarityContent.lEpic,
      isChecked: false,
      value: NFTConstant.RARITY_TYPE.epic,
    },
    {
      label: objRarityContent.lLegendary,
      isChecked: false,
      value: NFTConstant.RARITY_TYPE.legendary,
    },
  ];
};
