import palette from "../palette";
import typography from "../typography";

const mediumStyle = {
  padding: "11px 31px",
  borderRadius: 4,
};

const containedMediumStyle = {
  minWidth: 180,
};

const textMediumStyle = {
  minWidth: 96,
};

const textSizeMedium = typography.h4;

export default {
  styleOverrides: {
    root: {
      textTransform: undefined,
      ...mediumStyle,
      ...textSizeMedium,
    },

    contained: {
      ...containedMediumStyle,
      border: "1px solid",
      "&:disabled": {
        borderColor: "#9698A4",
        color: palette.text.disabled,
        boxShadow: `0px 2px 1px 0px ${palette.shadow.disabled}`,
      },
    },
    containedPrimary: {
      borderColor: "#4D7BBD",
      backgroundColor: palette.primary.main,
      boxShadow: `0px 2px 1px 0px ${palette.shadow.primary}`,
      "&:hover": {
        borderColor: "#7B9DCF",
        backgroundColor: palette.primary.light,
      },
    },
    containedSecondary: {
      borderColor: "#F5D139",
      backgroundColor: palette.secondary.main,
      boxShadow: `0px 2px 1px 0px ${palette.shadow.secondary}`,
      "&:hover": {
        borderColor: "#F9E191",
        backgroundColor: palette.secondary.light,
      },
    },

    outlined: {
      color: palette.primary.light,
      "&, &:hover": {
        borderColor: "currentColor",
        backgroundColor: "transparent",
      },
    },

    text: {
      ...textMediumStyle,
      "&:disabled": {
        color: palette.text.disabled,
      },
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    textSecondary: {
      color: palette.secondary.main,
      "&:hover": {
        color: palette.secondary.light,
      },
    },
  },
};
