import React, { useMemo } from "react";
import TypeFilterCheckBox, { AppFilterBoxProps } from "./TypeFilterCheckBox";
import { NFTConstant } from "const";
import { ObjectMultiLanguageProps } from "models/types";
import { useTranslation } from "react-i18next";

const TypesFilter = ({ data, ...otherProps }: TypesFilterProps) => {
  const { t: getLabel } = useTranslation();
  const objTypesContent: ObjectMultiLanguageProps = getLabel("objTypes", { returnObjects: true });

  const defaultFilters = useMemo(() => getDefaultFilters(objTypesContent), [objTypesContent]);

  const typesFilters = useMemo(
    () =>
      defaultFilters.map((item) => ({
        ...item,
        isChecked: data.includes(item.value),
      })),
    [data, defaultFilters],
  );

  return <TypeFilterCheckBox title={objTypesContent.lTypes} data={typesFilters} {...otherProps} />;
};

export type TypesFilterProps = Omit<AppFilterBoxProps, "title" | "data"> & {
  data: Array<NFTConstant.NFT_TYPE>;
};

export default TypesFilter;

const getDefaultFilters = (objTypesContent: ObjectMultiLanguageProps) => {
  return [
    {
      label: objTypesContent.lTroops,
      isChecked: false,
      value: NFTConstant.NFT_TYPE.troop,
    },
    {
      label: objTypesContent.lBuildings,
      isChecked: false,
      value: NFTConstant.NFT_TYPE.building,
    },
    {
      label: objTypesContent.lSpells,
      isChecked: false,
      value: NFTConstant.NFT_TYPE.spell,
    },
  ];
};
