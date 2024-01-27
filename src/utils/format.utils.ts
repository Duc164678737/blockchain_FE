import { AppConstant, EnvConstant } from "const";

/**
 * Format number
 *
 * @param {number} number - The number to format
 * @param {number} [maximumFractionDigits = 3] -The length of decimal
 * @param {string} [fallbackLabel = AppConstant.NOT_HAVE_VALUE_LABEL] - Default string will returned when number is the empty string
 * @param {object} [localeOption = {}] - To customized method toLocaleString
 * @param {number} [minimumFractionDigits = 0] - The min length of decimal
 *
 * @return {string} The value of format number
 *
 */
export const formatNumber = (
  numberValue?: number,
  maximumFractionDigits = 3,
  fallbackLabel = AppConstant.NOT_HAVE_VALUE_LABEL,
  localeOption = {},
  minimumFractionDigits = 0,
) => {
  try {
    if (!numberValue && numberValue !== 0) return fallbackLabel;
    const num = Number(numberValue);
    return num.toLocaleString("en-US", {
      maximumFractionDigits,
      minimumFractionDigits,
      ...localeOption,
    });
  } catch (error) {
    EnvConstant.IS_DEV && console.log(error);
    return String(numberValue);
  }
};

/**
 * Truncate a transaction or address
 *
 * @param {string} address - The transaction hash or address.
 * @param {number} [startLength=4] - Length of the beginning of the truncated hash.
 * @param {number} [endLength=4] - Length of the end of the truncated hash.
 *
 * @return {string} A truncated transaction/address hash.
 *
 */

export const truncateHash = (address: string, startLength = 4, endLength = 4) => {
  if (!address) return "";
  return `${address.substring(0, startLength)}...${address.substring(address.length - endLength)}`;
};

/**
 * Format id
 *
 * @param {number} id - Id
 *
 * @return {string} Formatted Id
 *
 */
export const formatId = (id?: number) => {
  if (id) {
    return "#" + id;
  } else {
    return AppConstant.NOT_HAVE_VALUE_LABEL;
  }
};

/**
 * Format percentage
 *
 * @param {number} value - The number to format
 * @param {number} [maximumFractionDigits = 3] - Max decimal number
 * @param {string} [fallbackLabel = AppConstant.NOT_HAVE_VALUE_LABEL] - Default string will returned when number is the empty string
 *
 * @return {string} The value of the percentage
 *
 */
export const formatPercentage = (
  value: number,
  maximumFractionDigits?: number,
  fallbackLabel?: string,
) => {
  return formatNumber(value, maximumFractionDigits, fallbackLabel, { style: "percent" });
};

export const formatPriceWithToken = (price: number, token = AppConstant.LABEL_TOKEN) => {
  return formatNumber(price) + " " + token;
};
