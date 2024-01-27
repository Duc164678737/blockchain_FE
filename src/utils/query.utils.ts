import { AppConstant, NFTConstant } from "const";
import { isEmpty, isPlainObject } from "lodash";
import { KeyAbleProps } from "models/types";

export const SEARCH_KEYS = {
  pageNum: "pageNum",
  pageSize: "pageSize",
  itemTypes: "itemTypes",
  rareTypes: "rareTypes",
  startPrice: "startPrice",
  toPrice: "toPrice",
  level: "level",
  priceSort: "priceSort",
  dateSort: "dateSort",
};

export const ARR_UNIQUE_SEARCH_KEYS = [
  SEARCH_KEYS.pageNum,
  SEARCH_KEYS.pageSize,
  SEARCH_KEYS.itemTypes,
  SEARCH_KEYS.rareTypes,
  SEARCH_KEYS.startPrice,
  SEARCH_KEYS.toPrice,
  SEARCH_KEYS.level,
  SEARCH_KEYS.priceSort,
  SEARCH_KEYS.dateSort,
];

/**
 * Clean search params object
 *
 * @param {object} paramsObject - Params object needs to clean
 * @param {array} ignoreKeys - Array of keys in params obj will be ignored
 * @param {array} uniqueKeys - Array of keys in params obj is unique
 *
 * @return {object} Cleaned object
 *
 */
export const cleanObject = (
  paramsObject: {
    [x: string]: any;
  },
  ignoreKeys: Array<string> = [],
) => {
  const cloneParamsObject = { ...paramsObject };

  for (const keyParam in paramsObject) {
    const valueParam = cloneParamsObject[keyParam];

    if (ignoreKeys.includes(keyParam)) {
      continue;
    } else if (
      valueParam === null ||
      valueParam === "" ||
      valueParam === undefined ||
      (Array.isArray(valueParam) && !valueParam.length) ||
      (isPlainObject(valueParam) && isEmpty(valueParam))
    ) {
      delete cloneParamsObject[keyParam];
    }
  }

  return cloneParamsObject;
};

export const convertReduxQueryFromUrlQuery = (reduxQuery = {} as any, urlQuery = {} as any) => {
  let query = {
    pageNum: urlQuery.pageNum || reduxQuery.pageNum,
    pageSize: urlQuery.pageSize || reduxQuery.pageSize,
    itemTypes: urlQuery.itemTypes || reduxQuery.itemTypes,
    rareTypes: urlQuery.rareTypes || reduxQuery.rareTypes,
    startPrice: urlQuery.startPrice || reduxQuery.startPrice,
    toPrice: urlQuery.toPrice || reduxQuery.toPrice,
    level: urlQuery.level || reduxQuery.level,
    sorts: {},
  };

  let sorts = {
    [NFTConstant.NFT_SORT_KEY.price]:
      urlQuery?.[SEARCH_KEYS.priceSort] || reduxQuery?.sorts?.[NFTConstant.NFT_SORT_KEY.price],
  };
  sorts = cleanObject(sorts);

  if (!Object.keys(sorts).length) {
    sorts = {
      [NFTConstant.NFT_SORT_KEY.date]:
        urlQuery?.[SEARCH_KEYS.dateSort] || reduxQuery?.sorts?.[NFTConstant.NFT_SORT_KEY.date],
    };
  }
  sorts = cleanObject(sorts);

  query = { ...query, sorts };

  return cleanObject(query);
};

export const getVerifiedSearchParam = (searchKey: string, searchValue: string) => {
  const innitValue = parseInt(searchValue);

  switch (searchKey) {
    case SEARCH_KEYS.pageNum:
      return innitValue >= 1 ? searchValue : null;
    case SEARCH_KEYS.pageSize:
      return innitValue ? searchValue : null;
    case SEARCH_KEYS.itemTypes:
      return Object.values(NFTConstant.NFT_TYPE).includes(searchValue as NFTConstant.NFT_TYPE)
        ? searchValue
        : null;
    case SEARCH_KEYS.rareTypes:
      return Object.values(NFTConstant.RARITY_TYPE).includes(searchValue as NFTConstant.RARITY_TYPE)
        ? searchValue
        : null;
    case SEARCH_KEYS.startPrice:
      return innitValue > 0 ? searchValue : null;
    case SEARCH_KEYS.toPrice:
      return innitValue > 0 ? searchValue : null;
    case SEARCH_KEYS.level:
      return innitValue > 0 ? searchValue : null;
    case SEARCH_KEYS.dateSort:
    case SEARCH_KEYS.priceSort:
      return Object.values(AppConstant.SORT_DIRECTION).includes(searchValue) ? searchValue : null;
    default:
      return null;
  }
};

/**
 * Get verified array search param
 *
 * @param {string} searchKey - One of values in SEARCH_KEYS
 * @param {array} searchArr - Search array value needs to check
 *
 * @return {array} Array of search param value
 *
 */
export const getVerifiedArraySearchParam = (searchKey: string, searchArr: Array<string>) => {
  return searchArr.reduce<Array<string>>((arr, currentItem) => {
    const verifiedElm = getVerifiedSearchParam(searchKey, currentItem);

    if (verifiedElm !== null) {
      return [...arr, verifiedElm];
    } else {
      return arr;
    }
  }, []);
};

export const getObjectSearchParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const searchObj: KeyAbleProps = {};

  for (const key of searchParams.keys()) {
    if (searchParams.getAll(key).length > 1) {
      const verifiedSearchArr = getVerifiedArraySearchParam(key, searchParams.getAll(key));
      searchObj[key] = verifiedSearchArr;
    } else {
      const verifiedSearchValue = getVerifiedSearchParam(key, searchParams.get(key) as string);
      searchObj[key] = verifiedSearchValue;
    }
  }

  return searchObj;
};
