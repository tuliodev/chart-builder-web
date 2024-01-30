import React from "react";

import ChartEventsTable from "./ChartEventsTable";
import LineChart from "./LineChart";

import { DatasourceContext } from "@/contexts/Datasource";

export default function ChartCard() {
  interface LineChartProps {
    bottomRotation: number;
    fontSize: number;
    marginLeft: number;
    marginRight: number;
    enableLegends: boolean;
  }
  const { currentProjectInfo, selectedOperations } =
    React.useContext(DatasourceContext);

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const lineChartProps: LineChartProps = {
    bottomRotation: isMobile ? 90 : 0,
    fontSize: isMobile ? 8 : 12,
    marginLeft: isMobile ? 60 : 80,

    marginRight: isMobile ? 20 : 165,
    enableLegends: isMobile ? false : true,
  };

  return (
    <div className="w-full">
      {selectedOperations.length > 0 ? (
        <div className="w-full">
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
          <div className="w-full sm:w-full h-[300px] mt-5 flex justify-start items-center">
            <LineChart {...lineChartProps} />
          </div>
          <div className="flex justify-start items-center ">
            <ChartEventsTable />
          </div>
        </div>
      ) : (
        <h1>No data</h1>
      )}
    </div>
  );
}
