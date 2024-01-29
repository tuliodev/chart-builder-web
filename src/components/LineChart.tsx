import { useContext } from "react";
import dynamic from "next/dynamic";

import { DatasourceContext } from "@/contexts/Datasource";

const ResponsiveLine = dynamic(
  () => import("@nivo/line").then((module) => module.ResponsiveLine),
  { ssr: false },
);

const theme = {
  text: {
    fontSize: "12px",
    fill: "#4A5568",
    fontWeight: "normal",
  },
};

const LineChart = () => {
  const { selectedOperations } = useContext(DatasourceContext);
  let data: any = [];
  selectedOperations.map((operation): any => {
    console.log(selectedOperations);
    console.log(operation);
    data.push({
      data: operation.series,
      id: `A. ${operation.symbol}_${operation.chain_name} / ${operation.metric_display_name}_${operation.operation}`,
    });
  });

  return (
    <ResponsiveLine
      data={data}
      theme={theme}
      animate
      axisBottom={{
        format: "%b %d",
        tickSize: 0,
        tickPadding: 25,
      }}
      axisLeft={{
        legend: "",
        legendOffset: 12,
        tickSize: 0,
        tickPadding: 20,
        tickValues: 5,
      }}
      curve="linear"
      margin={{
        bottom: 60,
        left: 80,
        right: 0,
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
      legends={[
        {
          anchor: "top",
          direction: "row",

          itemHeight: 100,
          itemWidth: 300,
          translateX: 0,
          translateY: -90,
          itemsSpacing: 60,
        },
      ]}
    />
  );
};

export default LineChart;
