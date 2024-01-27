import React, { memo, useMemo } from "react";
import { Typography } from "@mui/material";
import { AppTypographyProps } from "models/types";
import { useResponsive } from "hooks";

const AppTypography = ({
  variant,
  responsiveVariant,
  children,
  ...otherProps
}: AppTypographyProps) => {
  const isSmall = useResponsive("up", "sm");
  const isMedium = useResponsive("up", "md");
  const isLarge = useResponsive("up", "lg");
  const isExtraLarge = useResponsive("up", "xl");

  const currentVariant = useMemo(() => {
    if (variant) {
      return variant;
    } else if (typeof responsiveVariant === "object") {
      if (isExtraLarge && responsiveVariant.xl) {
        return responsiveVariant.xl;
      } else if (isLarge && responsiveVariant.lg) {
        return responsiveVariant.lg;
      } else if (isMedium && responsiveVariant.md) {
        return responsiveVariant.md;
      } else if (isSmall && responsiveVariant.sm) {
        return responsiveVariant.sm;
      }
      return responsiveVariant.xs || "body1";
    } else {
      return "body1";
    }
  }, [isSmall, isMedium, isLarge, isExtraLarge, variant, responsiveVariant]);

  return (
    <Typography variant={currentVariant} {...otherProps}>
      {children}
    </Typography>
  );
};

export default memo(AppTypography);
