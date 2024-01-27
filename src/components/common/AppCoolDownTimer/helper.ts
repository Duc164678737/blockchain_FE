import { ObjectMultiLanguageProps } from "models/types";

/**
 * Get time label
 *
 * @param {string} time - Time label key
 * @param {function} getLabel - Get i18n value
 * @param {string} [labelType = TIME_LABEL_TYPE.halfFull] - Label type
 *
 * @return {string} Return time label string
 *
 */
export const getTimeLabel = (
  time: string,
  getLabel: (key: string, object: object) => ObjectMultiLanguageProps,
) => {
  if (!getLabel) {
    return "";
  } else {
    const objTimeLabel = getLabel("objTimeLabel", {
      returnObjects: true,
    });

    let timeLabel = "";
    switch (time) {
      case "years":
        timeLabel = objTimeLabel.years;
        break;
      case "months":
        timeLabel = objTimeLabel.months;
        break;
      case "days":
        timeLabel = objTimeLabel.days;
        break;
      case "hours":
        timeLabel = objTimeLabel.hours;
        break;
      case "minutes":
        timeLabel = objTimeLabel.minutes;
        break;
      case "seconds":
        timeLabel = objTimeLabel.seconds;
        break;
      default:
        break;
    }
    return timeLabel;
  }
};
