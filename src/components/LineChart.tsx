import dynamic from "next/dynamic";

// import { ResponsiveLine } from "@nivo/line";

const ResponsiveLine = dynamic(
  () => import("@nivo/line").then((module) => module.ResponsiveLine),
  { ssr: false },
);

const data = [
  {
    data: [
      {
        x: "2018-01-01",
        y: 0,
      },
      {
        x: "2018-01-02",
        y: 5,
      },
      {
        x: "2018-01-03",
        y: 8,
      },
      {
        x: "2018-01-04",
        y: 8,
      },
    ],
    id: "fake corp. A",
  },
  {
    data: [
      {
        x: "2018-01-01",
        y: 5,
      },

      {
        x: "2018-01-07",
        y: 8,
      },
      {
        x: "2018-01-08",
        y: 8,
      },

      {
        x: "2018-01-10",
        y: 8,
      },
      {
        x: "2018-01-11",
        y: 7,
      },
    ],
    id: "fake corp. B",
  },
];

const theme = {
  text: {
    fontSize: "12px",
    fill: "#4A5568",
    fontWeight: "normal",
  },
};

const LineChart = () => (
  <ResponsiveLine
    data={data}
    theme={theme}
    animate
    axisBottom={{
      format: "%b %d",
      tickValues: 6,
      tickSize: 0,
      tickPadding: 25,
    }}
    axisLeft={{
      legend: "",
      legendOffset: 12,
      tickSize: 0,
      tickPadding: 42,
      tickValues: 5,
    }}
    curve="linear"
    margin={{
      bottom: 60,
      left: 80,
      right: 30,
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
    gridYValues={4}
    enableGridX={false}
    colors={[
      "#2078F7",
      "#A45CFF",
      "#FF6F61",
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
        itemWidth: 100,
        translateX: 0,
        translateY: -90,
        itemsSpacing: 40,
      },
    ]}
  />
);

export default LineChart;
