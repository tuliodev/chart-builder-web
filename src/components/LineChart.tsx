import { useContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";

import { DatasourceContext } from "@/contexts/Datasource";

interface SeriesData {
  x: string;
  y: number;
}

interface LineChartData {
  data: {
    id: string;
    data: SeriesData[];
  }[];
}

interface LineChartProps {
  bottomRotation: number;
  fontSize: number;
  marginLeft: number;
  marginRight: number;
  enableLegends: boolean;
}

const ResponsiveLine = dynamic(
  () => import("@nivo/line").then((module) => module.ResponsiveLine),
  { ssr: false },
);

const LineChart = (chartData: LineChartProps) => {
  const { selectedOperations } = useContext(DatasourceContext);
  const [data, setData] = useState<LineChartData>({ data: [] });

  useMemo(() => {
    const activesOperations: LineChartData["data"] = selectedOperations
      .filter((operation) => operation.active)
      .map((operation) => ({
        id: `A. ${operation.symbol}_${operation.chain_name} / ${operation.metric_display_name}_${operation.operation}`,
        data: operation.series,
      }));

    setData({ data: activesOperations });
  }, [selectedOperations]);

  const theme = {
    text: {
      fontSize: chartData.fontSize,
      fill: "#4A5568",
      fontWeight: "normal",
    },
  };

  return (
    <ResponsiveLine
      data={data.data}
      theme={theme}
      animate
      axisBottom={{
        format: "%b %d",
        tickSize: 0,
        tickPadding: 25,
        tickRotation: chartData.bottomRotation,
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 20,
        tickValues: 5,
      }}
      curve="linear"
      margin={{
        bottom: 60,
        left: chartData.marginLeft,
        right: chartData.marginRight,
        top: 50,
      }}
      enablePoints={false}
      useMesh
      xFormat="time:%Y-%m-%d"
      xScale={{
        format: "%Y-%m-%d",
        precision: "day",
        type: "time",
        useUTC: false,
      }}
      yScale={{
        type: "linear",
      }}
      gridXValues={6}
      gridYValues={5}
      enableGridX={false}
      colors={[
        "#F45975",
        "#A45CFF",
        "#FF6F61",
        "#2078F7",
        "#FFD166",
        "#06D6A0",
        "#FFCE56",
        "#118AB2",
        "#EF476F",
        "#FF9D5C",
        "#8338EC",
        "#FFC857",
      ]}
      enableCrosshair={false}
      legends={
        chartData.enableLegends
          ? [
              {
                anchor: "top",
                direction: "row",
                itemHeight: 100,
                itemWidth: 300,
                translateX: 0,
                translateY: -90,
                itemsSpacing: 60,
              },
            ]
          : []
      }
    />
  );
};

export default LineChart;
