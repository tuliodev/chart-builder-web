import ChartCard from "./ChartCard";
import TimeFilter from "./TimeFilter";

export default function Dashboard() {
  return (
    <div className="w-screen h-screen p-4 sm:p-6">
      <div className="flex flex-col gap-5 sm:gap-5 items-start justify-start">
        <TimeFilter />
        <ChartCard />
      </div>
    </div>
  );
}
