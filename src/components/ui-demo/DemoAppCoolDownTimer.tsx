import { Stack } from "@mui/material";
import { AppCoolDownTimer, AppTypography } from "components/common";
import React from "react";

const DemoAppCoolDownTimer = () => {
  return (
    <Stack spacing={0.5}>
      <AppTypography>Demo cool down timer</AppTypography>
      <Stack spacing={1.5}>
        <AppCoolDownTimer
          secondsRemaining={1678965540}
          wrapperProps={{ sx: { color: "#95DE64" } }}
          onFinish={() => {
            return;
          }}
        />
      </Stack>
    </Stack>
  );
};

export default DemoAppCoolDownTimer;
