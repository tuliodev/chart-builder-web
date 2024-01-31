import React from "react";

import { LineChartIcon } from "lucide-react";

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
              <p className="text-xs font-normal text-primary-neutral">
                {currentProjectInfo.description}
              </p>
            </div>
          </div>
          <div className="h-[300px] mt-5 flex justify-start items-center">
            <LineChart {...lineChartProps} />
          </div>
          <ChartEventsTable />
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center mt-2 sm:mt-20">
          <LineChartIcon height={300} width={300} color="#CBD5E0" />
          <p className="text-lg font-semibold text-primary-neutral">
            Add a Data Source and a Metric to get started.
          </p>
          <p className="text-lg font-light text-[#A0AEC0]">
            (see left menu for options).
          </p>
        </div>
      )}
    </div>
  );
}
