import palette from "../palette";
import typography from "../typography";

export default {
  styleOverrides: {
    sizeMedium: {
      height: 40,
      width: 40,
      borderRadius: 4,
      ...typography.body2,
    },
    colorSecondary: {
      border: "1px solid #F5D23F",
      background: palette.secondary.main,
      boxShadow: `0px 2px 1px ${palette.shadow.secondary}`,
      "&:hover": {
        background: palette.secondary.light,
        borderColor: "#F9E294",
      },
      "&:disabled": {
        color: palette.grey[300],
        boxShadow: `0px 2px 1px ${palette.shadow.disabled}`,
        borderColor: "#9B9DA9",
      },
    },
  },
};
