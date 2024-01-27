import { Stack } from "@mui/material";
import { AppTab, AppTabs, AppTypography } from "components/common";
import { TimesIcon } from "components/icons";
import React from "react";

const DemoAppTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack>
      <AppTypography>Demo tab</AppTypography>
      <AppTabs value={value} onChange={handleChange} aria-label="icon position tabs example">
        <AppTab icon={<TimesIcon sx={{ stroke: "#FFBA1F" }} />} iconPosition="start" label="top" />
        <AppTab
          icon={<TimesIcon sx={{ stroke: "#FFBA1F" }} />}
          iconPosition="start"
          label="start"
        />
        <AppTab icon={<TimesIcon sx={{ stroke: "#FFBA1F" }} />} iconPosition="start" label="end" />
        <AppTab
          icon={<TimesIcon sx={{ stroke: "#FFBA1F" }} />}
          iconPosition="start"
          label="bottom"
        />
      </AppTabs>
    </Stack>
  );
};

export default DemoAppTabs;
