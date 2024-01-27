import React, { memo } from "react";
import { AppLink, AppTab, AppTabs } from "components/common";
import { useRouter } from "next/router";

const HeaderTabs = ({ headerTabs }: HeaderTabsProps) => {
  const router = useRouter();

  return (
    <AppTabs value={router.pathname}>
      {headerTabs.map((data, index) => (
        <AppTab
          LinkComponent={AppLink}
          href={data.path}
          value={data.path}
          key={index}
          icon={data.icon}
          iconPosition="start"
          label={data.label}
        />
      ))}
    </AppTabs>
  );
};

type HeaderTabsProps = {
  headerTabs: {
    icon: JSX.Element;
    path: string;
    label: string;
  }[];
};

export default memo(HeaderTabs);
