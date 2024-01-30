import { useContext } from "react";

import ChartEventsTable from "./ChartEventsTable";
import LineChart from "./LineChart";

import { DatasourceContext } from "@/contexts/Datasource";

export default function ChartCard() {
  const { currentProjectInfo, selectedOperations } =
    useContext(DatasourceContext);
  return (
    <div className="w-full">
      {selectedOperations.length > 0 ? (
        <div>
          {" "}
          <div className="border-b border-[#CBD5E0] p-5">
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-sm font-semibold text-[#1A202C]">
                {currentProjectInfo.title}
              </p>
              <p className="text-xs font-normal text-[#4A5568]">
                {currentProjectInfo.description}
              </p>
            </div>
          </div>
          <div className="w-full h-[300px] mt-5">
            <LineChart />
          </div>
          <ChartEventsTable />{" "}
        </div>
      ) : (
        <h1>No data</h1>
      )}
    </div>
  );
}
