import { addMinutes, format, intervalToDuration } from "date-fns";
import { AppConstant } from "const";

/**
 * Convert timestamp to date format
 *
 * @param {number} timeStamp - TimeStamp
 *
 * @param {string} dateFormat - Date format
 *
 * @param {string} timeFormat - Time format
 *
 * @return {object} Object of Date and Time
 *
 */

export const covertTimeStampToDateFormat = (
  timeStamp: number,
  isUTC = true,
  dateFormat = AppConstant.DATE_FORMAT,
  timeFormat = AppConstant.TIME_FORMAT,
) => {
  if (!timeStamp) return {};

  let date = "";
  let time = "";
  const convertedDate = new Date(timeStamp * 1000);

  if (isUTC) {
    date = format(addMinutes(convertedDate, convertedDate.getTimezoneOffset()), dateFormat);
    time = format(addMinutes(convertedDate, convertedDate.getTimezoneOffset()), timeFormat);
  } else {
    date = format(convertedDate, dateFormat);
    time = format(convertedDate, timeFormat);
  }

  return { date, time };
};

/**
 * format timestamp to  --:-- (UTC) - --/--/--
 *
 * @param {number} timeStamp - TimeStamp
 *
 * @return {string} string format
 *
 */
export const formatTimeStampToUTCString = (timeStamp: number): string => {
  if (timeStamp) {
    const { date, time } = covertTimeStampToDateFormat(
      timeStamp,
      true,
      AppConstant.FULL_DATE_FORMAT,
    );
    return ` ${time} (UTC) - ${date}`;
  } else {
    return "- - : - - (UTC) - -/- -/- - - -";
  }
};

/**
 * Get specific cooling time
 *
 * @param {number} secondsRemaining - Number of seconds
 *
 * @return {object} Object of Years || Months || Days || Hours || Minutes || Seconds different
 *
 */
export const getSpecificCoolingTime = (secondsRemaining: number) => {
  const { years, months, days, hours, minutes, seconds } = intervalToDuration({
    start: 0,
    end: secondsRemaining * 1000,
  });

  return { years, months, days, hours, minutes, seconds };
};

/**
 * Convert time
 *
 * @param {number} value - Number of months
 * @param {number} [totalDigits = 2] - Number of max digit show
 * @param {string} [fallback = AppConstant.NOT_HAVE_VALUE_LABEL] - Default string will returned when value null
 *
 * @return {number} Number with prefix "0"
 *
 */
export const convertTimeToSpecificDigits = (
  value: string | number,
  totalDigits = 2,
  fallback = AppConstant.NOT_HAVE_VALUE_LABEL,
) => {
  if (!value && Number(value) !== 0) {
    return fallback;
  } else {
    return String(value).padStart(totalDigits, "0");
  }
};
