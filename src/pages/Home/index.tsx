import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";
import SiderBar from "@/components/Sidebar";
import SubHeader from "@/components/SubHeader";

export default function Home() {
  return (
    <div>
      <Header />
      <SubHeader />
      <div className="flex flex-row">
        <SiderBar />
        <Dashboard />
      </div>
    </div>
  );
}
