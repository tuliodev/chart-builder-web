import { useContext } from "react";

import { DatasourceContext } from "@/contexts/Datasource";

export default function ChartCard() {
  const { currentProjectInfo } = useContext(DatasourceContext);
  return (
    <div className="border-b border-[#CBD5E0] w-full p-5">
      <div className="flex flex-col items-start justify-start gap-1">
        <p className="text-sm font-semibold text-[#1A202C]">
          {currentProjectInfo.title}
        </p>
        <p className="text-xs font-normal text-[#4A5568]">
          {currentProjectInfo.description}
        </p>
      </div>
    </div>
  );
}
