import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import DashboardNav from "./DashboardNav";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Background gradient */}
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <DashboardNav />
          <main className="p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
