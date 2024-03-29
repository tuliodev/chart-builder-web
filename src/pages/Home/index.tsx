import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";
import SiderBar from "@/components/Sidebar";
import SubHeader from "@/components/SubHeader";

export default function Home() {
  return (
    <div>
      <Header />
      <SubHeader />
      <div className="h-screen flex overflow-y-scroll no-scrollbar">
        <SiderBar />
        <Dashboard />
      </div>
    </div>
  );
}
