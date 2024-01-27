import palette from "../palette";
import typography from "../typography";

export default {
  styleOverrides: {
    root: {
      margin: 0,
      "&:hover span": {
        borderColor: palette.secondary.light,
      },
    },
    label: {
      ...typography.body2,
      color: palette.text.primary,
      marginLeft: 8,
    },
  },
};
