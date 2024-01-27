import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const useTxHistoryTableHeadList = (dataHeadTable: Array<string>) => {
  const { t: getLabel, i18n } = useTranslation();

  const headLabels = useMemo(() => dataHeadTable.map((item) => getLabel(item)), [i18n.language]);

  return headLabels;
};

export default useTxHistoryTableHeadList;
